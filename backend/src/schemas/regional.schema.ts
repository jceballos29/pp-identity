import { object, string, TypeOf, enum as enum_, union, number, date } from 'zod';

export const createRegionalSchema = object({
  body: object({
    name: string({ required_error: 'Name is required' }).min(3, 'Name is too short, must be at least 3 characters'),
  }),
})

export const updateRegionalSchema = object({
  params: object({
    id: string({ required_error: 'ID is required' }),
  }),
  body: object({
    name: string({ required_error: 'Name is required' }).min(3, 'Name is too short, must be at least 3 characters'),
  }),
})

export const regionalFilterSchema = object({
  field: enum_(['name', 'createdAt', 'updatedAt'] as const),
  operator: enum_(['equals', 'contains', 'gt', 'gte', 'lt', 'lte'] as const),
  value: union([string(), date()]),
})

export const getRegionalsSchema = object({
  query: object({
    page: string().optional(),
    limit: string().optional(),
    search: string().optional(),
    sortBy: enum_(['name', 'createdAt', 'updatedAt']).optional(),
    sortOrder: enum_(['asc', 'desc']).optional(),
    filters: regionalFilterSchema.array().optional(),
  }),
})

export const getRegionalSchema = object({
  params: object({
    id: string({ required_error: 'ID is required' }),
  }),
})

export const deleteRegionalSchema = object({
  params: object({
    id: string({ required_error: 'ID is required' }),
  }),
})

export type CreateRegionalSchema = TypeOf<typeof createRegionalSchema>;
export type UpdateRegionalSchema = TypeOf<typeof updateRegionalSchema>;
export type GetRegionalsSchema = TypeOf<typeof getRegionalsSchema>;
export type GetRegionalSchema = TypeOf<typeof getRegionalSchema>;
export type DeleteRegionalSchema = TypeOf<typeof deleteRegionalSchema>;