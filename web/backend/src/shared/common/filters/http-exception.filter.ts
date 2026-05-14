import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro interno do servidor';
    let details: any;

    if (this.isBetterAuthError(exception)) {
      // Better Auth — usa statusCode (número) e body.message
      status = (exception as any).statusCode ?? HttpStatus.BAD_REQUEST;
      message = (exception as any).body?.message ?? 'Erro de autenticação';
    } else if (exception instanceof HttpException) {
      // NestJS — ValidationPipe, guards, erros manuais
      status = exception.getStatus();
      const raw = exception.getResponse();
      if (typeof raw === 'string') {
        message = raw;
      } else {
        const body = raw as any;
        if (Array.isArray(body.message)) {
          message = 'Erro de validação';
          details = body.message;
        } else {
          message = body.message ?? message;
          if (body.details) details = body.details;
        }
      }
    } else if (exception instanceof Error) {
      // Erro inesperado — não expõe detalhes ao cliente
      this.logger.error(`Unhandled: ${exception.message}`, exception.stack);
    }

    if (status >= 500) {
      this.logger.error(
        `[${req.method}] ${req.url} → ${status}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    } else {
      this.logger.warn(`[${req.method}] ${req.url} → ${status} — ${message}`);
    }

    res.status(status).json({
      success: false,
      data: {
        code: status,
        message,
        ...(details ? { details } : {}),
      },
      ts: new Date().toISOString(),
      path: req.url,
    });
  }

  private isBetterAuthError(exception: unknown): boolean {
    return (
      typeof exception === 'object' &&
      exception !== null &&
      'statusCode' in exception &&
      'body' in exception &&
      typeof (exception as any).body?.message === 'string'
    );
  }
}
