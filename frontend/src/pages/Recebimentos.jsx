import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";


export default function Recebimentos() {
  const [recebimentos, setRecebimentos] = useState([]);
  const [nomeRecebimento, setNomeRecebimento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const [buscaNome, setBuscaNome] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");

  const listarRecebimentos = async () => {
    try {
      const params = {};
      if (buscaNome) params.nome = buscaNome;
      if (dataInicial) params.dataInicial = dataInicial;
      if (dataFinal) params.dataFinal = dataFinal;

      const res = await axios.get(
        "http://localhost:3000/api/recebimento/listar",
        {
          params,
        }
      );
      setRecebimentos(res.data.recebimentos || []);
    } catch (error) {
      console.error("Erro ao listar recebimentos:", error);
    }
  };

  useEffect(() => {
    listarRecebimentos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editandoId) {
        await axios.put(
          `http://localhost:3000/api/recebimento/editar/${editandoId}`,
          {
            nomeRecebimento,
            descricao,
            valor,
            data,
          }
        );
      } else {
        await axios.post("http://localhost:3000/api/recebimento/adicionar", {
          nomeRecebimento,
          descricao,
          valor,
          data,
        });
      }

      limparCampos();
      listarRecebimentos();
    } catch (error) {
      console.error("Erro ao salvar recebimento:", error);
    }
  };

  const handleDarBaixa = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/api/recebimento/baixar/${id}`);
      listarRecebimentos();
    } catch (error) {
      console.error("Erro ao dar baixa:", error);
    }
  };

  const handleEditar = (recebimento) => {
    setEditandoId(recebimento._id);
    setNomeRecebimento(recebimento.nomeRecebimento);
    setDescricao(recebimento.descricao);
    setValor(recebimento.valor);
    setData(recebimento.data.split("T")[0]);
  };

  const handleDeletar = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este recebimento?"))
      return;
    try {
      await axios.delete(`http://localhost:3000/api/recebimento/deletar/${id}`);
      listarRecebimentos();
    } catch (error) {
      console.error("Erro ao deletar recebimento:", error);
    }
  };

  const limparCampos = () => {
    setNomeRecebimento("");
    setDescricao("");
    setValor("");
    setData("");
    setEditandoId(null);
  };

  return (
    <div className="container mt-4 recebimentos-container">
      <h3 className="mb-3 text-center">Gestão de Recebimentos</h3>

      <div className="filtros mb-4">
        <input
          type="text"
          placeholder="Buscar por nome"
          className="form-control mb-2"
          value={buscaNome}
          onChange={(e) => setBuscaNome(e.target.value)}
        />
        <div className="d-flex gap-2">
          <input
            type="date"
            className="form-control"
            value={dataInicial}
            onChange={(e) => setDataInicial(e.target.value)}
          />
          <input
            type="date"
            className="form-control"
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
          />
          <button className="btn btn-secondary" onClick={listarRecebimentos}>
            Filtrar
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Nome do recebimento"
              className="form-control"
              value={nomeRecebimento}
              onChange={(e) => setNomeRecebimento(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Descrição"
              className="form-control"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              placeholder="Valor"
              className="form-control"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mt-3 text-end">
          <button type="submit" className="btn btn-primary">
            {editandoId ? "Salvar alterações" : "Adicionar recebimento"}
          </button>
          {editandoId && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={limparCampos}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Data</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Status</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {recebimentos.length > 0 ? (
            recebimentos.map((r) => (
              <tr key={r._id}>
                <td>{new Date(r.data).toLocaleDateString()}</td>
                <td>{r.nomeRecebimento}</td>
                <td>{r.descricao || "-"}</td>
                <td>R$ {Number(r.valor).toFixed(2)}</td>
                <td>
                  {r.recebido ? (
                    <span className="badge bg-success">Recebido</span>
                  ) : (
                    <span className="badge bg-warning text-dark">Pendente</span>
                  )}
                </td>
                <td className="text-center">
                  {!r.recebido && (
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => handleDarBaixa(r._id)}
                    >
                      Dar baixa
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => handleEditar(r)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeletar(r._id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                Nenhum recebimento encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
