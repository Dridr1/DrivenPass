import { Router } from "express";
import { bodyMiddleware } from "../middlewares/userMiddlewares.js";

const userRouter = Router();

userRouter.post("/sign-up", bodyMiddleware);

export default userRouter;