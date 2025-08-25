import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '@/utils/logger';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    isVerified: boolean;
  };
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'UNAUTHORIZED',
        message: 'Access token is required'
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    if (!token) {
      res.status(401).json({
        error: 'UNAUTHORIZED',
        message: 'Access token is required'
      });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      req.user = decoded;
      next();
    } catch (jwtError) {
      logger.warn('Invalid JWT token:', jwtError);
      res.status(401).json({
        error: 'UNAUTHORIZED',
        message: 'Invalid or expired token'
      });
      return;
    }
  } catch (error) {
    logger.error('Auth middleware error:', error);
    res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Authentication failed'
    });
  }
};

export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
        req.user = decoded;
      } catch (jwtError) {
        // Token invalid, but continue without authentication
        logger.debug('Optional auth - invalid token:', jwtError);
      }
    }
    
    next();
  } catch (error) {
    logger.error('Optional auth middleware error:', error);
    next(); // Continue without authentication
  }
};

export const requireRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        error: 'UNAUTHORIZED',
        message: 'Authentication required'
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        error: 'FORBIDDEN',
        message: 'Insufficient permissions'
      });
      return;
    }

    next();
  };
};

export const requireVerification = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({
      error: 'UNAUTHORIZED',
      message: 'Authentication required'
    });
    return;
  }

  if (!req.user.isVerified) {
    res.status(403).json({
      error: 'VERIFICATION_REQUIRED',
      message: 'Account verification required'
    });
    return;
  }

  next();
};
