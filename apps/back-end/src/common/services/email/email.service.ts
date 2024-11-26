import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}

  transporter = createTransport({
    host: this.configService.get<string>('GMAIL_HOST'),
    port: this.configService.get<number>('GMAIL_PORT'),
    secure: true,
    auth: {
      user: this.configService.get<string>('GMAIL_USER'),
      pass: this.configService.get<string>('GMAIL_PASS'),
    },
  });

  defaultOptions: MailOptions = {
    from: this.configService.get<string>('GMAIL_USER'),
    to: '',
    subject: '',
  };

  sendEmail(options: typeof this.defaultOptions) {
    return this.transporter.sendMail({
      ...this.defaultOptions,
      ...options,
    });
  }

  sendVerificationToken(to: string, token: string) {
    return this.transporter.sendMail({
      ...this.defaultOptions,
      to,
      subject: 'Verify your email',
      text: `Click on the link to verify your email: http://localhost:3000/verification-token/verify/${token}`,
    });
  }
}
