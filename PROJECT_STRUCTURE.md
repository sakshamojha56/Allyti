# Allyti Project Structure

```
allyti/
├── README.md
├── PRODUCT_REQUIREMENTS.md
├── TECHNICAL_GUIDE.md
├── package.json
├── package-lock.json
├── tsconfig.json
├── .gitignore
├── .env.example
├── docker-compose.yml
├── docker-compose.prod.yml
│
├── apps/
│   ├── web/                          # React web application
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── common/           # Shared components
│   │   │   │   ├── professional/    # Professional section components
│   │   │   │   └── anonymous/       # Anonymous section components
│   │   │   ├── pages/
│   │   │   │   ├── auth/
│   │   │   │   ├── professional/
│   │   │   │   └── anonymous/
│   │   │   ├── hooks/               # Custom React hooks
│   │   │   ├── store/               # Redux store and slices
│   │   │   ├── services/            # API services
│   │   │   ├── utils/               # Utility functions
│   │   │   ├── types/               # TypeScript type definitions
│   │   │   └── styles/              # Global styles and themes
│   │   ├── package.json
│   │   ├── Dockerfile
│   │   └── vite.config.ts
│   │
│   ├── mobile/                       # React Native mobile app
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── screens/
│   │   │   ├── navigation/
│   │   │   ├── services/
│   │   │   └── utils/
│   │   ├── android/
│   │   ├── ios/
│   │   ├── package.json
│   │   └── app.json
│   │
│   ├── api/                          # Main API server
│   │   ├── src/
│   │   │   ├── controllers/         # Route controllers
│   │   │   ├── middleware/          # Express middleware
│   │   │   ├── models/              # Database models
│   │   │   ├── routes/              # API routes
│   │   │   ├── services/            # Business logic services
│   │   │   ├── utils/               # Utility functions
│   │   │   ├── validators/          # Input validation schemas
│   │   │   └── types/               # TypeScript types
│   │   ├── package.json
│   │   ├── Dockerfile
│   │   └── tsconfig.json
│   │
│   └── admin/                        # Admin dashboard
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   └── services/
│       ├── package.json
│       └── vite.config.ts
│
├── packages/                         # Shared packages
│   ├── shared/                      # Shared utilities and types
│   │   ├── src/
│   │   │   ├── types/               # Common TypeScript types
│   │   │   ├── utils/               # Shared utility functions
│   │   │   ├── constants/           # Application constants
│   │   │   └── validators/          # Shared validation schemas
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── database/                    # Database schemas and migrations
│   │   ├── migrations/
│   │   │   ├── postgresql/          # SQL migrations
│   │   │   └── mongodb/             # MongoDB migrations
│   │   ├── seeds/                   # Database seed data
│   │   ├── schemas/                 # Database schemas
│   │   ├── package.json
│   │   └── knexfile.js
│   │
│   └── auth/                        # Authentication library
│       ├── src/
│       │   ├── strategies/          # Auth strategies (JWT, OAuth)
│       │   ├── middleware/          # Auth middleware
│       │   ├── utils/               # Auth utilities
│       │   └── types/               # Auth types
│       ├── package.json
│       └── tsconfig.json
│
├── services/                         # Microservices
│   ├── user-service/                # User management service
│   │   ├── src/
│   │   ├── package.json
│   │   ├── Dockerfile
│   │   └── tsconfig.json
│   │
│   ├── content-service/             # Content management service
│   │   ├── src/
│   │   ├── package.json
│   │   ├── Dockerfile
│   │   └── tsconfig.json
│   │
│   ├── notification-service/        # Notification service
│   │   ├── src/
│   │   ├── package.json
│   │   ├── Dockerfile
│   │   └── tsconfig.json
│   │
│   ├── moderation-service/          # AI moderation service
│   │   ├── src/
│   │   ├── models/                  # ML models
│   │   ├── package.json
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   │
│   └── analytics-service/           # Analytics service
│       ├── src/
│       ├── package.json
│       ├── Dockerfile
│       └── tsconfig.json
│
├── infrastructure/                   # Infrastructure as code
│   ├── terraform/                   # Terraform configurations
│   │   ├── modules/
│   │   ├── environments/
│   │   │   ├── development/
│   │   │   ├── staging/
│   │   │   └── production/
│   │   └── main.tf
│   │
│   ├── kubernetes/                  # Kubernetes manifests
│   │   ├── base/
│   │   ├── overlays/
│   │   │   ├── development/
│   │   │   ├── staging/
│   │   │   └── production/
│   │   └── kustomization.yaml
│   │
│   └── monitoring/                  # Monitoring configurations
│       ├── prometheus/
│       ├── grafana/
│       └── alertmanager/
│
├── tests/                           # Test files
│   ├── unit/                       # Unit tests
│   ├── integration/                # Integration tests
│   ├── e2e/                        # End-to-end tests
│   └── performance/                # Performance tests
│
├── docs/                           # Documentation
│   ├── api/                        # API documentation
│   ├── deployment/                 # Deployment guides
│   ├── architecture/               # Architecture diagrams
│   └── user-guides/                # User documentation
│
├── scripts/                        # Build and deployment scripts
│   ├── build.sh
│   ├── deploy.sh
│   ├── setup-dev.sh
│   └── seed-data.sh
│
└── .github/                        # GitHub workflows
    ├── workflows/
    │   ├── ci.yml
    │   ├── cd.yml
    │   └── security.yml
    └── ISSUE_TEMPLATE/
```

## Key Directories Explained

### `/apps/`
Contains the main applications that users interact with:
- **web**: React-based web application with professional and anonymous sections
- **mobile**: React Native mobile app for iOS and Android
- **api**: Main API server handling all business logic
- **admin**: Administrative dashboard for platform management

### `/packages/`
Shared code packages used across multiple applications:
- **shared**: Common utilities, types, and constants
- **database**: Database schemas, migrations, and ORM configurations
- **auth**: Authentication and authorization utilities

### `/services/`
Microservices for specific business domains:
- **user-service**: User profile and identity management
- **content-service**: Posts, comments, and media handling
- **notification-service**: Real-time notifications and messaging
- **moderation-service**: AI-powered content moderation
- **analytics-service**: User behavior and platform analytics

### `/infrastructure/`
Infrastructure as Code (IaC) and deployment configurations:
- **terraform**: Cloud infrastructure provisioning
- **kubernetes**: Container orchestration manifests
- **monitoring**: Observability and alerting setup

### `/tests/`
Comprehensive testing suite:
- **unit**: Individual component and function tests
- **integration**: Service integration tests
- **e2e**: Full user journey tests
- **performance**: Load and stress testing

## Technology Stack by Directory

### Frontend (`/apps/web`, `/apps/mobile`)
- **Frameworks**: React 18, React Native, TypeScript
- **State Management**: Redux Toolkit, RTK Query
- **Styling**: Tailwind CSS, React Native Elements
- **Build Tools**: Vite, Metro (React Native)
- **Testing**: Jest, React Testing Library, Detox (mobile)

### Backend (`/apps/api`, `/services/`)
- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Express.js with middleware
- **Databases**: PostgreSQL, MongoDB, Redis
- **Search**: Elasticsearch
- **Authentication**: JWT, OAuth 2.0, Passport.js
- **Testing**: Jest, Supertest

### Infrastructure (`/infrastructure/`)
- **Cloud**: AWS / Google Cloud Platform
- **Containers**: Docker, Kubernetes
- **IaC**: Terraform
- **Monitoring**: Prometheus, Grafana, ELK Stack
- **CI/CD**: GitHub Actions

### Development Tools
- **Package Management**: npm workspaces
- **Code Quality**: ESLint, Prettier, Husky
- **Documentation**: OpenAPI/Swagger, Storybook
- **Version Control**: Git with conventional commits

## Development Workflow

### 1. Local Development Setup
```bash
# Clone repository
git clone https://github.com/your-org/allyti.git
cd allyti

# Install dependencies for all packages
npm install

# Set up development environment
npm run setup:dev

# Start development servers
npm run dev
```

### 2. Package Scripts
- `npm run dev` - Start all development servers
- `npm run build` - Build all applications for production
- `npm run test` - Run all tests
- `npm run lint` - Run linting across all packages
- `npm run type-check` - TypeScript type checking
- `npm run deploy` - Deploy to staging/production

### 3. Git Workflow
- **Feature Branches**: `feature/professional-feed-pagination`
- **Bug Fixes**: `fix/anonymous-identity-leak`
- **Releases**: `release/v1.2.0`
- **Conventional Commits**: `feat: add anonymous post voting system`

### 4. Testing Strategy
- **Unit Tests**: Individual component/function testing
- **Integration Tests**: Service-to-service communication
- **E2E Tests**: Full user journey testing
- **Performance Tests**: Load testing and optimization

### 5. Deployment Pipeline
1. **Code Push** → GitHub repository
2. **CI Pipeline** → Automated testing and validation
3. **Build Process** → Docker image creation
4. **Deployment** → Kubernetes cluster deployment
5. **Monitoring** → Health checks and alerting

## Security Considerations by Directory

### `/apps/web` & `/apps/mobile`
- Client-side input validation and sanitization
- Secure token storage and management
- Content Security Policy (CSP) implementation
- Protection against XSS and CSRF attacks

### `/apps/api` & `/services/`
- Rate limiting and DDoS protection
- Input validation and SQL injection prevention
- Secure authentication and authorization
- Data encryption at rest and in transit

### `/packages/database`
- Database access controls and user permissions
- Encrypted sensitive data fields
- Audit logging for data access
- Regular security updates and patches

### `/infrastructure/`
- Network security and firewall rules
- Secret management (Kubernetes secrets, AWS Parameter Store)
- Infrastructure monitoring and alerting
- Regular security scans and vulnerability assessments

This project structure provides a solid foundation for building a scalable, maintainable, and secure platform that can grow with the user base and feature requirements.
