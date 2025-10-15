const fs = require("fs");
const path = require("path");
const { createLogger, format, transports } = require("winston");

const { combine, timestamp, printf, colorize, errors } = format;

const logDir = path.resolve(__dirname, "..", "..", "logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const environment = process.env.NODE_ENV || "development";
const level =
  process.env.LOG_LEVEL || (environment === "production" ? "info" : "debug");

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
  level,
  format: combine(timestamp(), errors({ stack: true }), logFormat),
  transports: [
    new transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),
    new transports.File({
      filename: path.join(logDir, "combined.log"),
    }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: path.join(logDir, "exceptions.log") }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: path.join(logDir, "rejections.log") }),
  ],
});

// Add console output in non-production for easier debugging
if (environment !== "production") {
  logger.add(
    new transports.Console({
      format: combine(
        colorize(),
        timestamp(),
        errors({ stack: true }),
        logFormat
      ),
    })
  );
}

// Support for morgan or other stream-based libraries
logger.stream = {
  write: (message) => {
    // morgan adds a newline at the end of messages
    logger.info(message.trim());
  },
};

const log = {
  info: (msg) => logger.info(msg),
  success: (msg) => logger.info(`✅ ${msg}`),
  warn: (msg) => logger.warn(`⚠️ ${msg}`),
  error: (msg) => logger.error(`❌ ${msg}`),
  event: (msg) => logger.info(`📢 EVENT: ${msg}`),
};

module.exports = { logger, log };
