import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { emailPassword, emailService, emailUser } from 'src/Config/env';
import { EmailResponse } from './email.interface';

@Injectable()
export class EmailService {
  private nodeMailerTransport: Mail;
  constructor() {
    this.nodeMailerTransport = createTransport({
      service: emailService,
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });
  }

  sendMail(options: Mail.Options): Promise<EmailResponse> {
    return this.nodeMailerTransport.sendMail(options);
  }

  async sendVerificationEmail(
    email: string,
    verifyUrl: string,
  ): Promise<{ sendStatus: boolean }> {
    const sendVerificationEmailRes: EmailResponse = await this.sendMail({
      sender: 'do-not-reply@aidfusion.com',
      from: 'aidfusion.com do-not-reply@aidfusion.com',
      to: email,
      subject: 'Please confirm your email address.',
      html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                font-weight: 800;
                background-color: #f5f5f5;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #333;
              }
              h2 {
                color: #333;
              }
              p {
                color: #666;
                line-height: 1.6;
              }
              a {
                text-decoration: none;
                color: #007bff;
              }
              .color-blue {
                color: #007bff;
              }
            </style>
          </head>
          <body>
            <article class="container">
              <h1>Welcome to Aidfusion.</h1>
              <p>Please confirm your email address by clicking the link below:</p>
              <a href="${verifyUrl}" class="color-blue">${verifyUrl}</a>
            </article>
          </body>
          </html>
      `,
    });

    return {
      sendStatus: sendVerificationEmailRes.rejected.length === 0 ? true : false,
    };
  }

  async sendForgotPasswordEmail(
    email: string,
    name: string,
    url: string,
  ): Promise<{ sendStatus: boolean }> {
    const sendForgotPasswordEmailRes: EmailResponse = await this.sendMail({
      sender: 'do-not-reply@aidfusion.com',
      from: 'aidfusion.com do-not-reply@aidfusion.com',
      to: email,
      subject: 'Reset Password.',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-weight: 800;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h2 {
              color: #333;
            }
            p {
              color: #666;
              line-height: 1.6;
            }
            a {
              text-decoration: none;
              color: #007bff;
            }
            .color-blue {
              color: #007bff
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Password Reset Request</h2>
            <p>Hello <span class='color-blue'>${name}</span>,</p>
            <p>We received a request to reset your password. To proceed with the password reset, please click the link below:</p>
            <p><a href="${url}">Reset Your Password</a></p>
            <br>
            <p>If you didn't request this password reset, you can safely ignore this email. Your password will remain unchanged.</p>
            <p>Thank you!</p>
          </div>
        </body>
        </html>
      `,
    });

    return {
      sendStatus:
        sendForgotPasswordEmailRes.rejected.length === 0 ? true : false,
    };
  }
}
