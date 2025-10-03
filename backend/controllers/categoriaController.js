import Categoria from "../models/Categoria.js";

const adicionar = async (req, res) => {
  try {
    const { nomeCategoria } = req.body;

    const existeCategoria = await Categoria.findOne({ name: nomeCategoria });
    if (existeCategoria) {
      return res
        .status(400)
        .json({ success: false, message: "categoria já existe" });
    }
    const novaCategoria = new Categoria({
      nomeCategoria,
    });
    await novaCategoria.save();
    return res
      .status(201)
      .json({ success: true, message: "categoria adc com sucesso" });
  } catch (error) {
    console.error("Erro ao adc categoria", error);
    return res.status(500).json({ success: false, message: " erro" });
  }
};
const listar = async (req, res) => {
  const categoria = await Categoria.find();
  return res.json(categoria);
};
export { adicionar, listar };
