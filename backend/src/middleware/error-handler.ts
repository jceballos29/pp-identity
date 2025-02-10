import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '../types';
import { CustomError } from '../utils/custom-error';
import logger from '../utils/logger';
import { ResponseFormatter } from '../utils/response-formatter';

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (err instanceof CustomError) {
		logger.error(`CustomError: ${err.message} - ${err.stack}`);
		const errorMessages = {
			message: err.message,
			details: err.errors,
		};
		return ResponseFormatter.error(
			res,
			errorMessages,
			err.statusCode,
		);
	}

	logger.error(`Error: ${err.message} - ${err.stack}`);
	const errorMessages = {
		message: err.message,
		details: err.stack,
	};
	return ResponseFormatter.error(
		res,
		errorMessages,
		HttpStatusCode.INTERNAL_SERVER_ERROR,
	);
};
