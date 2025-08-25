// Export all shared modules
export * from './types';
export * from './constants';
export * from './utils';

// Export validation schemas specifically to avoid conflicts
export {
  emailSchema,
  passwordSchema,
  uuidSchema,
  institutionSchema,
  programSchema,
  registerSchema,
  loginSchema,
  profileUpdateSchema,
  postCreateSchema,
  commentCreateSchema,
  connectionRequestSchema,
  messageCreateSchema,
  anonymousPostCreateSchema,
  communityCreateSchema,
  jobPostingCreateSchema,
  searchFiltersSchema,
  paginationSchema,
  fileUploadSchema,
  moderationActionSchema,
  reportSchema,
  notificationPreferencesSchema
} from './validators';

// Export specific utilities for convenience
export {
  CryptoUtils,
  JWTUtils,
  StringUtils,
  DateUtils,
  ValidationUtils,
  ArrayUtils,
  UrlUtils,
  SearchUtils,
  RateLimitUtils
} from './utils';

// Version information
export const SHARED_PACKAGE_VERSION = '1.0.0';
