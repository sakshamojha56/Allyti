import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerSchema, loginSchema } from '@allyti/shared';
import { authMiddleware } from '@/middleware/auth';
import { asyncHandler } from '@/middleware/errorHandler';
import { pgPool } from '@/config/database';
import { redisClient } from '@/config/database';

const router = Router();

// Register new user
router.post('/register', asyncHandler(async (req, res) => {
  // Validate request body
  const validatedData = registerSchema.parse(req.body);
  
  const {
    email,
    password,
    firstName,
    lastName,
    institution,
    graduationYear,
    program
  } = validatedData;

  // Check if user already exists
  const existingUser = await pgPool.query(
    'SELECT id FROM users WHERE email = $1',
    [email]
  );

  if (existingUser.rows.length > 0) {
    return res.status(400).json({
      error: 'USER_EXISTS',
      message: 'User with this email already exists'
    });
  }

  // Hash password
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create user
  const result = await pgPool.query(`
    INSERT INTO users (
      email, password_hash, first_name, last_name, 
      institution, graduation_year, program, 
      is_verified, created_at, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, false, NOW(), NOW())
    RETURNING id, email, first_name, last_name, institution, graduation_year, program, is_verified, created_at
  `, [email, hashedPassword, firstName, lastName, institution, graduationYear, program]);

  const user = result.rows[0];

  // Generate JWT tokens
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: 'STUDENT', // Default role
      isVerified: user.is_verified
    },
    process.env.JWT_SECRET!,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: '7d' }
  );

  // Store refresh token in Redis
  await redisClient.setEx(`refresh_token:${user.id}`, 7 * 24 * 60 * 60, refreshToken);

  // Remove sensitive data
  const { password_hash, ...userResponse } = user;

  res.status(201).json({
    user: userResponse,
    tokens: {
      accessToken,
      refreshToken
    }
  });
}));

// Login user
router.post('/login', asyncHandler(async (req, res) => {
  // Validate request body
  const validatedData = loginSchema.parse(req.body);
  const { email, password } = validatedData;

  // Find user
  const result = await pgPool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );

  if (result.rows.length === 0) {
    return res.status(401).json({
      error: 'INVALID_CREDENTIALS',
      message: 'Invalid email or password'
    });
  }

  const user = result.rows[0];

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  
  if (!isPasswordValid) {
    return res.status(401).json({
      error: 'INVALID_CREDENTIALS',
      message: 'Invalid email or password'
    });
  }

  // Generate JWT tokens
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role || 'STUDENT',
      isVerified: user.is_verified
    },
    process.env.JWT_SECRET!,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: '7d' }
  );

  // Store refresh token in Redis
  await redisClient.setEx(`refresh_token:${user.id}`, 7 * 24 * 60 * 60, refreshToken);

  // Update last login
  await pgPool.query(
    'UPDATE users SET last_login = NOW() WHERE id = $1',
    [user.id]
  );

  // Remove sensitive data
  const { password_hash, ...userResponse } = user;

  res.json({
    user: userResponse,
    tokens: {
      accessToken,
      refreshToken
    }
  });
}));

// Refresh token
router.post('/refresh', asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      error: 'REFRESH_TOKEN_REQUIRED',
      message: 'Refresh token is required'
    });
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as any;
    
    // Check if token exists in Redis
    const storedToken = await redisClient.get(`refresh_token:${decoded.id}`);
    
    if (!storedToken || storedToken !== refreshToken) {
      return res.status(401).json({
        error: 'INVALID_REFRESH_TOKEN',
        message: 'Invalid refresh token'
      });
    }

    // Get user data
    const result = await pgPool.query(
      'SELECT id, email, role, is_verified FROM users WHERE id = $1',
      [decoded.id]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: 'USER_NOT_FOUND',
        message: 'User not found'
      });
    }

    const user = result.rows[0];

    // Generate new access token
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role || 'STUDENT',
        isVerified: user.is_verified
      },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );

    res.json({
      accessToken
    });
  } catch (error) {
    return res.status(401).json({
      error: 'INVALID_REFRESH_TOKEN',
      message: 'Invalid refresh token'
    });
  }
}));

// Logout
router.post('/logout', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  
  if (userId) {
    // Remove refresh token from Redis
    await redisClient.del(`refresh_token:${userId}`);
  }

  res.json({
    message: 'Logged out successfully'
  });
}));

// Get current user
router.get('/me', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  const result = await pgPool.query(`
    SELECT 
      id, email, first_name, last_name, avatar_url,
      institution, graduation_year, program, bio,
      is_verified, role, created_at, updated_at, last_login
    FROM users 
    WHERE id = $1
  `, [userId]);

  if (result.rows.length === 0) {
    return res.status(404).json({
      error: 'USER_NOT_FOUND',
      message: 'User not found'
    });
  }

  res.json(result.rows[0]);
}));

// Send verification email
router.post('/verify/send', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  
  // Generate verification token
  const verificationToken = jwt.sign(
    { userId, type: 'email_verification' },
    process.env.JWT_SECRET!,
    { expiresIn: '24h' }
  );

  // Store verification token in Redis
  await redisClient.setEx(`verification:${userId}`, 24 * 60 * 60, verificationToken);

  // TODO: Send verification email
  // await emailService.sendVerificationEmail(user.email, verificationToken);

  res.json({
    message: 'Verification email sent'
  });
}));

// Verify email
router.post('/verify/email', asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      error: 'TOKEN_REQUIRED',
      message: 'Verification token is required'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
    if (decoded.type !== 'email_verification') {
      return res.status(400).json({
        error: 'INVALID_TOKEN_TYPE',
        message: 'Invalid token type'
      });
    }

    // Check if token exists in Redis
    const storedToken = await redisClient.get(`verification:${decoded.userId}`);
    
    if (!storedToken || storedToken !== token) {
      return res.status(400).json({
        error: 'INVALID_TOKEN',
        message: 'Invalid or expired verification token'
      });
    }

    // Update user verification status
    await pgPool.query(
      'UPDATE users SET is_verified = true, updated_at = NOW() WHERE id = $1',
      [decoded.userId]
    );

    // Remove verification token from Redis
    await redisClient.del(`verification:${decoded.userId}`);

    res.json({
      message: 'Email verified successfully'
    });
  } catch (error) {
    return res.status(400).json({
      error: 'INVALID_TOKEN',
      message: 'Invalid or expired verification token'
    });
  }
}));

export default router;
