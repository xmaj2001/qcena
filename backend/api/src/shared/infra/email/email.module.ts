import { Global, Module } from '@nestjs/common';
import { SendEmailPort } from '../../ports/send-email-port';
import { BullModule } from '@nestjs/bullmq';
import { EmailProcessor } from './processors/email.processor';
import { BullmqEmailAdapter } from './adapters/bullmq-email.adapter';
import { NodemailerAdapter } from './adapters/nodemailer.adapter';

@Global()
@Module({
  imports: [BullModule.registerQueue({ name: 'email' })],
  providers: [
    NodemailerAdapter,
    EmailProcessor,
    {
      provide: SendEmailPort,
      useClass: BullmqEmailAdapter,
    },
  ],
  exports: [SendEmailPort],
})
export class EmailModule {}
