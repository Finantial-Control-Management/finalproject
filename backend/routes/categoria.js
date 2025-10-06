import express from "express";
import {
  adicionar,
  listar,
  editar,
  deletar,
} from "../controllers/categoriaController.js";

const router = express.Router();

router.post("/adicionar", adicionar);
router.get("/listar", listar);
router.put("/editar/:_id", editar);
router.delete("/deletar/:_id", deletar);

export default router;
