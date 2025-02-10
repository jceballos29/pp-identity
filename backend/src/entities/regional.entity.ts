import { EntityBase } from "../types";

export interface Regional extends EntityBase {
  name: string;
}

export type CreateRegionalDTO = Pick<Regional, 'name'>;
export type UpdateRegionalDTO = Partial<Pick<Regional, 'name'>>;

export interface RegionalFilter {
  field: 'name' | 'createdAt' | 'updatedAt';
  operator: 'contains' | 'equals' | 'lt' | 'lte' | 'gt' | 'gte';
  value: string | Date;
}

export interface GetRegionalsQueryDTO {
  page?: string;
  limit?: string;
  search?: string;
  sortBy?: 'name' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
  filters?: RegionalFilter[];
}