import { Pool } from 'pg';
import mongoose from 'mongoose';
import redis from 'redis';
import { logger } from '@/utils/logger';

// PostgreSQL connection
export const pgPool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT || '5432'),
  database: process.env.PG_DATABASE || 'allyti_professional',
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'password',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// MongoDB connection
export const connectMongoDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/allyti_anonymous';
    await mongoose.connect(mongoUri);
    logger.info('✅ Connected to MongoDB (Anonymous section)');
  } catch (error) {
    logger.error('❌ MongoDB connection failed:', error);
    throw error;
  }
};

// Redis connection
export const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    logger.info('✅ Connected to Redis');
  } catch (error) {
    logger.error('❌ Redis connection failed:', error);
    throw error;
  }
};

// Test PostgreSQL connection
export const connectPostgreSQL = async () => {
  try {
    const client = await pgPool.connect();
    await client.query('SELECT NOW()');
    client.release();
    logger.info('✅ Connected to PostgreSQL (Professional section)');
  } catch (error) {
    logger.error('❌ PostgreSQL connection failed:', error);
    throw error;
  }
};

// Connect all databases
export const connectDatabase = async () => {
  await Promise.all([
    connectPostgreSQL(),
    connectMongoDB(),
    connectRedis(),
  ]);
};

// Graceful shutdown
export const closeConnections = async () => {
  try {
    await pgPool.end();
    await mongoose.connection.close();
    await redisClient.quit();
    logger.info('All database connections closed');
  } catch (error) {
    logger.error('Error closing database connections:', error);
  }
};
