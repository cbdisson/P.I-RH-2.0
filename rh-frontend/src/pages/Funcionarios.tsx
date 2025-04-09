import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Funcionario {
  id: number;
  nome_completo: string;
  setor: string;
  status: boolean;
}

const usuarioLogado = JSON.parse(localStorage.getItem('usuario') || '{}');
const tipoUsuarioLogado = usuarioLogado?.tipo_usuario || '';

const Funcionarios = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [departamento, setDepartamento] = useState('');
  const [status, setStatus] = useState('ativo');
  const [filteredFuncionarios, setFilteredFuncionarios] = useState<Funcionario[]>([]);
  const [departamentos, setDepartamentos] = useState<string[]>([]); // Para armazenar os departamentos únicos
  const navigate = useNavigate();

  // Função para buscar funcionários
  useEffect(() => {
    const token = localStorage.getItem('token');
  
    axios.get('http://localhost:8000/api/funcionarios/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      setFuncionarios(response.data);
      setFilteredFuncionarios(response.data);  // Inicializa a lista filtrada com todos os funcionários
      
      // Extrair departamentos únicos dos funcionários
      const departamentosUnicos = Array.from(new Set(response.data.map(func => func.setor)));
      setDepartamentos(departamentosUnicos);
    })
    .catch(error => {
      console.error('Erro ao buscar funcionários:', error);
    });
  }, []);

  // Função de filtro
  const handleFilterChange = () => {
    let filtered = funcionarios;
    if (departamento) {
      filtered = filtered.filter(func => func.setor === departamento);
    }
    if (status) {
      filtered = filtered.filter(func => (status === 'ativo' ? func.status : !func.status));
    }
    setFilteredFuncionarios(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [departamento, status, funcionarios]);

  // Funções de navegação
  const handleEditar = (id: number) => {
    navigate(`/funcionarios/${id}`);
  };

  const handleNovoFuncionario = () => {
    navigate('/funcionarios/novo');  // Navega corretamente para a página de novo cadastro
  };

  const handleDeletar = (id: number) => {
    if (!window.confirm('Tem certeza que deseja deletar este funcionário?')) return;

    axios.delete(`http://localhost:8000/api/funcionarios/${id}/`)
      .then(() => {
        setFuncionarios(prev => prev.filter(func => func.id !== id));
        setFilteredFuncionarios(prev => prev.filter(func => func.id !== id));
      })
      .catch(error => {
        console.error('Erro ao deletar funcionário:', error);
      });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Lista de Funcionários</h2>
        <button
          onClick={handleNovoFuncionario}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Novo Funcionário
        </button>
      </div>

      {/* Filtros */}
      <div className="mb-4 flex gap-4">
        <div className="flex items-center gap-2">
          <label className="font-medium">Departamento</label>
          <select
            className="border border-gray-300 rounded p-2"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
          >
            <option value="">Todos</option>
            {departamentos.map(departamento => (
              <option key={departamento} value={departamento}>{departamento}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-medium">Status</label>
          <select
            className="border border-gray-300 rounded p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </div>
      </div>

      {filteredFuncionarios.length === 0 ? (
        <p className="text-center">Nenhum funcionário encontrado.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">Nome</th>
              <th className="py-2 px-4 border-b text-left">Setor</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredFuncionarios.map(func => (
              <tr key={func.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{func.nome_completo}</td>
                <td className="py-2 px-4 border-b">{func.setor}</td>
                <td className="py-2 px-4 border-b">
                  {func.status ? 'Ativo' : 'Inativo'}
                </td>
                <td className="py-2 px-4 border-b space-x-2">
                  <button
                    onClick={() => handleEditar(func.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                  {['SUPER', 'RH_ADMIN'].includes(tipoUsuarioLogado) && (
                    <button
                      onClick={() => handleDeletar(func.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Deletar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Funcionarios;
