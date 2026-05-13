import { apiReference } from '@scalar/nestjs-api-reference';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwaggerScalar = (
  app: NestExpressApplication,
  name: string,
  isProd: boolean,
) => {
  if (!isProd) {
    const swaggerCfg = new DocumentBuilder()
      .setTitle(name)
      .setDescription('Backend API Transcender')
      .setVersion('1.0.0')
      .addBearerAuth()
      // .addCookieAuth('better-auth.session_token')
      .build();
    const document = SwaggerModule.createDocument(app, swaggerCfg);

    app.use(
      '/swagger',
      apiReference({
        content: document,
        theme: 'deepSpace',
      }),
    );
  }
};
