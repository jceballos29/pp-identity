import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

export const httpLoggerMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const start = Date.now();

	res.on('finish', () => {
		const ms = Date.now() - start;
		const message = `${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms`;

		if (res.statusCode >= 500) {
			logger.error(message);
		} else if (res.statusCode >= 400) {
			logger.warn(message);
		} else {
			logger.info(message);
		}
	});

	next();
};
