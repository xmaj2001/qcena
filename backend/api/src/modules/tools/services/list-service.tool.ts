import { Injectable } from '@nestjs/common';
import { ListServicesUseCase } from '../../services/app/use-case';
import { Tool } from '@rekog/mcp-nest';
import type { ListServicesToolInput } from '../../services/presentation/inputs/tools/list-services-tool.input';

import { ListServicesToolInputSchema } from '../../services/presentation/inputs/tools/list-services-tool.input';

@Injectable()
export class ListServiceTool {
  constructor(private readonly listService: ListServicesUseCase) {}

  @Tool({
    name: 'list-services',
    description: 'Lista os serviços disponíveis',
    parameters: ListServicesToolInputSchema,
  })
  async listServices(input: ListServicesToolInput) {
    const result = await this.listService.execute(input);

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(result),
        },
      ],
    };
  }
}
