import mongoose from "mongoose";
import { app } from "./app";

const startServer = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017");
    console.info("Database connected successfully!");

    app.listen(3000, () => {
      console.info("Auth service listening on port 3000!");
    });
  } catch (err) {
    console.error("Error connecting to database! ", err);
  }
};

startServer();
