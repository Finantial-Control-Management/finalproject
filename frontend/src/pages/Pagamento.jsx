import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Pagamento.css";

export default function Pagamentos() {
  const [pagamentos, setPagamentos] = useState([]);
  const [nomePagamento, setNomePagamento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const [buscaNome, setBuscaNome] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");

  const listarPagamentos = async () => {
    try {
      const params = {};
      if (buscaNome) params.nome = buscaNome;
      if (dataInicial) params.dataInicial = dataInicial;
      if (dataFinal) params.dataFinal = dataFinal;

      const res = await axios.get(
        "http://localhost:3000/api/pagamento/listar",
        {
          params,
        }
      );
      setPagamentos(res.data.pagamentos || []);
    } catch (error) {
      console.error("Erro ao listar pagamentos:", error);
    }
  };

  useEffect(() => {
    listarPagamentos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editandoId) {
        await axios.put(
          `http://localhost:3000/api/pagamento/editar/${editandoId}`,
          {
            nomePagamento,
            descricao,
            valor,
            data,
          }
        );
      } else {
        await axios.post("http://localhost:3000/api/pagamento/adicionar", {
          nomePagamento,
          descricao,
          valor,
          data,
        });
      }

      limparCampos();
      listarPagamentos();
    } catch (error) {
      console.error("Erro ao salvar pagamento:", error);
    }
  };

  const handleDarBaixa = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/api/pagamento/baixar/${id}`);
      listarPagamentos();
    } catch (error) {
      console.error("Erro ao dar baixa:", error);
    }
  };

  const handleEditar = (pagamento) => {
    setEditandoId(pagamento._id);
    setNomePagamento(pagamento.nomePagamento);
    setDescricao(pagamento.descricao);
    setValor(pagamento.valor);
    setData(pagamento.data.split("T")[0]);
  };

  const handleDeletar = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este pagamento?"))
      return;
    try {
      await axios.delete(`http://localhost:3000/api/pagamento/deletar/${id}`);
      listarPagamentos();
    } catch (error) {
      console.error("Erro ao deletar pagamento:", error);
    }
  };

  const limparCampos = () => {
    setNomePagamento("");
    setDescricao("");
    setValor("");
    setData("");
    setEditandoId(null);
  };

  return (
    <div className="container mt-4 pagamentos-container">
      <h3 className="mb-3 text-center">Gestão de Pagamentos</h3>

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
          <button className="btn btn-secondary" onClick={listarPagamentos}>
            Filtrar
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Nome do pagamento"
              className="form-control"
              value={nomePagamento}
              onChange={(e) => setNomePagamento(e.target.value)}
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
            {editandoId ? "Salvar alterações" : "Adicionar pagamento"}
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
          {pagamentos.length > 0 ? (
            pagamentos.map((p) => (
              <tr key={p._id}>
                <td>{new Date(p.data).toLocaleDateString()}</td>
                <td>{p.nomePagamento}</td>
                <td>{p.descricao || "-"}</td>
                <td>R$ {Number(p.valor).toFixed(2)}</td>
                <td>
                  {p.pago ? (
                    <span className="badge bg-success">Pago</span>
                  ) : (
                    <span className="badge bg-warning text-dark">Pendente</span>
                  )}
                </td>
                <td className="text-center">
                  {!p.pago && (
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => handleDarBaixa(p._id)}
                    >
                      Dar baixa
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => handleEditar(p)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeletar(p._id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                Nenhum pagamento encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
