import {
	CreateRegionalDTO,
	GetRegionalsQueryDTO,
	Regional,
	UpdateRegionalDTO,
} from '../entities/regional.entity';
import {
	RegionalRepository,
	regionalRepository,
} from '../repositories/regional.repository';
import { HttpStatusCode } from '../types';
import { CustomError } from '../utils/custom-error';

export class RegionalService {
	private readonly repository: RegionalRepository;

	constructor() {
		this.repository = regionalRepository;
	}

	public async create(data: CreateRegionalDTO): Promise<Regional> {
		return this.repository.create(data);
	}

	public async findAll(query: GetRegionalsQueryDTO): Promise<{
		items: Regional[];
		total: number;
	}> {
		return this.repository.findAll(query);
	}

	public async findById(id: string): Promise<Regional> {
		const regional = await this.repository.findById(id);
		if (!regional) {
			throw new CustomError(
				'Regional not found',
				HttpStatusCode.NOT_FOUND,
			);
		}
		return regional;
	}

	public async update(
		id: string,
		data: UpdateRegionalDTO,
	): Promise<Regional> {
		const regional = await this.repository.findById(id);
		if (!regional) {
			throw new CustomError(
				'Regional not found',
				HttpStatusCode.NOT_FOUND,
			);
		}
		return this.repository.update(id, data);
	}

	public async delete(id: string): Promise<void> {
		const regional = await this.repository.findById(id);
		if (!regional) {
			throw new CustomError(
				'Regional not found',
				HttpStatusCode.NOT_FOUND,
			);
		}
		return this.repository.delete(id);
	}

	public async deleteAll(): Promise<void> {
		return this.repository.deleteAll();
	}
}

export const regionalService = new RegionalService();
