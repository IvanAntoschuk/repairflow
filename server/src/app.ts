import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { router } from "./routes/index.js";
import { errorHandler } from "./middleware/error-handler.js";

const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:3000";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: corsOrigin.split(",").map((s) => s.trim()),
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use("/api", router);
app.use(errorHandler);
