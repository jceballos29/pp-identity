import { Regional as PrismaRegional } from '@prisma/client';
import database from '../config/database';
import {
	CreateRegionalDTO,
	GetRegionalsQueryDTO,
	Regional,
	RegionalFilter,
	UpdateRegionalDTO,
} from '../entities/regional.entity';
import logger from '../utils/logger';

export class RegionalRepository {
	public async create(data: CreateRegionalDTO): Promise<Regional> {
		const regional = await database.regional.create({ data });
		return this.mapRegionalToRegional(regional);
	}

	public async update(
		id: string,
		data: UpdateRegionalDTO,
	): Promise<Regional> {
		const regional = await database.regional.update({
			where: { id },
			data,
		});
		return this.mapRegionalToRegional(regional);
	}

	public async delete(id: string): Promise<void> {
		await database.regional.delete({ where: { id } });
	}

	public async findAll(
		query: GetRegionalsQueryDTO,
	): Promise<{ items: Regional[]; total: number }> {
		const page = query.page ? parseInt(query.page) : 1;
		const limit = query.limit ? parseInt(query.limit) : 10;
		const skip = (page - 1) * limit;

		const sortOrder = query.sortOrder === 'asc' ? 'asc' : 'desc';
		const sortBy = query.sortBy ? query.sortBy : 'createdAt';

		const where: any = {};

		if (query.search) {
			where.name = { contains: query.search, mode: 'insensitive' };
		}

		if (query.filters && Array.isArray(query.filters)) {
			query.filters.forEach((filter: RegionalFilter) => {
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

		const [regionals, total] = await database.$transaction([
			database.regional.findMany({
				where,
				skip,
				take: limit,
				orderBy: { [sortBy]: sortOrder },
			}),
			database.regional.count({ where }),
		]);

		return {
			items: regionals.map((regional) =>
				this.mapRegionalToRegional(regional),
			),
			total,
		};
	}

	public async findById(id: string): Promise<Regional | null> {
		const regional = await database.regional.findUnique({
			where: { id },
		});
		return regional ? this.mapRegionalToRegional(regional) : null;
	}

	public async deleteAll(): Promise<void> {
		await database.regional.deleteMany({});
	}

	private mapRegionalToRegional(regional: PrismaRegional): Regional {
		return {
			id: regional.id,
			name: regional.name,
			createdAt: regional.createdAt,
			updatedAt: regional.updatedAt,
		};
	}
}

export const regionalRepository = new RegionalRepository();
