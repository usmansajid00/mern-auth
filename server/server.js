import express from "express";
import dbConnect from "./database/index.js";
import { PORT } from "./config/index.js";
import router from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:5173"],
};

const app = express();

app.use(cookieParser());

app.use(cors(corsOptions));

app.use(express.json());

app.use(router);

dbConnect();

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
