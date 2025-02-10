import { Response } from 'express';
import { HttpStatusCode } from '../types';

export class ResponseFormatter {
	public static success(
		res: Response,
		message: string,
		data: any = null,
		statusCode: HttpStatusCode = HttpStatusCode.OK,
	): void {
		const responseData = data !== null ? data : {};
		res
			.status(statusCode)
			.json({ success: true, message, data: responseData });
    return;
	}

	public static error(
		res: Response,
		error: string | { message: string; details?: any },
		statusCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
	): void {
		const errorMessage =
			typeof error === 'string' ? { message: error } : error;
		res
			.status(statusCode)
			.json({ success: false, error: errorMessage });
    return;
	}
}
