import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import "express-async-errors";

import {
  errorHandlerMiddleware,
  NotFoundError,
} from "@esmailelmoussel/microservices-common";
import { createOrder } from "./routes/create-order";
import { getOrders } from "./routes/get-orders";
import { cancelOrder } from "./routes/cancel-order";
import { getOrder } from "./routes/get-order";

const app = express();

app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false, // handle http requests
  })
);

app.use(getOrders);
app.use(createOrder);
app.use(cancelOrder);
app.use(getOrder);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandlerMiddleware);

export { app };
