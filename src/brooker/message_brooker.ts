import { connect } from 'amqplib';
import { Service } from 'typedi';
import config from '../config';
import { BrookerCallbackInterface } from './interface/brooker_interface';

@Service()
export default class MessageBrooker {
  /**
   * @var connection amqp connection
   */
  private connection: any;
  /**
   * @var channel amqp message channel
   */
  private channel: any;
  /**
   * @var instance MessageBrooker instance
   */
  private static instance: any;

  constructor() {
    this.init();
  }

  static async getInstance() {
    if (!this.instance) {
      const brooker = new MessageBrooker();
      this.instance = brooker.init();
    }

    return this.instance;
  }

  async init() {
    this.connection = await connect(config.amqpUrl);
    this.channel = await this.connection.createChannel();
    return this;
  }

  /**
   *
   * @param queueName queue name
   * @param data data to be put in the queque
   */
  async sendMessage(queueName: string, data: any) {
    if (!this.connection) {
      await this.init();
    }
    //console.log(this.channel)
    await this.channel.assertQueue(queueName, { durable: true });
    await this.channel.sendToQueue(queueName, Buffer.from(data), { persistent: true });
  }

  /**
   * Handle message in the queque
   * @param queueName  queue name
   * @param callback function to receive the message from the consumer listener
   */
  async consumeMessage(queueName: string, callback: BrookerCallbackInterface) {
    await this.channel.assertQueue(queueName, { durable: true });
    await this.channel.consume(queueName, async (msg: any) => {
      const ack = await this.channel.ack(msg);
      const data = JSON.parse(msg.content.toString());
      callback(data, ack);
    });
  }
}
