import Pagamento from "../models/Pagamento.js";

export const adicionarPagamento = async (req, res) => {
  try {
    const { nomePagamento, descricao, valor, data } = req.body;

    if (!nomePagamento || !valor || !data) {
      return res.status(400).json({
        success: false,
        message: "Campos obrigatórios: nomePagamento, valor e data.",
      });
    }

    const novoPagamento = new Pagamento({
      nomePagamento,
      descricao,
      valor,
      data,
    });

    await novoPagamento.save();

    return res.status(201).json({
      success: true,
      message: "Pagamento adicionado com sucesso!",
      pagamento: novoPagamento,
    });
  } catch (error) {
    console.error("Erro ao adicionar pagamento:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno ao adicionar pagamento.",
      error: error.message,
    });
  }
};

export const listarPagamentos = async (req, res) => {
  try {
    const { nome, dataInicial, dataFinal } = req.query;

    const filtro = {};

    if (nome) {
      filtro.nomePagamento = { $regex: nome, $options: "i" }; // busca parcial e case-insensitive
    }

    if (dataInicial && dataFinal) {
      filtro.data = { $gte: new Date(dataInicial), $lte: new Date(dataFinal) };
    } else if (dataInicial) {
      filtro.data = { $gte: new Date(dataInicial) };
    } else if (dataFinal) {
      filtro.data = { $lte: new Date(dataFinal) };
    }

    const pagamentos = await Pagamento.find(filtro).sort({ data: -1 });

    return res.status(200).json({
      success: true,
      pagamentos,
    });
  } catch (error) {
    console.error("Erro ao listar pagamentos:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno ao listar pagamentos.",
      error: error.message,
    });
  }
};

export const editarPagamento = async (req, res) => {
  try {
    const { _id } = req.params;
    const { nomePagamento, descricao, valor, data } = req.body;

    const pagamento = await Pagamento.findById(_id);
    if (!pagamento) {
      return res.status(404).json({
        success: false,
        message: "Pagamento não encontrado.",
      });
    }

    if (nomePagamento) pagamento.nomePagamento = nomePagamento;
    if (descricao) pagamento.descricao = descricao;
    if (valor) pagamento.valor = valor;
    if (data) pagamento.data = data;

    await pagamento.save();

    return res.status(200).json({
      success: true,
      message: "Pagamento atualizado com sucesso!",
      pagamento,
    });
  } catch (error) {
    console.error("Erro ao editar pagamento:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno ao editar pagamento.",
      error: error.message,
    });
  }
};

export const darBaixaPagamento = async (req, res) => {
  try {
    const { _id } = req.params;

    const pagamento = await Pagamento.findById(_id);
    if (!pagamento) {
      return res.status(404).json({
        success: false,
        message: "Pagamento não encontrado.",
      });
    }

    pagamento.pago = true;
    await pagamento.save();

    return res.status(200).json({
      success: true,
      message: "Pagamento marcado como pago!",
      pagamento,
    });
  } catch (error) {
    console.error("Erro ao dar baixa:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno ao dar baixa no pagamento.",
      error: error.message,
    });
  }
};

export const deletarPagamento = async (req, res) => {
  try {
    const { _id } = req.params;

    const pagamento = await Pagamento.findByIdAndDelete(_id);
    if (!pagamento) {
      return res.status(404).json({
        success: false,
        message: "Pagamento não encontrado.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Pagamento removido com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao deletar pagamento:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno ao deletar pagamento.",
      error: error.message,
    });
  }
};
