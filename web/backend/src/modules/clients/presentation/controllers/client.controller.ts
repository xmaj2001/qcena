import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { ClientClientService } from '../../app/services/client-client.service';

import {
  InternalErrorResponse,
  UnauthorizedResponse,
  NotFoundResponse,
} from 'src/shared/common/envelope.response';
import {
  PaginatedClientSummaryResponse,
  SingleClientDetailsResponse,
  PaginatedClientBookingsResponse,
  FavoriteServiceResponse,
} from '../responses';
import {
  ListClientsInput,
  ListClientBookingsInput,
  TopClientsInput,
  ClientDetailsInput,
} from '../inputs';

@ApiBearerAuth('Authorization')
@ApiTags('clients')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientClientService) {}

  @Get()
  @ApiOperation({ summary: 'Listar clientes' })
  @ApiResponse({ status: 200, type: PaginatedClientSummaryResponse })
  @ApiResponse({ status: 401, type: UnauthorizedResponse })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async listClients(
    @Session() session: UserSession,
    @Query() query: ListClientsInput,
  ) {
    return this.clientService.listClients(session.user.id, query);
  }

  @Get('top')
  @ApiOperation({ summary: 'Obter top N clientes' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 401, type: UnauthorizedResponse })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async getTopClients(
    @Session() session: UserSession,
    @Query() query: TopClientsInput,
  ) {
    return this.clientService.getTopClients(session.user.id, query.limit ?? 5);
  }

  @Get('bookings')
  @ApiOperation({ summary: 'Listar reservas de todos os clientes' })
  @ApiResponse({ status: 200, type: PaginatedClientBookingsResponse })
  @ApiResponse({ status: 401, type: UnauthorizedResponse })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async listAllClientBookings(
    @Session() session: UserSession,
    @Query() query: ListClientBookingsInput,
  ) {
    return this.clientService.listClientBookings(session.user.id, query);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Obter detalhes do cliente' })
  @ApiResponse({ status: 200, type: SingleClientDetailsResponse })
  @ApiResponse({ status: 404, type: NotFoundResponse })
  @ApiResponse({ status: 401, type: UnauthorizedResponse })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async getClientDetails(
    @Session() session: UserSession,
    @Param('userId') userId: string,
    @Query() query: ClientDetailsInput,
  ) {
    return this.clientService.getClientDetails(
      session.user.id,
      userId,
      query.servicesLimit ?? 5,
    );
  }

  @Get(':userId/check')
  @ApiOperation({
    summary: 'Ele é meu cliente?',
    description:
      'Retorna true se o cliente for meu cliente, false caso contrário',
  })
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({ status: 401, type: UnauthorizedResponse })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async checkIsClient(
    @Session() session: UserSession,
    @Param('userId') userId: string,
  ) {
    return this.clientService.checkIsClient(session.user.id, userId);
  }

  @Get(':userId/bookings')
  @ApiOperation({
    summary: 'Listar reservas do cliente',
    description: 'Reservas de um cliente específico',
  })
  @ApiResponse({ status: 200, type: PaginatedClientBookingsResponse })
  @ApiResponse({ status: 401, type: UnauthorizedResponse })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async listSpecificClientBookings(
    @Session() session: UserSession,
    @Param('userId') userId: string,
    @Query() query: Omit<ListClientBookingsInput, 'clientId'>,
  ) {
    // Injetar o clientId do param no filter
    const filter: ListClientBookingsInput = { ...query, clientId: userId };
    return this.clientService.listClientBookings(session.user.id, filter);
  }

  @Get(':userId/favorite-service')
  @ApiOperation({
    summary: 'Serviço favorito do cliente',
    description: 'Serviço que o cliente mais contratou',
  })
  @ApiResponse({ status: 200, type: FavoriteServiceResponse })
  @ApiResponse({ status: 404, type: NotFoundResponse })
  @ApiResponse({ status: 401, type: UnauthorizedResponse })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async getFavoriteService(
    @Session() session: UserSession,
    @Param('userId') userId: string,
  ) {
    return this.clientService.getFavoriteService(session.user.id, userId);
  }
}
