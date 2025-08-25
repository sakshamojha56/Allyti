import winston from 'winston';

// Configure Winston logger
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.colorize({ all: true }),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} [${level}]: ${message}${stack ? '\n' + stack : ''}`;
    })
  ),
  defaultMeta: { service: 'allyti-api' },
  transports: [
    // Console transport
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    // File transport for errors
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error',
      format: winston.format.json()
    }),
    // File transport for all logs
    new winston.transports.File({ 
      filename: 'logs/combined.log',
      format: winston.format.json()
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' }),
    new winston.transports.Console()
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'logs/rejections.log' }),
    new winston.transports.Console()
  ]
});

// If we're not in production, log to the console with a simple format
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
