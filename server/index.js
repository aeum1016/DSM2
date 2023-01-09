import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/user.js";
import friendRoutes from "./routes/friend.js";
import attemptRoutes from "./routes/attempt.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/friend", friendRoutes);
app.use("/attempt", attemptRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .set("strictQuery", true)
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "DSM2",
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
