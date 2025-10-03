import express from "express";
import cors from "cors";
import connectionDb from "./db/connection.js";
import authRoutes from "./routes/auth.js";
import categoriaRoutes from "./routes/categoria.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/categoria", categoriaRoutes);

app.listen(process.env.PORT, () => {
  connectionDb();
  console.log("Server is running on http://localhost:3000");
});
