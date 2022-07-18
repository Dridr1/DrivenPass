import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import errorHandle from "./middlewares/errorHandle.js";
import router from "./routes/index.js";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use(router);

app.use(errorHandle);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`| Running at PORT ${PORT} |`);
});