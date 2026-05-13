import { Global, Module } from '@nestjs/common';
import { NodemailerAdapter } from './nodemailer.adapter';
import { SendEmailPort } from '../send-email-port';

@Global()
@Module({
  providers: [
    {
      provide: SendEmailPort,
      useClass: NodemailerAdapter,
    },
  ],
  exports: [SendEmailPort],
})
export class EmailModule {}
