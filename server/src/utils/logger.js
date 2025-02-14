import winston from 'winston';

// Create a logger instance
const logger = winston.createLogger({
  level: 'info', // Set log level (error, warn, info, debug)
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(), 
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), 
    new winston.transports.File({ filename: 'logs/combined.log' }) 
  ]
});

// Usage Example
// logger.info('Server started on port 3000');
// logger.warn('This is a warning message');
// logger.error('This is an error message');

export default logger;
