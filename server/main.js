import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import { connectDb } from "./src/config/mongodb.js";
import { AppError } from "./src/utils/AppError.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import alertsRouter from "./src/routes/alertsRoutes.js";
import userRouter from "./src/routes/userRoutes.js";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/health", (req, res) => {
  res.status(200).send("hello");
});

app.use("/api", alertsRouter);
app.use("/api/auth", userRouter);

app.use(errorHandler);

const initialyseApp = async () => {
  const db = await connectDb();
  if (!db) {
    throw new AppError("Internal Error", 500);
  }
  app.listen(PORT, () => console.log(`listening in ${PORT}`));
};

initialyseApp();
