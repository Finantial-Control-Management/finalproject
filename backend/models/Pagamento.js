import mongoose from "mongoose";

const pagamentoSchema = new mongoose.Schema(
  {
    nomePagamento: {
      type: String,
      required: true,
      trim: true,
    },
    descricao: {
      type: String,
      trim: true,
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
  { timestamps: true }
);

export default mongoose.model("Pagamento", pagamentoSchema);
