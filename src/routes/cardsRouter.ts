import { Router } from "express";
import { validateToken } from "../middlewares/tokenMiddleware.js";
import { newCardController, getAllCardsController, getCardByIdController, deleteCardController } from "../controllers/cardController.js";
import { newCardMiddleware } from "../middlewares/cardsMiddleware.js";

const cardsRouter = Router();

cardsRouter.post("/new-card", validateToken, newCardMiddleware, newCardController);
cardsRouter.get("/get-cards", validateToken, getAllCardsController);
cardsRouter.get("/get-cards/:id", validateToken, getCardByIdController);
cardsRouter.delete("/delete-cards/:id", validateToken, deleteCardController);

export default cardsRouter;