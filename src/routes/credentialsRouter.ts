import { Router } from "express";
import { validateToken } from "../middlewares/tokenMiddleware.js";
import { newCredentialMiddleware } from "../middlewares/credentialsMiddleware.js";
import * as credentialController from "../controllers/credentialsController.js";

const credentialsRoute = Router();

credentialsRoute.post("/new-credential", validateToken, newCredentialMiddleware, credentialController.newCredentialController);
credentialsRoute.get("/get-credentials", validateToken, credentialController.getAllCredentialsController);
credentialsRoute.get("/get-credentials/:id", validateToken, credentialController.getCredentialByIdController);
credentialsRoute.delete("/delete-credential/:id", validateToken, credentialController.deleteCredentialController);

export default credentialsRoute;