import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import { errorHandler } from './middleware/error-handler';
import { httpLoggerMiddleware } from './middleware/http-logger';
import { routes } from './routes';

class App {
	public app: Application;

	constructor() {
		this.app = express();
		this.plugins();
		this.routes();
	}

	protected plugins(): void {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(helmet());
		this.app.use(
			cors({
				origin: '*',
				methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
				credentials: true,
			}),
		);
	}

	protected routes(): void {
		this.app.use(httpLoggerMiddleware);
		this.app.use('/api', routes.getRoutes());
		this.app.use(errorHandler);
	}

}

export default App;
