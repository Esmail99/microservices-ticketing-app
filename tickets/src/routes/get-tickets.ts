import { Router } from "express";
import { Ticket } from "../models/ticket.model";

const router = Router();

router.get("/api/tickets", async (req, res) => {
  const tickets = await Ticket.find({ orderId: undefined });

  return res.json(tickets);
});

export { router as getTickets };
