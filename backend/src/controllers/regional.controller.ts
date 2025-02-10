import { NextFunction, Request, Response } from 'express';
import {
  CreateRegionalSchema,
  DeleteRegionalSchema,
  GetRegionalSchema,
  GetRegionalsSchema,
  UpdateRegionalSchema,
} from '../schemas/regional.schema';
import {
  regionalService,
  RegionalService,
} from '../services/regional.service';
import { HttpStatusCode } from '../types';
import { ResponseFormatter } from '../utils/response-formatter';

export class RegionalController {
	private readonly service: RegionalService;

	constructor() {
		this.service = regionalService;
	}

	public async create(
		req: Request<{}, {}, CreateRegionalSchema['body']>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const data = req.body;
			const regional = await this.service.create(data);
			ResponseFormatter.success(
				res,
				'Regional created',
				regional,
				HttpStatusCode.CREATED,
			);
		} catch (error: any) {
			next(error);
		}
	}

	public async findAll(
		req: Request<{}, {}, {}, GetRegionalsSchema['query']>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const query = req.query;
			const regionals = await this.service.findAll(query);
			ResponseFormatter.success(res, 'Regionals found', regionals);
		} catch (error: any) {
			next(error);
		}
	}

	public async findById(
		req: Request<GetRegionalSchema['params']>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { id } = req.params;
			const regional = await this.service.findById(id);
			ResponseFormatter.success(res, 'Regional found', regional);
		} catch (error: any) {
			next(error);
		}
	}

	public async update(
		req: Request<
			UpdateRegionalSchema['params'],
			{},
			UpdateRegionalSchema['body']
		>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { id } = req.params;
			const data = req.body;
			const regional = await this.service.update(id, data);
			ResponseFormatter.success(res, 'Regional updated', regional);
		} catch (error: any) {
			next(error);
		}
	}

	public async delete(
		req: Request<DeleteRegionalSchema['params']>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { id } = req.params;
			await this.service.delete(id);
			ResponseFormatter.success(res, 'Regional deleted');
		} catch (error: any) {
			next(error);
		}
	}

	public async deleteAll(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			await this.service.deleteAll();
			ResponseFormatter.success(res, 'Regionals deleted');
		} catch (error: any) {
			next(error);
		}
	}
}

export const regionalController = new RegionalController();
