import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import useRoutes from "./routes/user"

const PORT = process.env.PORT || 3000
const app = express()
app.use(cors());
app.use(express.json())

app.use("/api/auth", useRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
  })
  .catch((err) => console.error("MongoDB error: ", err));