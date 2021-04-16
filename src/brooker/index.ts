import EmailReceivers from '../modules/notifications/receiver';
import MessageBrooker from './message_brooker';

export default async () => {
  const brooker = await MessageBrooker.getInstance();
  EmailReceivers(brooker);
};
