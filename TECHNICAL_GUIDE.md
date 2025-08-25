# Allyti Technical Implementation Guide

## Quick Start Development Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- Docker and Docker Compose
- PostgreSQL 15+
- MongoDB 6+
- Redis 7+
- Elasticsearch 8+

### Local Development Environment

#### 1. Clone and Setup
```bash
git clone https://github.com/your-org/allyti.git
cd allyti
npm install
```

#### 2. Environment Configuration
```bash
# Copy environment template
cp .env.example .env.local

# Configure your local environment variables
# Database URLs, API keys, etc.
```

#### 3. Database Setup
```bash
# Start infrastructure services
docker-compose up -d postgres mongodb redis elasticsearch

# Run database migrations
npm run db:migrate
npm run db:seed
```

#### 4. Start Development Server
```bash
# Start all services
npm run dev

# Or start individual services
npm run dev:api
npm run dev:web
npm run dev:mobile
```

### Project Structure

```
allyti/
├── apps/
│   ├── web/                 # React web application
│   ├── mobile/              # React Native mobile app
│   ├── api/                 # Main API server
│   └── admin/               # Admin dashboard
├── packages/
│   ├── shared/              # Shared utilities and types
│   ├── database/            # Database schemas and migrations
│   └── auth/                # Authentication library
├── services/
│   ├── user-service/        # User management microservice
│   ├── content-service/     # Content management microservice
│   ├── notification-service/# Notification microservice
│   └── moderation-service/  # AI moderation microservice
├── infrastructure/
│   ├── docker/              # Docker configurations
│   ├── kubernetes/          # K8s deployment configs
│   └── terraform/           # Infrastructure as code
└── docs/                    # Documentation
```

## API Design Patterns

### GraphQL Schema Example

```graphql
type User {
  id: ID!
  email: String!
  profile: Profile
  isVerified: Boolean!
  createdAt: DateTime!
}

type Profile {
  id: ID!
  firstName: String!
  lastName: String!
  institution: Institution!
  graduationYear: Int!
  program: Program!
  headline: String
  bio: String
  skills: [Skill!]!
  connections: [Connection!]!
}

type Post {
  id: ID!
  author: User!
  content: String!
  mediaUrls: [String!]!
  postType: PostType!
  visibility: Visibility!
  likes: Int!
  comments: [Comment!]!
  createdAt: DateTime!
}

type Query {
  me: User
  user(id: ID!): User
  posts(filter: PostFilter): [Post!]!
  searchUsers(query: String!): [User!]!
}

type Mutation {
  createPost(input: CreatePostInput!): Post!
  likePost(postId: ID!): Post!
  sendConnectionRequest(userId: ID!): Connection!
}

type Subscription {
  postUpdates: Post!
  messageReceived: Message!
  notificationReceived: Notification!
}
```

### REST API Endpoints

#### Authentication
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
POST /api/auth/verify-email
POST /api/auth/forgot-password
```

#### Professional Section
```
GET    /api/v1/users/profile
PUT    /api/v1/users/profile
GET    /api/v1/users/search
GET    /api/v1/posts
POST   /api/v1/posts
GET    /api/v1/posts/:id
PUT    /api/v1/posts/:id
DELETE /api/v1/posts/:id
POST   /api/v1/connections/request
PUT    /api/v1/connections/:id/accept
```

#### Anonymous Section
```
GET    /api/v1/anonymous/communities
POST   /api/v1/anonymous/communities
GET    /api/v1/anonymous/posts
POST   /api/v1/anonymous/posts
POST   /api/v1/anonymous/posts/:id/vote
GET    /api/v1/anonymous/posts/:id/comments
POST   /api/v1/anonymous/posts/:id/comments
```

## Security Implementation

### Authentication Flow

```typescript
// JWT Token Structure
interface JWTPayload {
  userId: string;
  email: string;
  isVerified: boolean;
  institution: string;
  tokenType: 'access' | 'refresh';
  iat: number;
  exp: number;
}

// Anonymous Token Structure
interface AnonymousToken {
  anonymousId: string; // Cryptographically generated
  communityIds: string[];
  reputation: number;
  iat: number;
  exp: number;
}
```

### Privacy Protection Middleware

```typescript
// Middleware to prevent identity leakage
export const anonymityProtection = (req: Request, res: Response, next: NextFunction) => {
  // Remove identifying headers
  delete req.headers['x-forwarded-for'];
  delete req.headers['x-real-ip'];
  
  // Add anonymous proxy headers
  req.headers['x-anonymous-session'] = generateAnonymousSession();
  
  next();
};

// Zero-knowledge identity verification
export const verifyAnonymousToken = (token: string): AnonymousIdentity => {
  // Verify without revealing professional identity
  const payload = jwt.verify(token, process.env.ANONYMOUS_JWT_SECRET);
  return {
    anonymousId: payload.anonymousId,
    // No linkage to professional profile
  };
};
```

### Data Encryption

```typescript
// Client-side encryption for sensitive data
export class EncryptionService {
  private static publicKey: string;
  private static privateKey: string;

  static async encryptSensitiveData(data: string): Promise<string> {
    return await crypto.subtle.encrypt(
      { name: 'RSA-OAEP' },
      this.publicKey,
      new TextEncoder().encode(data)
    );
  }

  static async decryptSensitiveData(encryptedData: string): Promise<string> {
    const decrypted = await crypto.subtle.decrypt(
      { name: 'RSA-OAEP' },
      this.privateKey,
      encryptedData
    );
    return new TextDecoder().decode(decrypted);
  }
}
```

## Database Implementation

### Professional Database Schema (PostgreSQL)

```sql
-- Complete user management schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table with enhanced security
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    password_hash VARCHAR(255) NOT NULL,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    last_login TIMESTAMP,
    login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status user_status DEFAULT 'active'
);

-- Professional profiles with privacy controls
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    profile_photo_url VARCHAR(500),
    headline VARCHAR(200),
    bio TEXT,
    current_location VARCHAR(100),
    institution institution_type NOT NULL,
    graduation_year INTEGER,
    program program_type NOT NULL,
    branch VARCHAR(100),
    cgpa DECIMAL(3,2),
    portfolio_url VARCHAR(500),
    github_url VARCHAR(500),
    linkedin_url VARCHAR(500),
    privacy_settings JSONB DEFAULT '{}',
    verification_status verification_level DEFAULT 'email',
    verification_documents JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enhanced posts table with rich content support
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    media_urls JSONB DEFAULT '[]',
    post_type post_type_enum DEFAULT 'text',
    visibility visibility_enum DEFAULT 'public',
    tags JSONB DEFAULT '[]',
    mentions JSONB DEFAULT '[]',
    link_preview JSONB,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Full-text search
    search_vector tsvector GENERATED ALWAYS AS (
        to_tsvector('english', content || ' ' || COALESCE(jsonb_extract_path_text(tags, '*'), ''))
    ) STORED
);

-- Advanced connection management
CREATE TABLE connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_id UUID REFERENCES users(id) ON DELETE CASCADE,
    recipient_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status connection_status DEFAULT 'pending',
    connection_type connection_type_enum DEFAULT 'professional',
    note TEXT,
    mutual_connections INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(requester_id, recipient_id)
);

-- Skills and endorsements
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    category skill_category,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_level skill_level DEFAULT 'beginner',
    years_of_experience DECIMAL(3,1),
    endorsement_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, skill_id)
);

CREATE TABLE endorsements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    endorser_id UUID REFERENCES users(id) ON DELETE CASCADE,
    user_skill_id UUID REFERENCES user_skills(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(endorser_id, user_skill_id)
);

-- Job board
CREATE TABLE job_postings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    poster_id UUID REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(200) NOT NULL,
    job_title VARCHAR(200) NOT NULL,
    job_description TEXT NOT NULL,
    requirements TEXT,
    location VARCHAR(100),
    salary_range VARCHAR(100),
    job_type job_type_enum DEFAULT 'full_time',
    experience_level experience_level_enum DEFAULT 'entry',
    application_url VARCHAR(500),
    application_deadline DATE,
    is_active BOOLEAN DEFAULT TRUE,
    view_count INTEGER DEFAULT 0,
    application_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messaging system
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    participants JSONB NOT NULL, -- Array of user IDs
    conversation_type conversation_type_enum DEFAULT 'direct',
    title VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    message_type message_type_enum DEFAULT 'text',
    media_url VARCHAR(500),
    is_edited BOOLEAN DEFAULT FALSE,
    read_by JSONB DEFAULT '{}', -- User ID -> timestamp mapping
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_posts_author_created ON posts(author_id, created_at DESC);
CREATE INDEX idx_posts_search ON posts USING gin(search_vector);
CREATE INDEX idx_connections_status ON connections(status);
CREATE INDEX idx_messages_conversation ON messages(conversation_id, created_at);
CREATE INDEX idx_job_postings_active ON job_postings(is_active, created_at DESC);
```

### Anonymous Database Schema (MongoDB)

```javascript
// Anonymous user collection with enhanced privacy
{
  _id: ObjectId,
  anonymous_id: String, // Cryptographically secure random ID
  public_key: String, // For end-to-end encryption
  created_at: Date,
  last_active: Date,
  communities: [ObjectId],
  reputation: {
    total: Number,
    by_community: Map<ObjectId, Number>
  },
  flair_settings: {
    global_flair: {
      show_batch_range: Boolean,
      show_program_type: Boolean,
      show_experience_level: Boolean,
      custom_text: String
    },
    community_specific: Map<ObjectId, Object>
  },
  privacy_settings: {
    auto_delete_posts_after: Number, // Days
    allow_dms: Boolean,
    show_online_status: Boolean
  },
  moderation_history: [{
    action: String,
    reason: String,
    community_id: ObjectId,
    timestamp: Date,
    expires_at: Date
  }]
}

// Enhanced communities collection
{
  _id: ObjectId,
  name: String,
  display_name: String,
  description: String,
  category: String,
  sub_category: String,
  tags: [String],
  rules: [{
    title: String,
    description: String,
    violation_penalty: String
  }],
  moderators: [String], // Anonymous IDs
  member_count: Number,
  post_count: Number,
  is_private: Boolean,
  invite_only: Boolean,
  min_reputation_required: Number,
  settings: {
    allow_images: Boolean,
    allow_videos: Boolean,
    allow_polls: Boolean,
    allow_external_links: Boolean,
    require_flair: Boolean,
    auto_moderation_level: String,
    slow_mode_delay: Number, // Seconds between posts
    archive_posts_after: Number // Days
  },
  analytics: {
    daily_active_users: Number,
    weekly_active_users: Number,
    average_posts_per_day: Number,
    engagement_rate: Number
  },
  created_at: Date,
  updated_at: Date
}

// Enhanced posts collection with voting and moderation
{
  _id: ObjectId,
  anonymous_id: String,
  community_id: ObjectId,
  title: String,
  content: String,
  content_type: String, // 'text', 'image', 'video', 'poll', 'link'
  media_urls: [String],
  poll_data: {
    options: [{
      text: String,
      votes: Number,
      voters: [String] // Anonymous IDs
    }],
    multiple_choice: Boolean,
    expires_at: Date
  },
  link_metadata: {
    url: String,
    title: String,
    description: String,
    image_url: String
  },
  votes: {
    upvotes: Number,
    downvotes: Number,
    user_votes: Map<String, Number> // Anonymous ID -> vote (-1, 0, 1)
  },
  engagement: {
    comment_count: Number,
    view_count: Number,
    share_count: Number,
    save_count: Number
  },
  moderation: {
    reports: [{
      reporter_id: String,
      reason: String,
      timestamp: Date,
      status: String // 'pending', 'reviewed', 'dismissed'
    }],
    flags: [String], // Auto-detected issues
    moderator_actions: [{
      moderator_id: String,
      action: String,
      reason: String,
      timestamp: Date
    }]
  },
  flair: {
    batch_range: String,
    program_type: String,
    experience_level: String,
    custom: String,
    verified_badges: [String]
  },
  created_at: Date,
  updated_at: Date,
  expires_at: Date, // Optional auto-deletion
  is_deleted: Boolean,
  is_locked: Boolean, // Prevent new comments
  is_pinned: Boolean,
  is_archived: Boolean
}

// Enhanced comments with threading
{
  _id: ObjectId,
  post_id: ObjectId,
  parent_comment_id: ObjectId, // null for top-level comments
  anonymous_id: String,
  content: String,
  media_url: String,
  votes: {
    upvotes: Number,
    downvotes: Number,
    user_votes: Map<String, Number>
  },
  replies: [ObjectId], // Child comment IDs
  depth: Number, // Comment nesting level
  is_deleted: Boolean,
  is_edited: Boolean,
  edit_history: [{
    content: String,
    edited_at: Date
  }],
  moderation: {
    reports: [Object],
    flags: [String],
    moderator_actions: [Object]
  },
  created_at: Date,
  updated_at: Date
}

// Real-time chat rooms
{
  _id: ObjectId,
  community_id: ObjectId,
  name: String,
  description: String,
  room_type: String, // 'public', 'private', 'voice', 'temporary'
  participants: [String], // Anonymous IDs
  active_participants: [String], // Currently online
  message_count: Number,
  last_activity: Date,
  settings: {
    max_participants: Number,
    message_history_retention: Number, // Days
    slow_mode: Boolean,
    moderator_only: Boolean
  },
  created_at: Date,
  expires_at: Date // For temporary rooms
}

// Chat messages
{
  _id: ObjectId,
  room_id: ObjectId,
  anonymous_id: String,
  content: String,
  message_type: String, // 'text', 'image', 'file', 'system'
  media_url: String,
  reply_to: ObjectId, // Message ID being replied to
  reactions: Map<String, [String]>, // Reaction -> Array of anonymous IDs
  is_deleted: Boolean,
  is_edited: Boolean,
  created_at: Date,
  expires_at: Date
}
```

## Frontend Implementation

### React Architecture

```typescript
// Main App Component Structure
const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <NotificationProvider>
            <Routes>
              <Route path="/pro/*" element={<ProfessionalSection />} />
              <Route path="/commons/*" element={<AnonymousSection />} />
              <Route path="/auth/*" element={<AuthSection />} />
            </Routes>
          </NotificationProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

// Professional Section Component
const ProfessionalSection: React.FC = () => {
  const { user } = useAuth();
  
  if (!user?.isVerified) {
    return <VerificationRequired />;
  }

  return (
    <ProfessionalLayout>
      <Routes>
        <Route path="/feed" element={<ProfessionalFeed />} />
        <Route path="/profile/*" element={<ProfileSection />} />
        <Route path="/network" element={<NetworkSection />} />
        <Route path="/jobs" element={<JobBoard />} />
        <Route path="/messages" element={<MessagingSection />} />
      </Routes>
    </ProfessionalLayout>
  );
};

// Anonymous Section Component
const AnonymousSection: React.FC = () => {
  return (
    <AnonymousLayout>
      <Routes>
        <Route path="/communities" element={<CommunityList />} />
        <Route path="/c/:communityId/*" element={<CommunityDetail />} />
        <Route path="/chat" element={<AnonymousChatRooms />} />
        <Route path="/popular" element={<PopularPosts />} />
      </Routes>
    </AnonymousLayout>
  );
};
```

### State Management

```typescript
// Redux Toolkit Store Configuration
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    professional: professionalSlice.reducer,
    anonymous: anonymousSlice.reducer,
    ui: uiSlice.reducer,
    realtime: realtimeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      rtkQueryApi.middleware,
      realtimeMiddleware,
      analyticsMiddleware
    ),
});

// Professional Section Slice
const professionalSlice = createSlice({
  name: 'professional',
  initialState: {
    profile: null,
    feed: [],
    connections: [],
    messages: [],
    jobPostings: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    addPost: (state, action) => {
      state.feed.unshift(action.payload);
    },
    updatePost: (state, action) => {
      const index = state.feed.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.feed[index] = action.payload;
      }
    },
  },
});

// Anonymous Section Slice
const anonymousSlice = createSlice({
  name: 'anonymous',
  initialState: {
    communities: [],
    activeCommunity: null,
    posts: [],
    chatRooms: [],
    anonymousProfile: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    joinCommunity: (state, action) => {
      state.communities.push(action.payload);
    },
    leaveCommunity: (state, action) => {
      state.communities = state.communities.filter(
        c => c.id !== action.payload
      );
    },
    voteOnPost: (state, action) => {
      const { postId, voteType, previousVote } = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        // Update vote counts based on previous and new vote
        if (previousVote === 1) post.upvotes--;
        if (previousVote === -1) post.downvotes--;
        if (voteType === 1) post.upvotes++;
        if (voteType === -1) post.downvotes++;
      }
    },
  },
});
```

### Custom Hooks

```typescript
// Authentication Hook
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      dispatch(setLoading(true));
      const response = await authApi.login(credentials);
      dispatch(setUser(response.user));
      dispatch(setTokens(response.tokens));
      localStorage.setItem('refreshToken', response.tokens.refresh);
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      dispatch(clearAuth());
      localStorage.removeItem('refreshToken');
    }
  }, [dispatch]);

  const switchToAnonymous = useCallback(async () => {
    const anonymousToken = await authApi.generateAnonymousToken();
    dispatch(setAnonymousToken(anonymousToken));
  }, [dispatch]);

  return {
    ...auth,
    login,
    logout,
    switchToAnonymous,
  };
};

// Real-time Updates Hook
export const useRealTimeUpdates = (roomId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const newSocket = io('/chat', {
      auth: {
        token: localStorage.getItem('token'),
        roomId,
      },
    });

    newSocket.on('message', (message) => {
      dispatch(addMessage(message));
    });

    newSocket.on('userJoined', (user) => {
      dispatch(addActiveUser(user));
    });

    newSocket.on('userLeft', (userId) => {
      dispatch(removeActiveUser(userId));
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [roomId, dispatch]);

  const sendMessage = useCallback((content: string) => {
    if (socket) {
      socket.emit('sendMessage', { content, roomId });
    }
  }, [socket, roomId]);

  return { sendMessage };
};

// Infinite Scroll Hook
export const useInfiniteScroll = (fetchMore: () => void) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
      setIsFetching(true);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching]);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreData();
  }, [isFetching]);

  const fetchMoreData = async () => {
    await fetchMore();
    setIsFetching(false);
  };

  return [isFetching, setIsFetching];
};
```

## Testing Strategy

### Unit Testing with Jest

```typescript
// Auth Service Tests
describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should successfully login with valid credentials', async () => {
      const mockResponse = {
        user: { id: '1', email: 'test@iitb.ac.in' },
        tokens: { access: 'access-token', refresh: 'refresh-token' }
      };
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await authService.login({
        email: 'test@iitb.ac.in',
        password: 'password'
      });

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@iitb.ac.in',
          password: 'password'
        })
      });
    });

    it('should throw error for invalid credentials', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ message: 'Invalid credentials' })
      });

      await expect(authService.login({
        email: 'test@iitb.ac.in',
        password: 'wrong-password'
      })).rejects.toThrow('Invalid credentials');
    });
  });

  describe('generateAnonymousToken', () => {
    it('should generate valid anonymous token', async () => {
      const mockToken = 'anonymous-token';
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ token: mockToken })
      });

      const token = await authService.generateAnonymousToken();
      
      expect(token).toBe(mockToken);
      expect(fetch).toHaveBeenCalledWith('/api/auth/anonymous', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    });
  });
});

// Component Tests
describe('ProfessionalFeed', () => {
  const mockPosts = [
    {
      id: '1',
      author: { name: 'John Doe', institution: 'IIT Bombay' },
      content: 'Test post content',
      createdAt: '2024-01-01T00:00:00Z'
    }
  ];

  it('should render posts correctly', () => {
    render(
      <Provider store={store}>
        <ProfessionalFeed />
      </Provider>
    );

    expect(screen.getByText('Test post content')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('IIT Bombay')).toBeInTheDocument();
  });

  it('should handle post creation', async () => {
    const user = userEvent.setup();
    
    render(
      <Provider store={store}>
        <ProfessionalFeed />
      </Provider>
    );

    const textarea = screen.getByPlaceholderText('What\'s on your mind?');
    const submitButton = screen.getByRole('button', { name: 'Post' });

    await user.type(textarea, 'New test post');
    await user.click(submitButton);

    expect(mockCreatePost).toHaveBeenCalledWith({
      content: 'New test post',
      type: 'text'
    });
  });
});
```

### Integration Testing

```typescript
// API Integration Tests
describe('API Integration', () => {
  let server: SetupServerApi;

  beforeAll(() => {
    server = setupServer(
      rest.post('/api/auth/login', (req, res, ctx) => {
        return res(ctx.json({
          user: { id: '1', email: 'test@iitb.ac.in' },
          tokens: { access: 'token', refresh: 'refresh' }
        }));
      }),
      
      rest.get('/api/v1/posts', (req, res, ctx) => {
        return res(ctx.json({
          posts: mockPosts,
          hasMore: false
        }));
      })
    );
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should fetch and display posts after login', async () => {
    render(<App />);

    // Login
    await userEvent.type(screen.getByLabelText('Email'), 'test@iitb.ac.in');
    await userEvent.type(screen.getByLabelText('Password'), 'password');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));

    // Wait for posts to load
    await waitFor(() => {
      expect(screen.getByText('Test post content')).toBeInTheDocument();
    });
  });
});
```

### E2E Testing with Cypress

```typescript
// cypress/e2e/professional-flow.cy.ts
describe('Professional Section User Flow', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('test@iitb.ac.in', 'password');
  });

  it('should allow user to create and view posts', () => {
    cy.visit('/pro/feed');
    
    // Create a post
    cy.get('[data-testid="create-post-textarea"]').type('My first post on Allyti!');
    cy.get('[data-testid="post-submit-button"]').click();
    
    // Verify post appears in feed
    cy.contains('My first post on Allyti!').should('be.visible');
    cy.get('[data-testid="post-author"]').should('contain', 'Test User');
  });

  it('should allow user to connect with other users', () => {
    cy.visit('/pro/network');
    
    // Search for users
    cy.get('[data-testid="user-search"]').type('John Doe');
    cy.get('[data-testid="search-button"]').click();
    
    // Send connection request
    cy.get('[data-testid="connect-button"]').first().click();
    cy.contains('Connection request sent').should('be.visible');
  });

  it('should switch between professional and anonymous sections', () => {
    cy.visit('/pro/feed');
    cy.get('[data-testid="section-switcher"]').click();
    cy.get('[data-testid="switch-to-anonymous"]').click();
    
    cy.url().should('include', '/commons');
    cy.contains('Anonymous Communities').should('be.visible');
  });
});

// cypress/e2e/anonymous-flow.cy.ts
describe('Anonymous Section User Flow', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('test@iitb.ac.in', 'password');
    cy.switchToAnonymous();
  });

  it('should allow anonymous posting and voting', () => {
    cy.visit('/commons/c/general');
    
    // Create anonymous post
    cy.get('[data-testid="create-anonymous-post"]').click();
    cy.get('[data-testid="post-title"]').type('Anonymous question about placements');
    cy.get('[data-testid="post-content"]').type('What should I expect in technical interviews?');
    cy.get('[data-testid="submit-post"]').click();
    
    // Verify post appears
    cy.contains('Anonymous question about placements').should('be.visible');
    
    // Test voting
    cy.get('[data-testid="upvote-button"]').first().click();
    cy.get('[data-testid="vote-count"]').should('contain', '1');
  });

  it('should maintain anonymity across interactions', () => {
    cy.visit('/commons/c/general');
    
    // Check that no professional info is leaked
    cy.get('body').should('not.contain', 'Test User');
    cy.get('body').should('not.contain', 'test@iitb.ac.in');
    
    // Verify anonymous flair is shown
    cy.get('[data-testid="user-flair"]').should('contain', '2020-2024');
  });
});
```

## Deployment and DevOps

### Docker Configuration

```dockerfile
# Frontend Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### Docker Compose for Development

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: allyti_dev
      POSTGRES_USER: allyti
      POSTGRES_PASSWORD: development_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"

  mongodb:
    image: mongo:6
    environment:
      MONGO_INITDB_ROOT_USERNAME: allyti
      MONGO_INITDB_ROOT_PASSWORD: development_password
      MONGO_INITDB_DATABASE: allyti_anonymous
    volumes:
      - mongodb_data:/data/db
    ports:
      - "27017:27017"

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.5.0
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
      - xpack.security.enabled=false
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data
    ports:
      - "9200:9200"

  api:
    build: 
      context: ./apps/api
      dockerfile: Dockerfile.dev
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://allyti:development_password@postgres:5432/allyti_dev
      - MONGODB_URL=mongodb://allyti:development_password@mongodb:27017/allyti_anonymous
      - REDIS_URL=redis://redis:6379
      - ELASTICSEARCH_URL=http://elasticsearch:9200
    volumes:
      - ./apps/api:/app
      - /app/node_modules
    ports:
      - "3001:3001"
    depends_on:
      - postgres
      - mongodb
      - redis
      - elasticsearch

  web:
    build:
      context: ./apps/web
      dockerfile: Dockerfile.dev
    environment:
      - REACT_APP_API_URL=http://localhost:3001
    volumes:
      - ./apps/web:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    depends_on:
      - api

volumes:
  postgres_data:
  mongodb_data:
  redis_data:
  elasticsearch_data:
```

### Kubernetes Deployment

```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: allyti

---
# k8s/api-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: allyti-api
  namespace: allyti
spec:
  replicas: 3
  selector:
    matchLabels:
      app: allyti-api
  template:
    metadata:
      labels:
        app: allyti-api
    spec:
      containers:
      - name: api
        image: allyti/api:latest
        ports:
        - containerPort: 3001
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: allyti-secrets
              key: database-url
        - name: MONGODB_URL
          valueFrom:
            secretKeyRef:
              name: allyti-secrets
              key: mongodb-url
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: allyti-secrets
              key: redis-url
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: allyti-secrets
              key: jwt-secret
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3001
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3001
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: allyti-api-service
  namespace: allyti
spec:
  selector:
    app: allyti-api
  ports:
  - port: 80
    targetPort: 3001
  type: ClusterIP

---
# k8s/web-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: allyti-web
  namespace: allyti
spec:
  replicas: 2
  selector:
    matchLabels:
      app: allyti-web
  template:
    metadata:
      labels:
        app: allyti-web
    spec:
      containers:
      - name: web
        image: allyti/web:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "100m"
          limits:
            memory: "128Mi"
            cpu: "200m"

---
apiVersion: v1
kind: Service
metadata:
  name: allyti-web-service
  namespace: allyti
spec:
  selector:
    app: allyti-web
  ports:
  - port: 80
    targetPort: 80
  type: ClusterIP

---
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: allyti-ingress
  namespace: allyti
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - allyti.com
    - api.allyti.com
    secretName: allyti-tls
  rules:
  - host: allyti.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: allyti-web-service
            port:
              number: 80
  - host: api.allyti.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: allyti-api-service
            port:
              number: 80
```

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

      mongodb:
        image: mongo:6
        ports:
          - 27017:27017

      redis:
        image: redis:7
        ports:
          - 6379:6379

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run linting
      run: npm run lint

    - name: Run type checking
      run: npm run type-check

    - name: Run unit tests
      run: npm run test:unit
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
        MONGODB_URL: mongodb://localhost:27017/test_db
        REDIS_URL: redis://localhost:6379

    - name: Run integration tests
      run: npm run test:integration
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
        MONGODB_URL: mongodb://localhost:27017/test_db
        REDIS_URL: redis://localhost:6379

    - name: Run E2E tests
      run: npm run test:e2e

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    strategy:
      matrix:
        app: [api, web]

    steps:
    - uses: actions/checkout@v3

    - name: Log in to Container Registry
      uses: docker/login-action@v2
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}

    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v4
      with:
        images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}-${{ matrix.app }}
        tags: |
          type=ref,event=branch
          type=ref,event=pr
          type=sha,prefix={{branch}}-

    - name: Build and push Docker image
      uses: docker/build-push-action@v3
      with:
        context: ./apps/${{ matrix.app }}
        push: true
        tags: ${{ steps.meta.outputs.tags }}
        labels: ${{ steps.meta.outputs.labels }}

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
    - uses: actions/checkout@v3

    - name: Setup kubectl
      uses: azure/setup-kubectl@v3
      with:
        version: 'v1.26.0'

    - name: Deploy to Kubernetes
      run: |
        echo "${{ secrets.KUBE_CONFIG }}" | base64 -d > kubeconfig
        export KUBECONFIG=kubeconfig
        
        # Update image tags in deployment files
        sed -i "s|image: allyti/api:latest|image: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}-api:${{ github.sha }}|g" k8s/api-deployment.yaml
        sed -i "s|image: allyti/web:latest|image: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}-web:${{ github.sha }}|g" k8s/web-deployment.yaml
        
        # Apply Kubernetes manifests
        kubectl apply -f k8s/
        
        # Wait for rollout to complete
        kubectl rollout status deployment/allyti-api -n allyti
        kubectl rollout status deployment/allyti-web -n allyti

  notify:
    needs: [test, build-and-push, deploy]
    runs-on: ubuntu-latest
    if: always()

    steps:
    - name: Notify Slack
      uses: 8398a7/action-slack@v3
      with:
        status: ${{ job.status }}
        channel: '#deployments'
        webhook_url: ${{ secrets.SLACK_WEBHOOK }}
      if: always()
```

This technical implementation guide provides a comprehensive foundation for building the Allyti platform. The architecture is designed to be scalable, maintainable, and secure, with clear separation between professional and anonymous sections while maintaining high performance and user experience standards.
