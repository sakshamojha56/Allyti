// Common types used across the Allyti platform

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'suspended' | 'deactivated';
}

export interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  profilePhotoUrl?: string;
  headline?: string;
  bio?: string;
  currentLocation?: string;
  institution: Institution;
  graduationYear: number;
  program: Program;
  branch?: string;
  cgpa?: number;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  privacySettings: PrivacySettings;
  verificationStatus: VerificationLevel;
  verificationDocuments: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AnonymousUser {
  id: string;
  anonymousId: string;
  publicKey: string;
  createdAt: Date;
  lastActive: Date;
  communities: string[];
  reputation: number;
  flairPreferences: FlairPreferences;
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  mediaUrls: string[];
  postType: PostType;
  visibility: Visibility;
  tags: string[];
  mentions: string[];
  linkPreview?: LinkPreview;
  isPinned: boolean;
  isActive: boolean;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnonymousPost {
  id: string;
  anonymousId: string;
  communityId: string;
  title: string;
  content: string;
  contentType: string;
  mediaUrls: string[];
  upvotes: number;
  downvotes: number;
  commentCount: number;
  viewCount: number;
  flair?: AnonymousFlair;
  flags: string[];
  isDeleted: boolean;
  isLocked: boolean;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Community {
  id: string;
  name: string;
  displayName: string;
  description: string;
  category: CommunityCategory;
  subCategory?: string;
  tags: string[];
  rules: CommunityRule[];
  moderators: string[];
  memberCount: number;
  postCount: number;
  isPrivate: boolean;
  inviteOnly: boolean;
  minReputationRequired: number;
  settings: CommunitySettings;
  analytics: CommunityAnalytics;
  createdAt: Date;
  updatedAt: Date;
}

export interface Connection {
  id: string;
  requesterId: string;
  recipientId: string;
  status: ConnectionStatus;
  connectionType: ConnectionType;
  note?: string;
  mutualConnections: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  messageType: MessageType;
  mediaUrl?: string;
  isEdited: boolean;
  readBy: Record<string, Date>;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobPosting {
  id: string;
  posterId: string;
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  requirements: string;
  location: string;
  salaryRange?: string;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  applicationUrl?: string;
  applicationDeadline?: Date;
  isActive: boolean;
  viewCount: number;
  applicationCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Enums and Types
export type Institution = 
  | 'IIT_B' | 'IIT_D' | 'IIT_K' | 'IIT_M' | 'IIT_KGP' | 'IIT_G' | 'IIT_BHU' | 'IIT_BBS'
  | 'IIT_H' | 'IIT_I' | 'IIT_P' | 'IIT_J' | 'IIT_PKD' | 'IIT_MANDI' | 'IIT_RPR'
  | 'IIT_GOA' | 'IIT_DH' | 'IIT_TDM' | 'IIT_BHILAI' | 'IIT_GN' | 'IIT_JMU' | 'IIT_TIRUPATI'
  | 'IIM_A' | 'IIM_B' | 'IIM_C' | 'IIM_L' | 'IIM_I' | 'IIM_K' | 'IIM_S' | 'IIM_R'
  | 'IIM_U' | 'IIM_V' | 'IIM_TRICHY' | 'IIM_UDAIPUR' | 'IIM_N' | 'IIM_AMRITSAR'
  | 'IIM_JAMMU' | 'IIM_BODHGAYA' | 'IIM_SAMBALPUR' | 'IIM_SIRMAUR' | 'IIM_VISAKHAPATNAM';

export type Program = 'BTech' | 'MTech' | 'MBA' | 'PhD' | 'Integrated' | 'MS' | 'MSc';

export type PostType = 'text' | 'image' | 'video' | 'article' | 'poll' | 'job' | 'event';

export type Visibility = 'public' | 'connections' | 'custom' | 'private';

export type ConnectionStatus = 'pending' | 'accepted' | 'declined' | 'blocked';

export type ConnectionType = 'professional' | 'batchmate' | 'mentorship' | 'collaboration';

export type MessageType = 'text' | 'image' | 'file' | 'video' | 'audio';

export type JobType = 'full_time' | 'part_time' | 'contract' | 'internship' | 'fellowship';

export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead' | 'executive';

export type VerificationLevel = 'email' | 'document' | 'alumni_vouched' | 'verified';

export type CommunityCategory = 'academic' | 'career' | 'life' | 'fun' | 'institution_specific';

// Interfaces for nested objects
export interface PrivacySettings {
  showEmail: boolean;
  showPhone: boolean;
  showLocation: boolean;
  showCGPA: boolean;
  profileVisibility: 'public' | 'connections' | 'alumni' | 'batch';
  allowMessages: 'everyone' | 'connections' | 'alumni' | 'none';
  showOnlineStatus: boolean;
  allowTagging: boolean;
}

export interface FlairPreferences {
  showBatchRange: boolean;
  showProgramType: boolean;
  showExperienceLevel: boolean;
  customFlair?: string;
}

export interface AnonymousFlair {
  batchRange?: string;
  programType?: string;
  experienceLevel?: string;
  custom?: string;
  verifiedBadges: string[];
}

export interface LinkPreview {
  url: string;
  title: string;
  description: string;
  imageUrl?: string;
  siteName?: string;
}

export interface CommunityRule {
  title: string;
  description: string;
  violationPenalty: string;
}

export interface CommunitySettings {
  allowImages: boolean;
  allowVideos: boolean;
  allowPolls: boolean;
  allowExternalLinks: boolean;
  requireFlair: boolean;
  autoModerationLevel: 'low' | 'medium' | 'high';
  slowModeDelay: number;
  archivePostsAfter: number;
}

export interface CommunityAnalytics {
  dailyActiveUsers: number;
  weeklyActiveUsers: number;
  averagePostsPerDay: number;
  engagementRate: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T = any> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  institution: Institution;
  program: Program;
  graduationYear: number;
  branch?: string;
}

// Error types
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

// Event types for real-time communication
export interface WebSocketEvent {
  type: string;
  payload: any;
  timestamp: Date;
  userId?: string;
}

export interface NotificationData {
  id: string;
  userId: string;
  type: 'connection_request' | 'message' | 'post_like' | 'comment' | 'mention' | 'job_alert';
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  createdAt: Date;
}

// Search and filter types
export interface SearchFilters {
  query?: string;
  institution?: Institution[];
  program?: Program[];
  graduationYear?: { from?: number; to?: number };
  location?: string;
  skills?: string[];
  company?: string;
  available?: ('mentoring' | 'hiring' | 'collaboration')[];
}

export interface PostFilters {
  postType?: PostType[];
  dateRange?: { from?: Date; to?: Date };
  author?: string;
  tags?: string[];
  sortBy?: 'recent' | 'popular' | 'trending';
}

export interface CommunityFilters {
  category?: CommunityCategory;
  institution?: Institution;
  memberCount?: { min?: number; max?: number };
  isPrivate?: boolean;
  sortBy?: 'popular' | 'recent' | 'active';
}
