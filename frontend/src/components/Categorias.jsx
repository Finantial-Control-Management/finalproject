import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import "./Categorias.css";

const Categorias = () => {
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editarCategoria, setEditarCategoria] = useState(""); 

  const fetchCategorias = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/categoria/listar"
      );
      setCategorias(response.data);
    } catch (error) {
      console.error("Erro ao listar categorias:", error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

const handleDelete = async (_id) => {
  try {
    const confirmacao = window.confirm("Tem certeza que deseja excluir esta categoria?");
    if (!confirmacao) {
      return;
    }

    await axios.delete(`http://localhost:3000/api/categoria/deletar/${_id}`);
    alert("Categoria excluída com sucesso!");
    fetchCategorias(); 
  } catch (error) {
    console.error("Erro ao deletar categoria:", error);
    alert("Erro ao excluir categoria.");
  }
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editarCategoria) {
        const response = await axios.put(
          `http://localhost:3000/api/categoria/editar/${editarCategoria}`,
          { nomeCategoria },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          alert("Categoria atualizada com sucesso!");
        } else {
          alert("Erro ao atualizar categoria!");
        }
      } else {
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
        } else {
          alert("Erro ao adicionar categoria!");
        }
      }
      setNomeCategoria("");
      setEditarCategoria(null);
      setIsModalOpen(false);
      fetchCategorias();
    } catch (error) {
      console.error("Erro no submit:", error);
      alert("Erro ao salvar categoria!");
    }
  };

  const handleEdit = (categoria) => {
    setEditarCategoria(categoria._id);
    setNomeCategoria(categoria.nomeCategoria);
    setIsModalOpen(true); // 👉 abre modal também no editar
  };
  

  return (
    <div className="category-management-container">
      <h1 className="main-heading">Gestão de Categorias</h1>
      <div className="content-wrapper">
        <div className="category-list-card">
          <div className="category-list-header">
            <h2 className="card-heading">Categorias Existentes</h2>
            <button
              className="add-new-button"
              onClick={() => {
                setEditarCategoria(null); 
                setNomeCategoria("");
                setIsModalOpen(true);
              }}
            >
              <FaPlusCircle className="button-icon" /> Adicionar Nova
            </button>
          </div>

          <table className="category-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome da Categoria</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categorias.length > 0 ? (
                categorias.map((categoria, index) => (
                  <tr key={categoria._id}>
                    <td>{index + 1}</td>
                    <td>{categoria.nomeCategoria}</td>
                    <td className="action-buttons">
                      <button
                        onClick={() => handleEdit(categoria)}
                        className="edit-button"
                        title="Editar"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(categoria._id)}
                        className="delete-button" title="Excluir">
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="no-data">
                    Nenhuma categoria cadastrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="close-btn">
              <button
                className="modal-close-button"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-header">
              <h2 className="modal-title">
                {editarCategoria
                  ? "Editar Categoria"
                  : "Adicionar Nova Categoria"}
              </h2>
            </div>
            <form className="category-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Nome da Categoria"
                  className="form-input"
                  value={nomeCategoria}
                  onChange={(e) => setNomeCategoria(e.target.value)}
                />
              </div>

              <button type="submit" className="modal-add-button">
                <FaPlusCircle className="button-icon" />{" "}
                {editarCategoria ? "Salvar Alterações" : "Incluir Categoria"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorias;
