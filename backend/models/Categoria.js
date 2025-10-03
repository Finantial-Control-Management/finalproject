import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
  nomeCategoria: { type: String, required: true },
});

const CategoriaModel = mongoose.model("Categoria", categoriaSchema);
export default CategoriaModel;
