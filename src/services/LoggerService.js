import winston from 'winston';
import appRoot from 'app-root-path';
import options from '../configs/logger.config.json';

options.file.filename = `${appRoot}${options.file.filename}`;

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(options.console),
      new winston.transports.File(options.file)
    ],
    exitOnError: options.misc.exitOnError
  });
  
  logger.stream = {
    write: (message, encoding) => {
      logger.info(message);
    },
  };
  
  export default logger;