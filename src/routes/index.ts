import { Router } from "express";
import credentialsRouter from "./credentialsRouter.js";
import userRouter from "./userRouter.js";
import cardsRouter from "./cardsRouter.js";
import notesRouter from "./notesRouter.js";
import wifiRouter from "./wifiRouter.js";

const router = Router();

router.use(userRouter);
router.use(cardsRouter);
router.use(credentialsRouter);
router.use(notesRouter);
router.use(wifiRouter);

export default router;