import { Injectable } from '@nestjs/common';
import { ServiceCategory } from '../../domain/entities/enums/service-category.enum';

@Injectable()
export class ListServicesCategoryUseCase {
  constructor() {}

  execute() {
    return Object.values(ServiceCategory);
  }
}
