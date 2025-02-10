import { object, string, TypeOf, enum as enum_, union, number, date, boolean, preprocess } from 'zod';

export const createEstablishmentSchema = object({
  body: object({
    name: string({ required_error: 'Name is required' }).min(3, 'Name is too short, must be at least 3 characters'),
    code: string({ required_error: 'Code is required' }).min(3, 'Code is too short, must be at least 3 characters'),
    regionalId: string({ required_error: 'Regional ID is required' }),
  }),
})

export const updateEstablishmentSchema = object({
  params: object({
    id: string({ required_error: 'ID is required' }),
  }),
  body: object({
    name: string({ required_error: 'Name is required' }).min(3, 'Name is too short, must be at least 3 characters'),
    code: string({ required_error: 'Code is required' }).min(3, 'Code is too short, must be at least 3 characters'),
  }),
})

export const establishmentFilterSchema = object({
  field: enum_(['name', 'code', 'createdAt', 'updatedAt'] as const),
  operator: enum_(['equals', 'contains', 'gt', 'gte', 'lt', 'lte'] as const),
  value: union([string(), number(), date()]),
})

export const getEstablishmentsSchema = object({
  query: object({
    page: string().optional(),
    limit: string().optional(),
    search: string().optional(),
    sortBy: enum_(['name', 'code', 'createdAt', 'updatedAt']).optional(),
    sortOrder: enum_(['asc', 'desc']).optional(),
    filters: establishmentFilterSchema.array().optional(),
    regionalId: string().optional(),
    all: preprocess(
      (val) => val === 'true' || val === true,
      boolean().optional() 
  ),
  }),
})

export const getEstablishmentSchema = object({
  params: object({
    id: string({ required_error: 'ID is required' }),
  }),
})

export const deleteEstablishmentSchema = object({
  params: object({
    id: string({ required_error: 'ID is required' }),
  }),
})

export type CreateEstablishmentSchema = TypeOf<typeof createEstablishmentSchema>;
export type UpdateEstablishmentSchema = TypeOf<typeof updateEstablishmentSchema>;
export type GetEstablishmentsSchema = TypeOf<typeof getEstablishmentsSchema>;
export type GetEstablishmentSchema = TypeOf<typeof getEstablishmentSchema>;
export type DeleteEstablishmentSchema = TypeOf<typeof deleteEstablishmentSchema>;