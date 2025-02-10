import {
  CreateEstablishmentDTO,
  Establishment,
  GetEstablishmentsQueryDTO,
  UpdateEstablishmentDTO,
} from '../entities/establishment.entity';
import {
  EstablishmentRepository,
  establishmentRepository,
} from '../repositories/establishment.repository';
import { HttpStatusCode } from '../types';
import { CustomError } from '../utils/custom-error';

export class EstablishmentService {
	private readonly repository: EstablishmentRepository;

	constructor() {
		this.repository = establishmentRepository;
	}

	public async create(
		data: CreateEstablishmentDTO,
	): Promise<Establishment> {
		return this.repository.create(data);
	}

	public async findAll(query: GetEstablishmentsQueryDTO): Promise<{
		items: Establishment[];
		total: number;
	}> {
		return this.repository.findAll(query);
	}

	public async findById(id: string): Promise<Establishment> {
		const establishment = await this.repository.findById(id);
		if (!establishment) {
			throw new CustomError(
				'Establishment not found',
				HttpStatusCode.NOT_FOUND,
			);
		}
		return establishment;
	}

	public async update(
		id: string,
		data: UpdateEstablishmentDTO,
	): Promise<Establishment> {
		const establishment = await this.repository.findById(id);
		if (!establishment) {
			throw new CustomError(
				'Establishment not found',
				HttpStatusCode.NOT_FOUND,
			);
		}
		return this.repository.update(id, data);
	}

	public async delete(id: string): Promise<void> {
		const establishment = await this.repository.findById(id);
		if (!establishment) {
			throw new CustomError(
				'Establishment not found',
				HttpStatusCode.NOT_FOUND,
			);
		}
		return this.repository.delete(id);
	}
}

export const establishmentService = new EstablishmentService();
