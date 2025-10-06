import { Router } from "express";
import {
  adicionarRecebimento,
  listarRecebimentos,
  editarRecebimento,
  darBaixaRecebimento,
  deletarRecebimento,
} from "../controllers/recebimentoController.js";

const router = Router();

router.post("/adicionar", adicionarRecebimento);

router.get("/listar", listarRecebimentos);

router.put("/editar/:_id", editarRecebimento);

router.patch("/baixar/:_id", darBaixaRecebimento);

router.delete("/deletar/:_id", deletarRecebimento);

export default router;
