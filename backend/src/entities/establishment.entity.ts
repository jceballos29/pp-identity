import { EntityBase } from "../types";

export interface Establishment extends EntityBase {
  name: string;
  code: string;
  regionalId: string;
}

export type CreateEstablishmentDTO = Pick<Establishment, 'name' | 'code' | 'regionalId'>;
export type UpdateEstablishmentDTO = Partial<Pick<Establishment, 'name' | 'code'>>;

export interface EstablishmentFilter {
  field: 'name' | 'code' | 'createdAt' | 'updatedAt';
  operator: 'contains' | 'equals' | 'lt' | 'lte' | 'gt' | 'gte';
  value: string | number | Date;
}

export interface GetEstablishmentsQueryDTO {
  page?: string;
  limit?: string;
  search?: string;
  sortBy?: 'name' | 'code' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
  filters?: EstablishmentFilter[];
  regionalId?: string;
  all?: boolean;
}