import { Establishment as PrismaEstablishment } from '@prisma/client';
import database from '../config/database';
import {
  CreateEstablishmentDTO,
  Establishment,
  EstablishmentFilter,
  GetEstablishmentsQueryDTO,
  UpdateEstablishmentDTO,
} from '../entities/establishment.entity';
import logger from '../utils/logger';

export class EstablishmentRepository {
	public async create(
		data: CreateEstablishmentDTO,
	): Promise<Establishment> {
		const establishment = await database.establishment.create({
			data,
		});
		return this.mapEstablishmentToEstablishment(establishment);
	}

	public async update(
		id: string,
		data: UpdateEstablishmentDTO,
	): Promise<Establishment> {
		const establishment = await database.establishment.update({
			where: { id },
			data,
		});
		return this.mapEstablishmentToEstablishment(establishment);
	}

	public async delete(id: string): Promise<void> {
		await database.establishment.delete({ where: { id } });
	}

	public async findAll(
		query: GetEstablishmentsQueryDTO,
	): Promise<{ items: Establishment[]; total: number }> {
		const page = query.page ? parseInt(query.page) : 1;
		const limit = query.limit ? parseInt(query.limit) : 10;
		const skip = (page - 1) * limit;

		const sortOrder = query.sortOrder === 'asc' ? 'asc' : 'desc';
		const sortBy = query.sortBy ? query.sortBy : 'createdAt';

		const where: any = {};

		if (query.search) {
			where.OR = [
				{ name: { contains: query.search, mode: 'insensitive' } },
				{ code: { contains: query.search, mode: 'insensitive' } },
			];
		}

		if (query.filters && Array.isArray(query.filters)) {
			query.filters.forEach((filter: EstablishmentFilter) => {
				if (
					filter.field &&
					filter.operator &&
					filter.value !== undefined &&
					filter.value !== null
				) {
					switch (filter.operator) {
						case 'equals':
							where[filter.field] = {
								equals: filter.value,
								mode: 'insensitive',
							};
							break;
						case 'contains':
							where[filter.field] = {
								contains: filter.value,
								mode: 'insensitive',
							};
							break;
						case 'gt':
							where[filter.field] = { gt: filter.value };
							break;
						case 'gte':
							where[filter.field] = { gte: filter.value };
							break;
						case 'lt':
							where[filter.field] = { lt: filter.value };
							break;
						case 'lte':
							where[filter.field] = { lte: filter.value };
							break;
						default:
							logger.warn(`Unknown operator: ${filter.operator}`);
							break;
					}
				}
			});
		}

		if (query.regionalId) {
			where.regionalId = query.regionalId;
		}

		let establishments, total;

		if (query.all) {
			[establishments, total] = await database.$transaction([
				database.establishment.findMany({
					where,
					orderBy: { [sortBy]: sortOrder },
					include: { regional: true },
				}),
				database.establishment.count({ where }),
			]);
		} else {
			[establishments, total] = await database.$transaction([
				database.establishment.findMany({
					where,
					skip,
					take: limit,
					orderBy: { [sortBy]: sortOrder },
					include: { regional: true },
				}),
				database.establishment.count({ where }),
			]);
		}

		return {
			items: establishments.map(this.mapEstablishmentToEstablishment),
			total,
		};
	}

  public async findById(id: string): Promise<Establishment | null> {
    const establishment = await database.establishment.findUnique({
      where: { id },
    });
    if (!establishment) return null;
    return this.mapEstablishmentToEstablishment(establishment);
  }

	private mapEstablishmentToEstablishment(
		establishment: PrismaEstablishment,
	): Establishment {
		return {
			id: establishment.id,
			name: establishment.name,
			code: establishment.code,
			regionalId: establishment.regionalId,
			createdAt: establishment.createdAt,
			updatedAt: establishment.updatedAt,
		};
	}
}

export const establishmentRepository = new EstablishmentRepository();
