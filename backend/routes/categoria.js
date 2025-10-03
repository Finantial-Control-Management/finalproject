import express from "express";
import { adicionar, listar } from "../controllers/categoriaController.js";

const router = express.Router();

router.post("/adicionar", adicionar);
router.get("/listar", listar);
export default router;
