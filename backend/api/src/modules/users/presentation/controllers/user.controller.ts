import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ListAccountsQuery, UpdateAccountInput } from '../inputs';
import {
  InternalErrorResponse,
  NotFoundResponse,
  SuccessResponse,
  UnauthorizedResponse,
  ValidationErrorResponse,
} from 'src/shared/common/envelope.response';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import {
  PaginatedUsersResponse,
  SuccessUsersResponse,
} from '../responses/user.response';
import { UserClientService } from '../../app/services/user-client.service';

// ──────────────────────────────────────────────────────────────────────────

@ApiBearerAuth('Authorization')
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userClientService: UserClientService) {}

  // ── GET / ──────────────────────────────────────────────────────────────────
  @Get()
  @ApiOperation({ summary: 'Listar todas as contas' })
  @ApiResponse({ status: 200, type: PaginatedUsersResponse })
  @ApiResponse({ status: 401, type: UnauthorizedResponse })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async findAll(@Query() query: ListAccountsQuery) {
    return this.userClientService.listAccounts(query);
  }

  @Get('me')
  @ApiOperation({ summary: 'Obter minha conta' })
  @ApiResponse({ status: 200, type: SuccessUsersResponse })
  @ApiResponse({ status: 401, type: UnauthorizedResponse })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async findMyAccount(@Session() session: UserSession) {
    return this.userClientService.findById(session.user.id);
  }

  // ── PATCH /me ──────────────────────────────────────────────────────────────
  @Patch('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualizar minha conta' })
  @ApiResponse({ status: 200, type: SuccessUsersResponse })
  @ApiResponse({ status: 401, type: UnauthorizedResponse })
  @ApiResponse({ status: 422, type: ValidationErrorResponse })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async updateMe(
    @Session() session: UserSession,
    @Body() input: UpdateAccountInput,
  ) {
    return this.userClientService.updateMe(session.user.id, input);
  }

  // ── DELETE /me ─────────────────────────────────────────────────────────────
  @Delete('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar minha conta' })
  @ApiResponse({ status: 200, type: SuccessResponse(class DeletedDto {}) })
  @ApiResponse({ status: 401, type: UnauthorizedResponse })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async deleteMe(@Session() session: UserSession) {
    return this.userClientService.deleteMe(session.user.id);
  }

  // ── GET /:id ───────────────────────────────────────────────────────────────
  @Get(':id')
  @ApiOperation({ summary: 'Procurar conta por ID' })
  @ApiResponse({ status: 200, type: SuccessUsersResponse })
  @ApiResponse({ status: 401, type: UnauthorizedResponse })
  @ApiResponse({ status: 404, type: NotFoundResponse })
  @ApiResponse({ status: 500, type: InternalErrorResponse })
  async findOne(@Param('id') id: string) {
    return this.userClientService.findById(id);
  }
}
