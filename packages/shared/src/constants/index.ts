// Application-wide constants

// Institution mappings
export const INSTITUTIONS = {
  // IITs
  IIT_B: 'IIT Bombay',
  IIT_D: 'IIT Delhi', 
  IIT_K: 'IIT Kanpur',
  IIT_M: 'IIT Madras',
  IIT_KGP: 'IIT Kharagpur',
  IIT_G: 'IIT Guwahati',
  IIT_BHU: 'IIT (BHU) Varanasi',
  IIT_BBS: 'IIT Bhubaneswar',
  IIT_H: 'IIT Hyderabad',
  IIT_I: 'IIT Indore',
  IIT_P: 'IIT Patna',
  IIT_J: 'IIT Jodhpur',
  IIT_PKD: 'IIT Palakkad',
  IIT_MANDI: 'IIT Mandi',
  IIT_RPR: 'IIT Ropar',
  IIT_GOA: 'IIT Goa',
  IIT_DH: 'IIT Dharwad',
  IIT_TDM: 'IIT Tirupati',
  IIT_BHILAI: 'IIT Bhilai',
  IIT_GN: 'IIT Gandhinagar',
  IIT_JMU: 'IIT Jammu',
  IIT_TIRUPATI: 'IIT Tirupati',
  
  // IIMs
  IIM_A: 'IIM Ahmedabad',
  IIM_B: 'IIM Bangalore',
  IIM_C: 'IIM Calcutta',
  IIM_L: 'IIM Lucknow',
  IIM_I: 'IIM Indore',
  IIM_K: 'IIM Kozhikode',
  IIM_S: 'IIM Shillong',
  IIM_R: 'IIM Ranchi',
  IIM_U: 'IIM Udaipur',
  IIM_V: 'IIM Visakhapatnam',
  IIM_TRICHY: 'IIM Tiruchirappalli',
  IIM_UDAIPUR: 'IIM Udaipur',
  IIM_N: 'IIM Nagpur',
  IIM_AMRITSAR: 'IIM Amritsar',
  IIM_JAMMU: 'IIM Jammu',
  IIM_BODHGAYA: 'IIM Bodh Gaya',
  IIM_SAMBALPUR: 'IIM Sambalpur',
  IIM_SIRMAUR: 'IIM Sirmaur',
  IIM_VISAKHAPATNAM: 'IIM Visakhapatnam'
} as const;

// Email domains for verification
export const IIT_EMAIL_DOMAINS = [
  'iitb.ac.in', 'iitd.ac.in', 'iitk.ac.in', 'iitm.ac.in', 'iitkgp.ac.in',
  'iitg.ac.in', 'itbhu.ac.in', 'iitbbs.ac.in', 'iith.ac.in', 'iiti.ac.in',
  'iitp.ac.in', 'iitj.ac.in', 'iitpkd.ac.in', 'iitmandi.ac.in', 'iitrpr.ac.in',
  'iitgoa.ac.in', 'iitdh.ac.in', 'iittdm.ac.in', 'iitbhilai.ac.in', 'iitgn.ac.in',
  'iitjmu.ac.in', 'iittirupati.ac.in'
];

export const IIM_EMAIL_DOMAINS = [
  'iima.ac.in', 'iimb.ac.in', 'iimc.ac.in', 'iiml.ac.in', 'iimi.ac.in',
  'iimk.ac.in', 'iims.ac.in', 'iimr.ac.in', 'iimu.ac.in', 'iimv.ac.in',
  'iimtrichy.ac.in', 'iimn.ac.in', 'iimamritsar.ac.in', 'iimjammu.ac.in',
  'iimbodhgaya.ac.in', 'iimsambalpur.ac.in', 'iimsirmaur.ac.in', 'iimvisakhapatnam.ac.in'
];

export const ALL_EMAIL_DOMAINS = [...IIT_EMAIL_DOMAINS, ...IIM_EMAIL_DOMAINS];

// Program types
export const PROGRAMS = {
  BTech: 'Bachelor of Technology',
  MTech: 'Master of Technology',
  MBA: 'Master of Business Administration',
  PhD: 'Doctor of Philosophy',
  Integrated: 'Integrated Program',
  MS: 'Master of Science',
  MSc: 'Master of Science'
} as const;

// Engineering branches
export const ENGINEERING_BRANCHES = [
  'Computer Science and Engineering',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Electronics and Communication Engineering',
  'Aerospace Engineering',
  'Biotechnology',
  'Materials Science and Engineering',
  'Engineering Physics',
  'Engineering Design',
  'Ocean Engineering',
  'Metallurgical Engineering',
  'Textile Technology',
  'Industrial Engineering',
  'Environmental Engineering',
  'Agricultural Engineering',
  'Mining Engineering',
  'Naval Architecture',
  'Production Engineering'
];

// MBA specializations
export const MBA_SPECIALIZATIONS = [
  'Finance',
  'Marketing',
  'Operations',
  'Strategy',
  'Human Resources',
  'Information Technology',
  'Entrepreneurship',
  'International Business',
  'Supply Chain Management',
  'Business Analytics',
  'Healthcare Management',
  'Real Estate',
  'Agribusiness',
  'Public Policy',
  'Digital Marketing',
  'Investment Banking',
  'Consulting'
];

// Community categories
export const COMMUNITY_CATEGORIES = {
  academic: 'Academic',
  career: 'Career',
  life: 'Life & Wellness',
  fun: 'Entertainment & Fun',
  institution_specific: 'Institution Specific'
} as const;

// Post types
export const POST_TYPES = {
  text: 'Text Post',
  image: 'Image Post',
  video: 'Video Post',
  article: 'Article',
  poll: 'Poll',
  job: 'Job Posting',
  event: 'Event'
} as const;

// Job types
export const JOB_TYPES = {
  full_time: 'Full Time',
  part_time: 'Part Time',
  contract: 'Contract',
  internship: 'Internship',
  fellowship: 'Fellowship'
} as const;

// Experience levels
export const EXPERIENCE_LEVELS = {
  entry: 'Entry Level (0-2 years)',
  mid: 'Mid Level (2-5 years)',
  senior: 'Senior Level (5-10 years)',
  lead: 'Lead Level (10-15 years)',
  executive: 'Executive Level (15+ years)'
} as const;

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    REFRESH: '/api/auth/refresh',
    LOGOUT: '/api/auth/logout',
    VERIFY_EMAIL: '/api/auth/verify-email',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    ANONYMOUS_TOKEN: '/api/auth/anonymous'
  },
  USER: {
    PROFILE: '/api/v1/users/profile',
    SEARCH: '/api/v1/users/search',
    VERIFY_DOCUMENT: '/api/v1/users/verify-document'
  },
  POSTS: {
    LIST: '/api/v1/posts',
    CREATE: '/api/v1/posts',
    GET: '/api/v1/posts/:id',
    UPDATE: '/api/v1/posts/:id',
    DELETE: '/api/v1/posts/:id',
    LIKE: '/api/v1/posts/:id/like',
    COMMENT: '/api/v1/posts/:id/comments'
  },
  CONNECTIONS: {
    LIST: '/api/v1/connections',
    REQUEST: '/api/v1/connections/request',
    ACCEPT: '/api/v1/connections/:id/accept',
    DECLINE: '/api/v1/connections/:id/decline',
    BLOCK: '/api/v1/connections/:id/block'
  },
  MESSAGES: {
    CONVERSATIONS: '/api/v1/messages/conversations',
    SEND: '/api/v1/messages/send',
    HISTORY: '/api/v1/messages/:conversationId'
  },
  JOBS: {
    LIST: '/api/v1/jobs',
    CREATE: '/api/v1/jobs',
    GET: '/api/v1/jobs/:id',
    APPLY: '/api/v1/jobs/:id/apply'
  },
  ANONYMOUS: {
    COMMUNITIES: '/api/v1/anonymous/communities',
    POSTS: '/api/v1/anonymous/posts',
    VOTE: '/api/v1/anonymous/posts/:id/vote',
    COMMENTS: '/api/v1/anonymous/posts/:id/comments'
  }
} as const;

// Validation constants
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  POST_MAX_LENGTH: 5000,
  COMMENT_MAX_LENGTH: 1000,
  HEADLINE_MAX_LENGTH: 200,
  BIO_MAX_LENGTH: 2000,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 30,
  FILE_SIZE_LIMITS: {
    PROFILE_PHOTO: 5 * 1024 * 1024, // 5MB
    POST_IMAGE: 10 * 1024 * 1024,   // 10MB
    POST_VIDEO: 100 * 1024 * 1024,  // 100MB
    DOCUMENT: 10 * 1024 * 1024      // 10MB
  }
} as const;

// Rate limiting
export const RATE_LIMITS = {
  LOGIN_ATTEMPTS: 5,
  LOGIN_WINDOW: 15 * 60 * 1000, // 15 minutes
  API_REQUESTS_PER_HOUR: 1000,
  POST_CREATION_PER_HOUR: 10,
  COMMENT_CREATION_PER_HOUR: 50,
  MESSAGE_SENDING_PER_HOUR: 100
} as const;

// WebSocket events
export const WS_EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  MESSAGE: 'message',
  NOTIFICATION: 'notification',
  USER_ONLINE: 'user_online',
  USER_OFFLINE: 'user_offline',
  TYPING_START: 'typing_start',
  TYPING_STOP: 'typing_stop',
  POST_UPDATE: 'post_update',
  COMMENT_UPDATE: 'comment_update'
} as const;

// Cache keys
export const CACHE_KEYS = {
  USER_PROFILE: (userId: string) => `user:profile:${userId}`,
  USER_CONNECTIONS: (userId: string) => `user:connections:${userId}`,
  POST_FEED: (userId: string) => `post:feed:${userId}`,
  COMMUNITY_POSTS: (communityId: string) => `community:posts:${communityId}`,
  SEARCH_RESULTS: (query: string) => `search:${encodeURIComponent(query)}`,
  TRENDING_TOPICS: 'trending:topics',
  POPULAR_COMMUNITIES: 'popular:communities'
} as const;

// Error codes
export const ERROR_CODES = {
  // Authentication errors
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
  ACCOUNT_SUSPENDED: 'ACCOUNT_SUSPENDED',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  
  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_EMAIL_DOMAIN: 'INVALID_EMAIL_DOMAIN',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  WEAK_PASSWORD: 'WEAK_PASSWORD',
  
  // Authorization errors
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  ACCESS_DENIED: 'ACCESS_DENIED',
  
  // Rate limiting
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  
  // Server errors
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR'
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  EMAIL_VERIFICATION_SENT: 'Email verification link sent successfully',
  PASSWORD_RESET_SENT: 'Password reset link sent successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  POST_CREATED: 'Post created successfully',
  CONNECTION_REQUEST_SENT: 'Connection request sent successfully',
  MESSAGE_SENT: 'Message sent successfully'
} as const;

// Default values
export const DEFAULTS = {
  PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  SEARCH_DEBOUNCE_MS: 300,
  AUTO_SAVE_INTERVAL_MS: 30000,
  SESSION_TIMEOUT_MS: 24 * 60 * 60 * 1000, // 24 hours
  ANONYMOUS_SESSION_TIMEOUT_MS: 60 * 60 * 1000, // 1 hour
  NOTIFICATION_DISPLAY_DURATION: 5000
} as const;
