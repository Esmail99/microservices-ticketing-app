import {
  BaseListener,
  OrderCreatedEvent,
} from "@esmailelmoussel/microservices-common";
import { Message } from "node-nats-streaming";
import { configs } from "../../configs";
import { orderExpirationQueue } from "../../queues";

export class OrderCreatedListener extends BaseListener<OrderCreatedEvent> {
  readonly subject = "order:created";

  queueGroup = configs.QUEUE_GROUP_NAME;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const currentDate = new Date().getTime();

    const expirationDate = new Date(data.expiresAt).getTime();

    const delay = expirationDate - currentDate;

    await orderExpirationQueue.add({ orderId: data.id }, { delay });

    msg.ack();
  }
}
