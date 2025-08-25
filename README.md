# Allyti 🎓

**The Premier Dual-Community Platform for IIT/IIM Students & Alumni**

Allyti bridges the gap between professional networking and authentic community discourse, creating a unique ecosystem where India's brightest minds can thrive both professionally and personally.

---

## 🌟 Vision

Combining the best of LinkedIn and Reddit, Allyti offers:
- **Professional Section**: Verified IIT/IIM networking with career opportunities, mentorship, and industry insights
- **Anonymous Section**: Safe space for honest discussions about mental health, career struggles, campus life, and more

## ✨ Key Features

### 🏢 Professional Section
- **Verified Profiles**: IIT/IIM email verification ensures community quality
- **Smart Networking**: Connect with batchmates, seniors, and industry professionals
- **Career Hub**: Job board, mentorship matching, and collaboration opportunities
- **Content Sharing**: Posts, articles, project showcases, and professional updates
- **Direct Messaging**: Secure communication with network connections

### 🎭 Anonymous Section
- **Zero-Knowledge Anonymity**: Cryptographically secure anonymous identities
- **Topic Communities**: Branch-specific, career-focused, and life discussion groups
- **Real-Time Chat**: Anonymous chat rooms and instant messaging
- **Voting System**: Community-driven content curation with upvotes/downvotes
- **Optional Flair**: Show batch range, program type, or experience level without revealing identity

### 🛡️ Privacy & Safety
- **Complete Separation**: No data leakage between professional and anonymous sections
- **AI Moderation**: Advanced content filtering and harassment detection
- **Community Governance**: Democratic moderation with appeals process
- **End-to-End Encryption**: Secure messaging and sensitive data protection

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git

### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/your-org/allyti.git
cd allyti

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start infrastructure services
docker-compose up -d

# Run database migrations and seed data
npm run db:migrate
npm run db:seed

# Start development servers
npm run dev
```

The application will be available at:
- **Web App**: http://localhost:3000
- **API Server**: http://localhost:3001
- **Admin Dashboard**: http://localhost:3002

### Docker Development

```bash
# Start all services with Docker
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📁 Project Structure

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
│   ├── terraform/           # Infrastructure as code
│   ├── kubernetes/          # K8s deployment configs
│   └── monitoring/          # Observability setup
└── docs/                    # Documentation
```

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Redux Toolkit
- **Backend**: Node.js, Express, TypeScript, GraphQL
- **Databases**: PostgreSQL (professional), MongoDB (anonymous), Redis (cache)
- **Search**: Elasticsearch
- **Infrastructure**: Docker, Kubernetes, AWS/GCP
- **Monitoring**: Prometheus, Grafana, ELK Stack

### Key Design Principles
- **Privacy by Design**: Anonymous section built with zero-knowledge architecture
- **Scalable Microservices**: Independent services for different business domains
- **Real-Time Features**: WebSocket-based chat and notifications
- **Mobile-First**: Progressive Web App with native mobile applications

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run specific test suites
npm run test:unit           # Unit tests
npm run test:integration    # Integration tests
npm run test:e2e           # End-to-end tests

# Run tests with coverage
npm run test:coverage
```

## 📚 Documentation

- [Product Requirements Document](./PRODUCT_REQUIREMENTS.md) - Comprehensive feature specifications
- [Technical Implementation Guide](./TECHNICAL_GUIDE.md) - Detailed technical architecture
- [Project Structure Guide](./PROJECT_STRUCTURE.md) - Codebase organization
- [API Documentation](./docs/api/) - REST and GraphQL API specs
- [Deployment Guide](./docs/deployment/) - Production deployment instructions

## 🤝 Contributing

We welcome contributions from the IIT/IIM community! Please read our [Contributing Guidelines](./CONTRIBUTING.md) before submitting pull requests.

### Development Workflow

1. **Fork the repository** and create a feature branch
2. **Make your changes** with appropriate tests
3. **Run linting and tests** to ensure code quality
4. **Submit a pull request** with a clear description

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes and commit
git add .
git commit -m "feat: add your feature description"

# Push and create pull request
git push origin feature/your-feature-name
```

### Code Quality

- **ESLint & Prettier**: Automated code formatting and linting
- **TypeScript**: Strict type checking across all packages
- **Husky**: Pre-commit hooks for code quality
- **Conventional Commits**: Standardized commit messages

## 🚀 Deployment

### Staging Deployment
```bash
# Deploy to staging environment
npm run deploy:staging
```

### Production Deployment
```bash
# Deploy to production
npm run deploy:production
```

### Infrastructure Management
```bash
# Provision infrastructure with Terraform
cd infrastructure/terraform
terraform init
terraform plan
terraform apply

# Deploy with Kubernetes
kubectl apply -f infrastructure/kubernetes/
```

## 📊 Monitoring & Observability

- **Application Metrics**: Prometheus + Grafana dashboards
- **Error Tracking**: Sentry integration for error monitoring
- **Logging**: Centralized logging with ELK Stack
- **Distributed Tracing**: Jaeger for request tracing
- **Uptime Monitoring**: Health checks and alerting

## 🔒 Security & Privacy

### Security Measures
- **HTTPS Everywhere**: TLS 1.3 encryption for all communications
- **Authentication**: JWT tokens with refresh rotation
- **Authorization**: Role-based access control (RBAC)
- **Input Validation**: Comprehensive sanitization and validation
- **Rate Limiting**: API protection against abuse

### Privacy Protection
- **Anonymous Architecture**: Zero-knowledge design for anonymous section
- **Data Minimization**: Collect only necessary information
- **Right to Deletion**: Complete data removal capabilities
- **GDPR Compliance**: European privacy regulation compliance
- **Regular Audits**: Security and privacy assessments

## 🌍 Community & Support

### Get Involved
- **Discord**: [Join our development community](https://discord.gg/allyti-dev)
- **GitHub Discussions**: [Feature requests and Q&A](https://github.com/your-org/allyti/discussions)
- **Email**: [dev@allyti.com](mailto:dev@allyti.com)

### Alumni Network
- **Ambassador Program**: Represent Allyti at your institution
- **Mentorship**: Guide new developers in open source
- **Events**: Participate in hackathons and networking events

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **IIT/IIM Communities**: For inspiration and feedback
- **Open Source Contributors**: Building the future of professional networking
- **Early Adopters**: Beta testers who help shape the platform

---

## 🚀 Ready to Get Started?

1. **Star this repository** to show your support
2. **Follow the setup instructions** to run locally
3. **Join our community** on Discord for discussions
4. **Contribute** to build the future of professional networking

### Environment Status

[![Build Status](https://github.com/your-org/allyti/workflows/CI/badge.svg)](https://github.com/your-org/allyti/actions)
[![Coverage Status](https://codecov.io/gh/your-org/allyti/branch/main/graph/badge.svg)](https://codecov.io/gh/your-org/allyti)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

---

**Built with ❤️ by the IIT/IIM community, for the IIT/IIM community**