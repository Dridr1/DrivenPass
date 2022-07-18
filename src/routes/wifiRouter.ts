import { Router } from "express";
import * as wifiController from "../controllers/wifiController.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";
import { newWifiMiddleware } from "../middlewares/wifiMiddleware.js";

const wifiRouter = Router();

wifiRouter.post("/new-wifi", validateToken, newWifiMiddleware, wifiController.newWifiController );
wifiRouter.get("/get-wifi", validateToken, wifiController.getAllWifiController);
wifiRouter.get("/get-wifi/:id", validateToken, wifiController.getWifiByIdController);
wifiRouter.delete("/delete-wifi/:id", validateToken, wifiController.deleteWifiController);

export default wifiRouter;