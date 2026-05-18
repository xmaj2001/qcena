import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  CreateServiceInput,
  UpdateServiceInput,
  ListServicesInput,
} from '../inputs';
import { AllowAnonymous, Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { ServiceClient } from '../../app/services/service-client.service';
import {
  InternalErrorResponse,
  UnauthorizedResponse,
} from 'src/shared/common/envelope.response';
import {
  PaginatedServicesResponse,
  SingleServiceResponse,
  RelatedServicesResponse,
} from '../responses/service.response';

@ApiBearerAuth()
@ApiTags('Services')
@Controller('services')
export class ServiceController {
  constructor(private readonly service: ServiceClient) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo serviço' })
  @ApiResponse({ status: 201, type: SingleServiceResponse })
  @ApiResponse({ status: 401, type: UnauthorizedResponse })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async create(
    @Session() session: UserSession,
    @Body() input: CreateServiceInput,
  ) {
    return this.service.createService(input, session.user.id);
  }

  @Get()
  @AllowAnonymous()
  @ApiOperation({ summary: 'Listar serviços' })
  @ApiResponse({ status: 200, type: PaginatedServicesResponse })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async findAll(@Query() query: ListServicesInput) {
    return this.service.listServices(query);
  }

  @Get('categories')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Listar categorias de serviços' })
  @ApiResponse({ status: 200, type: [String] })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  findCategories() {
    return this.service.listServicesCategory();
  }

  @Get('favorites')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Listar serviços favoritos' })
  @ApiResponse({ status: 200, type: PaginatedServicesResponse })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async findFavorites() {
    return this.service.getFeaturedServices();
  }

  @Get(':id')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Detalhes de um serviço' })
  @ApiResponse({ status: 200, type: SingleServiceResponse })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async findOne(@Param('id') id: string) {
    return this.service.getService(id);
  }

  @Get(':id/related')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Serviços relacionados' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 8 })
  @ApiResponse({ status: 200, type: RelatedServicesResponse })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async findRelated(@Param('id') id: string, @Query('limit') limit?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : 8;
    return this.service.getRelatedServices(id, parsedLimit);
  }

  @Patch(':id')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Atualizar um serviço' })
  @ApiResponse({ status: 200, type: SingleServiceResponse })
  @ApiResponse({ status: 401, type: UnauthorizedResponse })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async update(
    @Session() session: UserSession,
    @Param('id') id: string,
    @Body() input: UpdateServiceInput,
  ) {
    return this.service.updateService(id, input, session.user.id);
  }

  @Delete(':id')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Excluir um serviço' })
  @ApiResponse({ status: 204, description: 'Serviço excluído' })
  @ApiResponse({ status: 401, type: UnauthorizedResponse })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async remove(@Session() session: UserSession, @Param('id') id: string) {
    return this.service.deleteService(id, session.user.id);
  }
}
