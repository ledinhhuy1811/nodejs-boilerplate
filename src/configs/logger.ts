import { format, createLogger, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp, meta }) => {
  return `${timestamp} [${level}] ${message} ${
    meta ? JSON.stringify(meta) : ""
  }`;
});

const fileTransport = new DailyRotateFile({
  filename: "logs/application-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

const consoleTransport = new transports.Console({
  format: combine(timestamp(), format.colorize(), logFormat),
});

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), format.colorize(), logFormat),
  transports: [fileTransport, consoleTransport],
});

export default logger;
