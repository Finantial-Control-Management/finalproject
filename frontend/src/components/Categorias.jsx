import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Categorias.css";

const Categorias = () => {
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);

  // Função para buscar as categorias do backend
  const fetchCategorias = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/categoria/listar"
      );
      setCategorias(response.data);
    } catch (error) {
      console.error("Erro ao listar categorias", error);
    }
  };

  // Carrega as categorias na montagem do componente
  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/categoria/adicionar",
        { nomeCategoria },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        alert("Categoria adicionada com sucesso!");
        setNomeCategoria("");
        // Chama a função para recarregar a lista de categorias
        fetchCategorias();
      } else {
        console.error("Erro ao adicionar categoria!", response.data);
        alert("Erro ao adicionar categoria!");
      }
    } catch (error) {
      console.error("Erro ao adicionar categoria", error);
      alert("Erro ao adicionar categoria!");
    }
  };

  return (
    <div className="container">
      <h1 className="main-title">Gestão de Categorias</h1>

      <div className="card">
        <h2 className="card-title">Adicionar Categoria</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="categoria"
              id="categoria"
              placeholder="Nome da Categoria"
              className="form-input"
              value={nomeCategoria}
              onChange={(e) => setNomeCategoria(e.target.value)}
            />
          </div>
          <button type="submit" className="form-button">
            Incluir Categoria
          </button>
        </form>
      </div>

      <div className="card">
        <h2 className="card-title">Lista de Categorias</h2>
        <ul className="category-list">
          {categorias.length > 0 ? (
            categorias.map((categoria) => (
              <li key={categoria._id} className="category-item">
                {categoria.nomeCategoria}
              </li>
            ))
          ) : (
            <li className="no-data">Nenhuma categoria cadastrada.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Categorias;
