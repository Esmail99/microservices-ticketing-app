import {
  BaseListener,
  TicketCreatedEvent,
} from "@esmailelmoussel/microservices-common";
import { Message } from "node-nats-streaming";
import { configs } from "../../configs";
import { Ticket } from "../../models/ticket.model";

export class TicketCreatedListener extends BaseListener<TicketCreatedEvent> {
  readonly subject = "ticket:created";

  queueGroup = configs.QUEUE_GROUP_NAME;

  onMessage = async (data: TicketCreatedEvent["data"], msg: Message) => {
    const { id, title, price } = data;

    const ticket = Ticket.build({ id, title, price });
    await ticket.save();

    msg.ack();
  };
}
