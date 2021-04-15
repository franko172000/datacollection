import MessageBrooker from '../../../brooker/message_brooker';
import { AuthEmailService } from '../email/auth_email.service';

export default (brooker: MessageBrooker) => {
  new AuthEmailService(brooker);
};
