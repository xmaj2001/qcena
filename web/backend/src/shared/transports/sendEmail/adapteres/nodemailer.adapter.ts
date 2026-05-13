import { Injectable, Logger } from '@nestjs/common';
import type { Transporter } from 'nodemailer';
import { SendEmailOptions, SendEmailPort } from '../send-email-port';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodemailerAdapter extends SendEmailPort {
  private readonly logger = new Logger(NodemailerAdapter.name);
  private transporter: Transporter;
  private readonly from: string;

  constructor(private readonly config: ConfigService) {
    super();
    this.from = config.get<string>('email.from') ?? 'noreply@transcender.app';
    this.transporter = nodemailer.createTransport({
      host: config.get<string>('email.smtp.host'),
      port: config.get<number>('email.smtp.port') ?? 587,
      auth: {
        user: config.get<string>('email.smtp.user'),
        pass: config.get<string>('email.smtp.pass'),
      },
    });
  }

  async send(opts: SendEmailOptions): Promise<void> {
    this.logger.debug(`[Email/SMTP] Enviando para ${opts.to}`);
    await this.transporter.sendMail({
      from: this.from,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
    });
    this.logger.debug(`[Email/SMTP] Enviado para ${opts.to}`);
  }
}
