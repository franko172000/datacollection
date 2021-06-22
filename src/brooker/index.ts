import EmailReceivers from '../modules/notifications/receiver';
import MessageBrooker from './message_brooker';
import config from '../config';

export default async () => {
  const brooker = await MessageBrooker.getInstance();
  if (config.environment !== 'test') {
    EmailReceivers(brooker);
  }
};
