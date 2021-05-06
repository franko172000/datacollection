import sendgrid from '@sendgrid/mail';
import config from '../../../config';

export class SendGridMialer {
  private templates = {
    confirmation: 'd-1044399189274f72a53da590dd4ec92d',
    welcome: 'd-6429bf4ce9f34e4eb1df9bfc4b18bf2d',
    pwReset: 'd-cda36ad1f8d546a39f73ca4d9d04a25e',
  };

  constructor() {
    sendgrid.setApiKey(config.sendgridKey);
  }

  async confirmEmail(to: string, name: string, code: string) {
    await this.send(
      to,
      'Activate your account',
      {
        name,
        code,
      },
      this.templates.confirmation,
    );
  }

  async welcomeEmail(to: string, name: string) {
    await this.send(
      to,
      'Welcome to datacollection',
      {
        name,
      },
      this.templates.welcome,
    );
  }

  async passwordResetEmail(to: string, name: string, code: string) {
    await this.send(
      to,
      'Reset Password',
      {
        name,
        code,
      },
      this.templates.pwReset,
    );
  }

  private async send(to: string, subject: string, data: any, templateId: string) {
    await sendgrid.send({
      to,
      dynamicTemplateData: data,
      subject,
      templateId,
      from: config.emailSender,
    });
  }
}
