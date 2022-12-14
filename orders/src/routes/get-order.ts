import {
  AuthenticationError,
  authenticationMiddleware,
  NotFoundError,
} from "@esmailelmoussel/microservices-common";
import express, { Request, Response } from "express";
import { Order } from "../models/order.model";

const router = express.Router();

router.get(
  "/api/orders/:orderId",
  authenticationMiddleware,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate("ticket");

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new AuthenticationError("Not Authorized!");
    }

    res.send(order);
  }
);

export { router as getOrder };
