import winston, { format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import environment from '../config/environment';
import path from 'path';
import fs from 'fs';

const { combine, timestamp, printf, colorize, errors } = format;

class Logger {
  private logger: winston.Logger;
  private logDirectory: string;

  constructor() {
    this.logDirectory = path.join(__dirname, '../logs');
    this.createLogDirectory();
    this.logger = this.createLogger();
  }

  private createLogDirectory(): void {
    if (!fs.existsSync(this.logDirectory)) {
      fs.mkdirSync(this.logDirectory, { recursive: true });
    }
  }

  private createLogger(): winston.Logger {
    const consoleFormat = combine(
      colorize(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      printf(({ timestamp, level, message, stack }) =>
        `${timestamp} ${level}: ${message} ${stack ? `\n${stack}` : ''}`
      )
    );

    const fileFormat = combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      printf(({ timestamp, level, message, stack }) =>
        `${timestamp} ${level}: ${message} ${stack ? `\n${stack}` : ''}`
      )
    );

    const transportOptions = [];

    if (environment.get('NODE_ENV') !== 'production') {
      transportOptions.push(new winston.transports.Console({ format: consoleFormat }));
    } else {
      transportOptions.push(
        new DailyRotateFile({
          filename: path.join(this.logDirectory, 'application-%DATE%.log'),
          dirname: this.logDirectory,
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: fileFormat,
        })
      );
    }

    return winston.createLogger({
      level: environment.get('NODE_ENV') === 'development' ? 'debug' : 'info',
      format: fileFormat,
      transports: transportOptions,
    });
  }

  public getLogger(): winston.Logger {
    return this.logger;
  }
}

// Crear la instancia del logger (¡solo una vez!)
const loggerInstance = new Logger();
const logger = loggerInstance.getLogger();

export default logger; // Exportar la instancia, no la clase