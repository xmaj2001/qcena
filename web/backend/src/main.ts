import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppValidationPipe } from './shared/pipes/validation.pipe';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import { setupSwaggerScalar } from './shared/config/swagger-scalar.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true, // necessário para WebhookSignatureGuard
    bufferLogs: true,
  });

  const config = app.get(ConfigService);
  const port = config.get<number>('app.port') ?? 5000;
  const name = config.get<string>('app.name') ?? 'Backend';
  const isProd = config.get<boolean>('app.isProd') ?? false;
  // ── Global Pipes / Filters / Interceptors ───────────────────────────────────
  app.useGlobalPipes(AppValidationPipe);
  // app.useWebSocketAdapter(new IoAdapter(app));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  // ── Swagger ─────────────────────────────────────────────────────────────────
  setupSwaggerScalar(app, name, isProd);

  await app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
bootstrap();
