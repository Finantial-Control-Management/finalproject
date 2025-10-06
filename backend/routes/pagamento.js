import express from "express";
import {
  adicionarPagamento,
  listarPagamentos,
  editarPagamento,
  darBaixaPagamento,
  deletarPagamento,
} from "../controllers/pagamentoController.js";

const router = express.Router();

router.post("/adicionar", adicionarPagamento);
router.get("/listar", listarPagamentos);
router.put("/editar/:_id", editarPagamento);
router.patch("/baixar/:_id", darBaixaPagamento); // marcar como pago
router.delete("/deletar/:_id", deletarPagamento);

export default router;
