import { Router } from 'express';
import { validator } from '../middleware/validator';
import {
	regionalController,
	RegionalController,
} from '../controllers/regional.controller';
import {
	createRegionalSchema,
	deleteRegionalSchema,
	getRegionalSchema,
	getRegionalsSchema,
	updateRegionalSchema,
} from '../schemas/regional.schema';

export class RegionalRoutes {
	private readonly controller: RegionalController;
	private readonly router: Router;

	constructor() {
		this.controller = regionalController;
		this.router = Router();
	}

	public getRoutes(): Router {
		this.router.post(
			'/',
			validator(createRegionalSchema),
			this.controller.create.bind(this.controller),
		);
		this.router.get(
			'/',
			validator(getRegionalsSchema),
			this.controller.findAll.bind(this.controller),
		);
		this.router.get(
			'/:id',
			validator(getRegionalSchema),
			this.controller.findById.bind(this.controller),
		);
		this.router.put(
			'/:id',
			validator(updateRegionalSchema),
			this.controller.update.bind(this.controller),
		);
		this.router.delete(
			'/:id',
			validator(deleteRegionalSchema),
			this.controller.delete.bind(this.controller),
		);

		this.router.delete(
			'/',
			this.controller.deleteAll.bind(this.controller),
		);

		return this.router;
	}
}

export const regionalRoutes = new RegionalRoutes();