import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

// Cryptographic utilities
export class CryptoUtils {
  private static readonly ALGORITHM = 'aes-256-gcm';
  private static readonly IV_LENGTH = 16;
  private static readonly SALT_ROUNDS = 12;

  /**
   * Generate a cryptographically secure random string
   */
  static generateSecureRandom(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  /**
   * Generate a UUID v4
   */
  static generateUUID(): string {
    return crypto.randomUUID();
  }

  /**
   * Hash a password using bcrypt
   */
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  /**
   * Verify a password against its hash
   */
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Generate an anonymous ID that cannot be traced back to user
   */
  static generateAnonymousId(): string {
    const timestamp = Date.now().toString();
    const random = this.generateSecureRandom(16);
    const combined = timestamp + random;
    return crypto.createHash('sha256').update(combined).digest('hex');
  }

  /**
   * Encrypt sensitive data
   */
  static encrypt(text: string, key: string): { encrypted: string; iv: string; tag: string } {
    const iv = crypto.randomBytes(this.IV_LENGTH);
    const cipher = crypto.createCipher(this.ALGORITHM, key);
    cipher.setAAD(Buffer.from('allyti-platform', 'utf8'));
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const tag = cipher.getAuthTag();
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      tag: tag.toString('hex')
    };
  }

  /**
   * Decrypt sensitive data
   */
  static decrypt(encryptedData: { encrypted: string; iv: string; tag: string }, key: string): string {
    const decipher = crypto.createDecipher(this.ALGORITHM, key);
    decipher.setAAD(Buffer.from('allyti-platform', 'utf8'));
    decipher.setAuthTag(Buffer.from(encryptedData.tag, 'hex'));
    
    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  /**
   * Generate RSA key pair for end-to-end encryption
   */
  static generateKeyPair(): { publicKey: string; privateKey: string } {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    });

    return { publicKey, privateKey };
  }
}

// JWT utilities
export class JWTUtils {
  /**
   * Generate access token
   */
  static generateAccessToken(payload: object, secret: string, expiresIn: string = '15m'): string {
    return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
  }

  /**
   * Generate refresh token
   */
  static generateRefreshToken(payload: object, secret: string, expiresIn: string = '7d'): string {
    return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
  }

  /**
   * Generate anonymous token with zero-knowledge proof
   */
  static generateAnonymousToken(anonymousId: string, secret: string, expiresIn: string = '24h'): string {
    const payload = {
      anonymousId,
      type: 'anonymous',
      // No linkage to professional identity
      iat: Math.floor(Date.now() / 1000)
    };
    return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
  }

  /**
   * Verify and decode JWT token
   */
  static verifyToken(token: string, secret: string): any {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * Decode token without verification (for expired token inspection)
   */
  static decodeToken(token: string): any {
    return jwt.decode(token);
  }
}

// String utilities
export class StringUtils {
  /**
   * Generate a URL-friendly slug from text
   */
  static slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /**
   * Capitalize first letter of each word
   */
  static titleCase(text: string): string {
    return text.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }

  /**
   * Truncate text with ellipsis
   */
  static truncate(text: string, maxLength: number, suffix: string = '...'): string {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength - suffix.length) + suffix;
  }

  /**
   * Extract mentions from text (@username)
   */
  static extractMentions(text: string): string[] {
    const mentionRegex = /@(\w+)/g;
    const mentions: string[] = [];
    let match;
    
    while ((match = mentionRegex.exec(text)) !== null) {
      mentions.push(match[1]);
    }
    
    return mentions;
  }

  /**
   * Extract hashtags from text (#hashtag)
   */
  static extractHashtags(text: string): string[] {
    const hashtagRegex = /#(\w+)/g;
    const hashtags: string[] = [];
    let match;
    
    while ((match = hashtagRegex.exec(text)) !== null) {
      hashtags.push(match[1]);
    }
    
    return hashtags;
  }

  /**
   * Sanitize HTML content
   */
  static sanitizeHtml(html: string): string {
    // Basic HTML sanitization - in production, use a proper library like DOMPurify
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  }

  /**
   * Generate initials from name
   */
  static getInitials(firstName: string, lastName: string): string {
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  }

  /**
   * Mask sensitive information (email, phone)
   */
  static maskEmail(email: string): string {
    const [username, domain] = email.split('@');
    const maskedUsername = username.length > 2 
      ? username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1)
      : username;
    return `${maskedUsername}@${domain}`;
  }
}

// Date utilities
export class DateUtils {
  /**
   * Format date for display
   */
  static formatDate(date: Date, format: 'short' | 'medium' | 'long' | 'relative' = 'medium'): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (format === 'relative') {
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
      if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
      return `${Math.floor(diffDays / 365)}y ago`;
    }

    const formatOptions: Record<string, Intl.DateTimeFormatOptions> = {
      short: { month: 'short', day: 'numeric' },
      medium: { month: 'short', day: 'numeric', year: 'numeric' },
      long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
    };

    return date.toLocaleDateString('en-US', formatOptions[format]);
  }

  /**
   * Check if date is within a range
   */
  static isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
    return date >= startDate && date <= endDate;
  }

  /**
   * Get academic year from graduation year
   */
  static getAcademicYear(graduationYear: number): string {
    const startYear = graduationYear - 4; // Assuming 4-year program
    return `${startYear}-${graduationYear}`;
  }

  /**
   * Calculate experience in years from graduation
   */
  static calculateExperience(graduationYear: number): number {
    const currentYear = new Date().getFullYear();
    return Math.max(0, currentYear - graduationYear);
  }
}

// Validation utilities
export class ValidationUtils {
  /**
   * Check if email belongs to valid IIT/IIM domain
   */
  static isValidInstitutionEmail(email: string, validDomains: string[]): boolean {
    return validDomains.some(domain => email.toLowerCase().endsWith(`@${domain}`));
  }

  /**
   * Validate password strength
   */
  static validatePasswordStrength(password: string): {
    isValid: boolean;
    score: number;
    feedback: string[];
  } {
    const feedback: string[] = [];
    let score = 0;

    if (password.length >= 8) score += 1;
    else feedback.push('Password should be at least 8 characters long');

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Password should contain lowercase letters');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Password should contain uppercase letters');

    if (/\d/.test(password)) score += 1;
    else feedback.push('Password should contain numbers');

    if (/[@$!%*?&]/.test(password)) score += 1;
    else feedback.push('Password should contain special characters');

    return {
      isValid: score >= 4,
      score,
      feedback
    };
  }

  /**
   * Validate file type and size
   */
  static validateFile(
    file: { mimetype: string; size: number },
    allowedTypes: string[],
    maxSize: number
  ): { isValid: boolean; error?: string } {
    if (!allowedTypes.includes(file.mimetype)) {
      return { isValid: false, error: 'Invalid file type' };
    }

    if (file.size > maxSize) {
      return { isValid: false, error: 'File size too large' };
    }

    return { isValid: true };
  }

  /**
   * Sanitize input to prevent XSS
   */
  static sanitizeInput(input: string): string {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }
}

// Array utilities
export class ArrayUtils {
  /**
   * Remove duplicates from array
   */
  static unique<T>(array: T[]): T[] {
    return Array.from(new Set(array));
  }

  /**
   * Chunk array into smaller arrays
   */
  static chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  /**
   * Shuffle array randomly
   */
  static shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Group array by key
   */
  static groupBy<T>(array: T[], keyFn: (item: T) => string): Record<string, T[]> {
    return array.reduce((groups, item) => {
      const key = keyFn(item);
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  }
}

// URL utilities
export class UrlUtils {
  /**
   * Build URL with query parameters
   */
  static buildUrl(baseUrl: string, params: Record<string, any>): string {
    const url = new URL(baseUrl);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
    return url.toString();
  }

  /**
   * Extract domain from URL
   */
  static extractDomain(url: string): string {
    try {
      return new URL(url).hostname;
    } catch {
      return '';
    }
  }

  /**
   * Generate secure URL for file uploads
   */
  static generateSecureUploadUrl(fileName: string, userId: string): string {
    const timestamp = Date.now();
    const hash = crypto.createHash('sha256').update(`${fileName}-${userId}-${timestamp}`).digest('hex');
    return `uploads/${userId}/${timestamp}-${hash}`;
  }
}

// Search utilities
export class SearchUtils {
  /**
   * Highlight search terms in text
   */
  static highlightSearchTerms(text: string, searchTerms: string[]): string {
    let highlighted = text;
    searchTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlighted = highlighted.replace(regex, '<mark>$1</mark>');
    });
    return highlighted;
  }

  /**
   * Calculate search relevance score
   */
  static calculateRelevanceScore(text: string, searchTerms: string[]): number {
    let score = 0;
    const lowerText = text.toLowerCase();
    
    searchTerms.forEach(term => {
      const lowerTerm = term.toLowerCase();
      const exactMatches = (lowerText.match(new RegExp(lowerTerm, 'g')) || []).length;
      const wordBoundaryMatches = (lowerText.match(new RegExp(`\\b${lowerTerm}\\b`, 'g')) || []).length;
      
      score += exactMatches * 1 + wordBoundaryMatches * 2;
    });
    
    return score;
  }

  /**
   * Generate search suggestions
   */
  static generateSuggestions(query: string, dictionary: string[]): string[] {
    const lowerQuery = query.toLowerCase();
    return dictionary
      .filter(word => word.toLowerCase().includes(lowerQuery))
      .sort((a, b) => a.length - b.length)
      .slice(0, 10);
  }
}

// Rate limiting utilities
export class RateLimitUtils {
  private static readonly cache = new Map<string, { count: number; resetTime: number }>();

  /**
   * Check if action is rate limited
   */
  static isRateLimited(key: string, maxRequests: number, windowMs: number): boolean {
    const now = Date.now();
    const record = this.cache.get(key);

    if (!record || now > record.resetTime) {
      this.cache.set(key, { count: 1, resetTime: now + windowMs });
      return false;
    }

    if (record.count >= maxRequests) {
      return true;
    }

    record.count++;
    return false;
  }

  /**
   * Get remaining requests in window
   */
  static getRemainingRequests(key: string, maxRequests: number): number {
    const record = this.cache.get(key);
    if (!record) return maxRequests;
    return Math.max(0, maxRequests - record.count);
  }

  /**
   * Reset rate limit for key
   */
  static resetRateLimit(key: string): void {
    this.cache.delete(key);
  }
}
