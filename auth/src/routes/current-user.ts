import { authenticationMiddleware } from "@esmailelmoussel/microservices-common";
import { Router } from "express";
import { User } from "../models/user.model";

const router = Router();

router.get(
  "/api/users/current-user",
  authenticationMiddleware,
  async (req, res) => {
    const { currentUser } = req;

    const user = await User.findById(currentUser?.id);

    return res.json(user);
  }
);

export { router as currentUserRouter };
