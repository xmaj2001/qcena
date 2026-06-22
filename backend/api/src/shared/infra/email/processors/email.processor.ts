import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { NodemailerAdapter } from '../adapters/nodemailer.adapter';
import { SendEmailOptions } from 'src/shared/ports/send-email-port';

@Processor('email')
export class EmailProcessor extends WorkerHost {
  constructor(private readonly nodemailer: NodemailerAdapter) {
    super();
  }

  async process(job: Job<SendEmailOptions>): Promise<void> {
    await this.nodemailer.send(job.data);
  }
}
