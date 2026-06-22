import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import {
  SendEmailOptions,
  SendEmailPort,
} from 'src/shared/ports/send-email-port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BullmqEmailAdapter implements SendEmailPort {
  constructor(@InjectQueue('email') private readonly emailQueue: Queue) {}

  async send(emailOptions: SendEmailOptions): Promise<void> {
    await this.emailQueue.add('send-email', emailOptions, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 2000 },
    });
  }
}
