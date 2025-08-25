import { z } from 'zod';
import { INSTITUTIONS, PROGRAMS, ALL_EMAIL_DOMAINS, VALIDATION } from '../constants';

// Basic validation schemas
export const emailSchema = z
  .string()
  .email('Invalid email format')
  .refine(
    (email) => ALL_EMAIL_DOMAINS.some(domain => email.endsWith(`@${domain}`)),
    'Email must be from a valid IIT/IIM domain'
  );

export const passwordSchema = z
  .string()
  .min(VALIDATION.PASSWORD_MIN_LENGTH, `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`)
  .max(VALIDATION.PASSWORD_MAX_LENGTH, `Password must be less than ${VALIDATION.PASSWORD_MAX_LENGTH} characters`)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');

export const uuidSchema = z.string().uuid('Invalid UUID format');

export const institutionSchema = z.enum(Object.keys(INSTITUTIONS) as [keyof typeof INSTITUTIONS, ...Array<keyof typeof INSTITUTIONS>]);

export const programSchema = z.enum(Object.keys(PROGRAMS) as [keyof typeof PROGRAMS, ...Array<keyof typeof PROGRAMS>]);

// User registration schema
export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
  institution: institutionSchema,
  program: programSchema,
  graduationYear: z.number().int()
    .min(1950, 'Invalid graduation year')
    .max(new Date().getFullYear() + 10, 'Invalid graduation year'),
  branch: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions')
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// User login schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional()
});

// Profile update schema
export const profileUpdateSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long').optional(),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long').optional(),
  headline: z.string().max(VALIDATION.HEADLINE_MAX_LENGTH, 'Headline too long').optional(),
  bio: z.string().max(VALIDATION.BIO_MAX_LENGTH, 'Bio too long').optional(),
  currentLocation: z.string().max(100, 'Location too long').optional(),
  portfolioUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  linkedinUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  cgpa: z.number().min(0, 'CGPA cannot be negative').max(10, 'CGPA cannot exceed 10').optional(),
  privacySettings: z.object({
    showEmail: z.boolean(),
    showPhone: z.boolean(),
    showLocation: z.boolean(),
    showCGPA: z.boolean(),
    profileVisibility: z.enum(['public', 'connections', 'alumni', 'batch']),
    allowMessages: z.enum(['everyone', 'connections', 'alumni', 'none']),
    showOnlineStatus: z.boolean(),
    allowTagging: z.boolean()
  }).optional()
});

// Post creation schema
export const postCreateSchema = z.object({
  content: z.string().min(1, 'Post content is required').max(VALIDATION.POST_MAX_LENGTH, 'Post too long'),
  mediaUrls: z.array(z.string().url()).max(10, 'Too many media files').optional(),
  postType: z.enum(['text', 'image', 'video', 'article', 'poll', 'job', 'event']),
  visibility: z.enum(['public', 'connections', 'custom', 'private']),
  tags: z.array(z.string()).max(10, 'Too many tags').optional(),
  mentions: z.array(uuidSchema).max(20, 'Too many mentions').optional(),
  pollData: z.object({
    options: z.array(z.string()).min(2, 'Poll must have at least 2 options').max(6, 'Poll cannot have more than 6 options'),
    multipleChoice: z.boolean(),
    expiresAt: z.date().optional()
  }).optional()
});

// Comment creation schema
export const commentCreateSchema = z.object({
  postId: uuidSchema,
  content: z.string().min(1, 'Comment content is required').max(VALIDATION.COMMENT_MAX_LENGTH, 'Comment too long'),
  parentCommentId: uuidSchema.optional(),
  mentions: z.array(uuidSchema).max(10, 'Too many mentions').optional()
});

// Connection request schema
export const connectionRequestSchema = z.object({
  recipientId: uuidSchema,
  note: z.string().max(500, 'Note too long').optional(),
  connectionType: z.enum(['professional', 'batchmate', 'mentorship', 'collaboration'])
});

// Message schema
export const messageCreateSchema = z.object({
  recipientId: uuidSchema.optional(),
  conversationId: uuidSchema.optional(),
  content: z.string().min(1, 'Message content is required').max(1000, 'Message too long'),
  messageType: z.enum(['text', 'image', 'file', 'video', 'audio'])
}).refine(data => data.recipientId || data.conversationId, {
  message: 'Either recipientId or conversationId must be provided'
});

// Anonymous post schema
export const anonymousPostCreateSchema = z.object({
  communityId: uuidSchema,
  title: z.string().min(1, 'Title is required').max(300, 'Title too long'),
  content: z.string().min(1, 'Content is required').max(VALIDATION.POST_MAX_LENGTH, 'Content too long'),
  contentType: z.enum(['text', 'image', 'poll', 'link']),
  mediaUrls: z.array(z.string().url()).max(5, 'Too many media files').optional(),
  flair: z.object({
    batchRange: z.string().optional(),
    programType: z.string().optional(),
    experienceLevel: z.string().optional(),
    custom: z.string().max(50, 'Custom flair too long').optional()
  }).optional(),
  pollData: z.object({
    options: z.array(z.string()).min(2).max(6),
    multipleChoice: z.boolean(),
    expiresAt: z.date().optional()
  }).optional()
});

// Community creation schema
export const communityCreateSchema = z.object({
  name: z.string().min(3, 'Community name too short').max(50, 'Community name too long')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Community name can only contain letters, numbers, hyphens, and underscores'),
  displayName: z.string().min(3, 'Display name too short').max(100, 'Display name too long'),
  description: z.string().min(10, 'Description too short').max(500, 'Description too long'),
  category: z.enum(['academic', 'career', 'life', 'fun', 'institution_specific']),
  subCategory: z.string().max(50, 'Sub-category too long').optional(),
  tags: z.array(z.string()).max(10, 'Too many tags').optional(),
  rules: z.array(z.object({
    title: z.string().min(1, 'Rule title required').max(100, 'Rule title too long'),
    description: z.string().min(1, 'Rule description required').max(500, 'Rule description too long'),
    violationPenalty: z.string().min(1, 'Penalty description required').max(200, 'Penalty description too long')
  })).max(20, 'Too many rules').optional(),
  isPrivate: z.boolean(),
  inviteOnly: z.boolean(),
  minReputationRequired: z.number().int().min(0, 'Reputation cannot be negative').max(10000, 'Reputation too high').optional(),
  settings: z.object({
    allowImages: z.boolean(),
    allowVideos: z.boolean(),
    allowPolls: z.boolean(),
    allowExternalLinks: z.boolean(),
    requireFlair: z.boolean(),
    autoModerationLevel: z.enum(['low', 'medium', 'high']),
    slowModeDelay: z.number().int().min(0).max(3600), // Max 1 hour
    archivePostsAfter: z.number().int().min(1).max(365) // Max 1 year
  }).optional()
});

// Job posting schema
export const jobPostingCreateSchema = z.object({
  companyName: z.string().min(1, 'Company name is required').max(200, 'Company name too long'),
  jobTitle: z.string().min(1, 'Job title is required').max(200, 'Job title too long'),
  jobDescription: z.string().min(10, 'Job description too short').max(5000, 'Job description too long'),
  requirements: z.string().max(2000, 'Requirements too long').optional(),
  location: z.string().min(1, 'Location is required').max(100, 'Location too long'),
  salaryRange: z.string().max(100, 'Salary range too long').optional(),
  jobType: z.enum(['full_time', 'part_time', 'contract', 'internship', 'fellowship']),
  experienceLevel: z.enum(['entry', 'mid', 'senior', 'lead', 'executive']),
  applicationUrl: z.string().url('Invalid URL').optional(),
  applicationDeadline: z.date().min(new Date(), 'Deadline must be in the future').optional(),
  requiredSkills: z.array(z.string()).max(20, 'Too many skills').optional(),
  preferredInstitutions: z.array(institutionSchema).max(30, 'Too many institutions').optional()
});

// Search filters schema
export const searchFiltersSchema = z.object({
  query: z.string().max(200, 'Search query too long').optional(),
  institution: z.array(institutionSchema).optional(),
  program: z.array(programSchema).optional(),
  graduationYear: z.object({
    from: z.number().int().min(1950).optional(),
    to: z.number().int().max(new Date().getFullYear() + 10).optional()
  }).optional(),
  location: z.string().max(100, 'Location too long').optional(),
  skills: z.array(z.string()).max(20, 'Too many skills').optional(),
  company: z.string().max(200, 'Company name too long').optional(),
  available: z.array(z.enum(['mentoring', 'hiring', 'collaboration'])).optional()
});

// Pagination schema
export const paginationSchema = z.object({
  page: z.number().int().min(1, 'Page must be at least 1').default(1),
  pageSize: z.number().int().min(1, 'Page size must be at least 1').max(100, 'Page size too large').default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

// File upload schema
export const fileUploadSchema = z.object({
  file: z.object({
    mimetype: z.string().refine(
      (type) => ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'application/pdf'].includes(type),
      'Invalid file type'
    ),
    size: z.number().max(VALIDATION.FILE_SIZE_LIMITS.POST_IMAGE, 'File too large')
  }),
  uploadType: z.enum(['profile_photo', 'post_media', 'document', 'community_banner'])
});

// Moderation action schema
export const moderationActionSchema = z.object({
  targetId: uuidSchema,
  targetType: z.enum(['post', 'comment', 'user', 'community']),
  action: z.enum(['warning', 'mute', 'ban', 'delete', 'lock', 'pin', 'feature']),
  reason: z.string().min(1, 'Reason is required').max(500, 'Reason too long'),
  duration: z.number().int().min(1).max(365).optional(), // Duration in days
  isPublic: z.boolean().default(false),
  notifyUser: z.boolean().default(true)
});

// Report schema
export const reportSchema = z.object({
  targetId: uuidSchema,
  targetType: z.enum(['post', 'comment', 'user', 'message']),
  reason: z.enum([
    'spam',
    'harassment',
    'hate_speech',
    'inappropriate_content',
    'misinformation',
    'copyright_violation',
    'personal_information',
    'other'
  ]),
  description: z.string().max(1000, 'Description too long').optional(),
  evidence: z.array(z.string().url()).max(5, 'Too many evidence files').optional()
});

// Notification preferences schema
export const notificationPreferencesSchema = z.object({
  email: z.object({
    connectionRequests: z.boolean(),
    messages: z.boolean(),
    postLikes: z.boolean(),
    comments: z.boolean(),
    mentions: z.boolean(),
    jobAlerts: z.boolean(),
    weeklyDigest: z.boolean()
  }),
  push: z.object({
    connectionRequests: z.boolean(),
    messages: z.boolean(),
    postLikes: z.boolean(),
    comments: z.boolean(),
    mentions: z.boolean(),
    jobAlerts: z.boolean()
  }),
  inApp: z.object({
    connectionRequests: z.boolean(),
    messages: z.boolean(),
    postLikes: z.boolean(),
    comments: z.boolean(),
    mentions: z.boolean(),
    jobAlerts: z.boolean()
  })
});

// Export all schemas for type inference
export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;
export type PostCreateData = z.infer<typeof postCreateSchema>;
export type CommentCreateData = z.infer<typeof commentCreateSchema>;
export type ConnectionRequestData = z.infer<typeof connectionRequestSchema>;
export type MessageCreateData = z.infer<typeof messageCreateSchema>;
export type AnonymousPostCreateData = z.infer<typeof anonymousPostCreateSchema>;
export type CommunityCreateData = z.infer<typeof communityCreateSchema>;
export type JobPostingCreateData = z.infer<typeof jobPostingCreateSchema>;
export type SearchFiltersData = z.infer<typeof searchFiltersSchema>;
export type PaginationData = z.infer<typeof paginationSchema>;
export type FileUploadData = z.infer<typeof fileUploadSchema>;
export type ModerationActionData = z.infer<typeof moderationActionSchema>;
export type ReportData = z.infer<typeof reportSchema>;
export type NotificationPreferencesData = z.infer<typeof notificationPreferencesSchema>;
