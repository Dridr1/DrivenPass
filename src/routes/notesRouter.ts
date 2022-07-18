import { Router } from "express";
import { validateToken } from "../middlewares/tokenMiddleware.js";
import { newNotesMiddleware } from "../middlewares/notesMiddleware.js";
import { newNoteController, getAllNotesController, getNoteByIdController } from "../controllers/notesController.js";

const notesRouter = Router();

notesRouter.post("/new-notes", validateToken, newNotesMiddleware, newNoteController );
notesRouter.get("/get-notes", validateToken, getAllNotesController);
notesRouter.get("/get-notes/:id", validateToken, getNoteByIdController);
notesRouter.delete("/delete-note/:id", validateToken, getNoteByIdController);

export default notesRouter;