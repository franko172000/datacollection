import { Service } from 'typedi';
import MessageBrooker from '../../../brooker/message_brooker';
import config from '../../../config';
import { SendGridMialer } from '../mailer/sendgrid';
const authConfig = config.brookerChannels.email.auth;
@Service()
export class AuthEmailService {
  constructor(private readonly brooker: MessageBrooker, private readonly mailer: SendGridMialer) {
    this.init();
  }

  async init() {
    this.confirmationEmail();
    this.welcomeEmail();
    this.passwordResetEmail();
  }

  async confirmationEmail() {
    this.brooker.consumeMessage(authConfig.confirmation, async (msg: any, ack: any) => {
      const { email, firstName, lastName, otp } = msg;
      // Dispatch email
      await this.mailer.confirmEmail(email, firstName, otp);
    });
  }

  async welcomeEmail() {
    this.brooker.consumeMessage(authConfig.welcome, async (msg: any, ack: any) => {
      const { email, firstName, lastName } = msg;
      // Dispatch email
      await this.mailer.welcomeEmail(email, firstName);
    });
  }

  async passwordResetEmail() {
    this.brooker.consumeMessage(authConfig.passwordReset, async (msg: any, ack: any) => {
      const { email, firstName, lastName, otp } = msg;
      // Dispatch email
      await this.mailer.passwordResetEmail(email, firstName, otp);
    });
  }
}
