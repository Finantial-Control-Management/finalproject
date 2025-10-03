import Categoria from "../models/Categoria.js";

export const adicionar = async (req, res) => {
  try {
    const { nomeCategoria } = req.body;

    if (!nomeCategoria || nomeCategoria.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "O campo nomeCategoria é obrigatório",
      });
    }

    const novaCategoria = new Categoria({ nomeCategoria });
    await novaCategoria.save();

    return res.status(201).json({
      success: true,
      message: "Categoria adicionada com sucesso",
      categoria: novaCategoria,
    });
  } catch (error) {
    console.error("Erro ao adicionar categoria:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno ao adicionar categoria",
      error: error.message,
    });
  }
};

export const listar = async (req, res) => {
  try {
    const categorias = await Categoria.find().sort({ createdAt: -1 });

    return res.status(200).json(categorias);
  } catch (error) {
    console.error("Erro ao listar categorias:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno ao listar categorias",
      error: error.message,
    });
  }
};
export const deletar = async (req, res) => {
  const { _id } = req.params;

  try {
    const categoria = await Categoria.findByIdAndDelete(_id);
    if (!categoria) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }
    return res.status(200).json({ message: "Categoria deletada com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar categoria:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const editar = async (req, res) => {
  try {
    const { _id } = req.params;
    const { nomeCategoria } = req.body;

    if (!nomeCategoria || nomeCategoria.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "O campo nomeCategoria é obrigatório",
      });
    }

    const categoria = await Categoria.findById(_id);
    if (!categoria) {
      return res.status(404).json({
        success: false,
        message: "Categoria não encontrada",
      });
    }

    categoria.nomeCategoria = nomeCategoria;
    await categoria.save();

    return res.status(200).json({
      success: true,
      message: "Categoria atualizada com sucesso",
      categoria,
    });
  } catch (error) {
    console.error("Erro ao editar categoria:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno ao editar categoria",
      error: error.message,
    });
  }
};
