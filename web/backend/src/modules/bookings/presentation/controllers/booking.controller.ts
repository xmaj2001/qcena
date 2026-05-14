import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { BookingClient } from '../../app/services/booking-client.service';

import {
  InternalErrorResponse,
  UnauthorizedResponse,
} from 'src/shared/common/envelope.response';
import {
  PaginatedBookingsResponse,
  SingleBookingResponse,
} from '../responses/booking.response';
import {
  CreateBookingInput,
  ListBookingsInput,
  UpdateBookingInput,
} from '../inputs';

@ApiBearerAuth('Authorization')
@ApiTags('bookings')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingClient: BookingClient) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova reserva' })
  @ApiResponse({ status: 201, type: SingleBookingResponse })
  @ApiResponse({ status: 401, type: UnauthorizedResponse })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async create(
    @Session() session: UserSession,
    @Body() input: CreateBookingInput,
  ) {
    return this.bookingClient.create(
      { ...input, scheduledAt: new Date(input.scheduledAt) },
      session.user.id,
    );
  }

  @Get('client')
  @ApiOperation({ summary: 'Listar minhas reservas (como cliente)' })
  @ApiResponse({ status: 200, type: PaginatedBookingsResponse })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async listAsClient(
    @Session() session: UserSession,
    @Query() query: ListBookingsInput,
  ) {
    return this.bookingClient.listAsClient(session.user.id, query);
  }

  @Get('provider')
  @ApiOperation({
    summary: 'Listar reservas dos meus serviços (como prestador)',
  })
  @ApiResponse({ status: 200, type: PaginatedBookingsResponse })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async listAsProvider(
    @Session() session: UserSession,
    @Query() query: ListBookingsInput,
  ) {
    return this.bookingClient.listAsProvider(session.user.id, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de uma reserva' })
  @ApiResponse({ status: 200, type: SingleBookingResponse })
  @ApiResponse({ status: 404, description: 'Reserva não encontrada' })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async findOne(@Session() session: UserSession, @Param('id') id: string) {
    return this.bookingClient.getById(id, session.user.id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Atualizar status de uma reserva' })
  @ApiResponse({ status: 200, type: SingleBookingResponse })
  @ApiResponse({ status: 401, type: UnauthorizedResponse })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async updateStatus(
    @Session() session: UserSession,
    @Param('id') id: string,
    @Body() input: UpdateBookingInput,
  ) {
    return this.bookingClient.updateStatus(id, input, session.user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Excluir uma reserva' })
  @ApiResponse({ status: 204, description: 'Reserva excluída' })
  @ApiResponse({ status: 401, type: UnauthorizedResponse })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async remove(@Session() session: UserSession, @Param('id') id: string) {
    return this.bookingClient.delete(id, session.user.id);
  }
}
