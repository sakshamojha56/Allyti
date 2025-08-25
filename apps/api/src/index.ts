import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';

import { connectDatabase } from '@/config/database';
import { logger } from '@/utils/logger';
import { errorHandler } from '@/middleware/errorHandler';
import { authMiddleware } from '@/middleware/auth';

// Route imports
import authRoutes from '@/routes/auth';
import userRoutes from '@/routes/users';
import postRoutes from '@/routes/posts';
import communityRoutes from '@/routes/communities';
import messageRoutes from '@/routes/messages';
import jobRoutes from '@/routes/jobs';
import searchRoutes from '@/routes/search';

// GraphQL setup
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from '@/graphql/schema';
import { resolvers } from '@/graphql/resolvers';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 5000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(limiter);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/posts', authMiddleware, postRoutes);
app.use('/api/communities', authMiddleware, communityRoutes);
app.use('/api/messages', authMiddleware, messageRoutes);
app.use('/api/jobs', authMiddleware, jobRoutes);
app.use('/api/search', authMiddleware, searchRoutes);

// GraphQL setup
async function startApolloServer() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      return {
        user: req.user,
        req,
      };
    },
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });
  
  logger.info(`GraphQL endpoint ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
}

// Socket.IO setup
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);

  socket.on('join-room', (roomId: string) => {
    socket.join(roomId);
    logger.info(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on('leave-room', (roomId: string) => {
    socket.leave(roomId);
    logger.info(`User ${socket.id} left room ${roomId}`);
  });

  socket.on('send-message', (data) => {
    socket.to(data.roomId).emit('receive-message', data);
  });

  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The route ${req.originalUrl} does not exist`,
  });
});

// Start server
async function startServer() {
  try {
    // Connect to databases
    await connectDatabase();
    
    // Start Apollo Server
    await startApolloServer();
    
    // Start HTTP server
    server.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`📊 GraphQL Playground available at http://localhost:${PORT}/graphql`);
      logger.info(`🔌 Socket.IO server ready`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

startServer().catch((error) => {
  logger.error('Server startup error:', error);
  process.exit(1);
});

export default app;
