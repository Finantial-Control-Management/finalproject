import Recebimento from "../models/Recebimento.js";

export const adicionarRecebimento = async (req, res) => {
  try {
    const { nomeRecebimento, descricao, valor, data } = req.body;

    if (!nomeRecebimento || !valor || !data) {
      return res.status(400).json({
        success: false,
        message: "Campos obrigatórios: nome, valor e data.",
      });
    }

    const novoRecebimento = new Recebimento({
      nomeRecebimento,
      descricao,
      valor,
      data,
    });

    await novoRecebimento.save();

    return res.status(201).json({
      success: true,
      message: "Recebimento adicionado com sucesso!",
      recebimento: novoRecebimento,
    });
  } catch (error) {
    console.error("Erro ao adicionar recebimento:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno ao adicionar recebimento.",
      error: error.message,
    });
  }
};

export const listarRecebimentos = async (req, res) => {
  try {
    const { nome, dataInicial, dataFinal, pago, dataVencimentoAnteriorHoje } =
      req.query;

    const filtro = {};

    if (nome) {
      filtro.nomeRecebimento = { $regex: nome, $options: "i" };
    }

    if (dataInicial && dataFinal) {
      filtro.data = { $gte: new Date(dataInicial), $lte: new Date(dataFinal) };
    } else if (dataInicial) {
      filtro.data = { $gte: new Date(dataInicial) };
    } else if (dataFinal) {
      filtro.data = { $lte: new Date(dataFinal) };
    }

    if (pago) {
      filtro.pago = true;
    } else if (pago === "false") {
      filtro.pago = false;
    }

    if (dataVencimentoAnteriorHoje) {
      filtro.data = { ...filtro.data, $lt: new Date() };
      filtro.pago = false;
    }

    const recebimentos = await Recebimento.find(filtro)
      .sort({ data: -1 })
      .exec(); 

    return res.status(200).json({
      success: true,
      recebimentos,
    });
  } catch (error) {
    console.error("Erro ao listar recebimentos:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno ao listar recebimentos.",
      error: error.message,
    });
  }
};

export const editarRecebimento = async (req, res) => {
  try {
    const { _id } = req.params;
    const { nomeRecebimento, descricao, valor, data } = req.body;

    const recebimento = await Recebimento.findById(_id);
    if (!recebimento) {
      return res.status(404).json({
        success: false,
        message: "Recebimento não encontrado.",
      });
    }

    if (nomeRecebimento) recebimento.nomeRecebimento = nomeRecebimento;
    if (descricao) recebimento.descricao = descricao;
    if (valor) recebimento.valor = valor;
    if (data) recebimento.data = data;

    await recebimento.save();

    return res.status(200).json({
      success: true,
      message: "Recebimento atualizado com sucesso!",
      recebimento, 
    });
  } catch (error) {
    console.error("Erro ao editar recebimento:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno ao editar recebimento.",
      error: error.message,
    });
  }
};

export const darBaixaRecebimento = async (req, res) => {
  try {
    const { _id } = req.params;

    const recebimento = await Recebimento.findById(_id);
    if (!recebimento) {
      return res.status(404).json({
        success: false,
        message: "Recebimento não encontrado.",
      });
    }

    recebimento.pago = true;
    await recebimento.save();

    return res.status(200).json({
      success: true,
      message: "Recebimento marcado como recebido!",
      recebimento,
    });
  } catch (error) {
    console.error("Erro ao dar baixa:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno ao dar baixa no recebimento.",
      error: error.message,
    });
  }
};

export const deletarRecebimento = async (req, res) => {
  try {
    const { _id } = req.params;

    const recebimento = await Recebimento.findByIdAndDelete(_id);
    if (!recebimento) {
      return res.status(404).json({
        success: false,
        message: "Recebimento não encontrado.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Recebimento removido com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao deletar recebimento:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno ao deletar recebimento.",
      error: error.message,
    });
  }
};
