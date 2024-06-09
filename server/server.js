import express from "express";
import dbConnect from "./database/index.js";
import { PORT } from "./config/index.js";
import router from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(router);

dbConnect();

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
