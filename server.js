import dotenv from "dotenv";
import express from "express";
import schoolRoutes from "./routes/schoolRoutes.js";
import { connectDB } from "./connectDB/connectDB.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/", schoolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
