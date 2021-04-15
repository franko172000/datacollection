import { Service } from 'typedi';
import MessageBrooker from '../../../brooker/message_brooker';
import config from '../../../config';
const authConfig = config.brookerChannels.email.auth;
@Service()
export class AuthEmailService {
  constructor(private readonly brooker: MessageBrooker) {
    this.init();
  }

  async init() {
    this.confirmationEmail();
  }

  async confirmationEmail() {
    this.brooker.consumeMessage(authConfig.confirmation, (msg: any, ack: any) => {
      const { email, firstName, lastName } = msg;
      //TODO: connect to third-party email service
      console.log(email, firstName, lastName);
    });
  }

  async welcomeEmail() {
    this.brooker.consumeMessage(authConfig.welcome, (msg: any, ack: any) => {
      const { email, firstName, lastName } = msg;
      //TODO: connect to third-party email service
      console.log(email, firstName, lastName);
    });
  }

  async passwordResetEmail() {
    this.brooker.consumeMessage(authConfig.passwordReset, (msg: any, ack: any) => {
      const { email, firstName, lastName } = msg;
      //TODO: connect to third-party email service
      console.log(email, firstName, lastName);
    });
  }
}
