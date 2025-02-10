import { Request, Response, NextFunction } from 'express';
import { z, AnyZodObject } from 'zod';
import { CustomError } from '../utils/custom-error';
import { HttpStatusCode } from '../types';

export const validator =
	(schema: AnyZodObject) =>
	(req: Request, _res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			});
      next();
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				const errorMessages = error.errors.map(
					(e) => `${e.path.join('.')} : ${e.message}`,
				);
				return next(
					new CustomError(
						'Error de validación de datos',
						HttpStatusCode.BAD_REQUEST,
						errorMessages,
					),
				);
			}
			next(error);
		}
	};
