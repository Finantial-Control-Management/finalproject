import express from "express";
import cors from "cors";
import connectionDb from "./db/connection.js";
import authRoutes from "./routes/auth.js";
import categoriaRoutes from "./routes/categoria.js";
import pagamentoRoutes from "./routes/pagamento.js";
import recebimentoRoutes from "./routes/recebimento.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/categoria", categoriaRoutes);
app.use("/api/pagamento", pagamentoRoutes);
app.use("/api/recebimento", recebimentoRoutes);

app.listen(process.env.PORT, () => {
  connectionDb();
  console.log("Server is running on http://localhost:3000");
});
