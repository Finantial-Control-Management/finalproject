import mongoose from "mongoose";

const RecebimentoSchema = new mongoose.Schema(
  {
    nomeRecebimento: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      default: "",
    },
    valor: {
      type: Number,
      required: true,
    },
    data: {
      type: Date,
      required: true,
    },
    pago: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Recebimento", RecebimentoSchema);
