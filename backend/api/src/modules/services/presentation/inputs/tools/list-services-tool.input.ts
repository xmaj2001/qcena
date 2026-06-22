import { ServiceCategory } from 'src/modules/services/domain/entities/enums/service-category.enum';
import { ServiceStatus } from 'src/modules/services/domain/entities/enums/service-status.enum';
import { z } from 'zod';

export const ListServicesToolInputSchema = z.object({
  cursor: z.string().optional(),

  limit: z.coerce.number().int().min(1).max(100).default(10),

  status: z.nativeEnum(ServiceStatus).optional(),

  category: z.nativeEnum(ServiceCategory).optional(),

  minPrice: z.coerce.number().int().min(0).optional(),

  maxPrice: z.coerce.number().int().min(0).optional(),

  search: z.string().optional(),
});

export type ListServicesToolInput = z.infer<typeof ListServicesToolInputSchema>;
