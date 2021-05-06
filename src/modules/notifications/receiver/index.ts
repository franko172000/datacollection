import MessageBrooker from '../../../brooker/message_brooker';
import { AuthEmailService } from '../email/auth_email.service';
import { SendGridMialer } from '../mailer/sendgrid';

export default (brooker: MessageBrooker) => {
  new AuthEmailService(brooker, new SendGridMialer());
};
