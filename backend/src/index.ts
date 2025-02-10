import App from "./app";
import http, { Server } from 'http';
import environment from "./config/environment";
import logger from "./utils/logger";

export const main = async () => {
  const application = new App();
  const server: Server = http.createServer(application.app);

  server.listen(environment.get('PORT'), () => {
    logger.info(`Environment: ${environment.get('NODE_ENV')}`);	
    logger.info(`Server: http://${environment.get('HOST')}:${environment.get('PORT')}`);
  });

  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

  signals.forEach(signal => {
    process.on(signal, () => {
      server.close(() => {
        logger.info(`Server stopped by ${signal}`);
        process.exit(0);
      });
    });
  });
}

main();