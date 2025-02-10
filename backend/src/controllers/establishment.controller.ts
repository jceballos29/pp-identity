import { NextFunction, Request, Response } from 'express';
import {
  CreateEstablishmentSchema,
  DeleteEstablishmentSchema,
  GetEstablishmentSchema,
  GetEstablishmentsSchema,
  UpdateEstablishmentSchema,
} from '../schemas/establishment.schema';
import {
  establishmentService,
  EstablishmentService,
} from '../services/establishment.service';
import { HttpStatusCode } from '../types';
import { ResponseFormatter } from '../utils/response-formatter';

export class EstablishmentController {
	private readonly service: EstablishmentService;

	constructor() {
		this.service = establishmentService;
	}

	public async create(
		req: Request<{}, {}, CreateEstablishmentSchema['body']>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const data = req.body;
			const establishment = await this.service.create(data);
			ResponseFormatter.success(
				res,
				'Establishment created',
				establishment,
				HttpStatusCode.CREATED,
			);
		} catch (error: any) {
			next(error);
		}
	}

	public async findAll(
		req: Request<{}, {}, {}, GetEstablishmentsSchema['query']>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const query = req.query;
			const establishments = await this.service.findAll(query);
			ResponseFormatter.success(
				res,
				'Establishments found',
				establishments,
			);
		} catch (error: any) {
			next(error);
		}
	}

	public async findById(
		req: Request<GetEstablishmentSchema['params']>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { id } = req.params;
			const establishment = await this.service.findById(id);
			ResponseFormatter.success(
				res,
				'Establishment found',
				establishment,
			);
		} catch (error: any) {
			next(error);
		}
	}

	public async update(
		req: Request<
			UpdateEstablishmentSchema['params'],
			{},
			UpdateEstablishmentSchema['body']
		>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { id } = req.params;
			const data = req.body;
			const establishment = await this.service.update(id, data);
			ResponseFormatter.success(
				res,
				'Establishment updated',
				establishment,
			);
		} catch (error: any) {
			next(error);
		}
	}

	public async delete(
		req: Request<DeleteEstablishmentSchema['params']>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { id } = req.params;
			await this.service.delete(id);
			ResponseFormatter.success(res, 'Establishment deleted');
		} catch (error: any) {
			next(error);
		}
	}
}

export const establishmentController = new EstablishmentController();
