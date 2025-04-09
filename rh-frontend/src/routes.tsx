import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Funcionarios from './pages/Funcionarios';
import FuncionarioForm from './pages/FuncionarioForm'; 
import FuncionarioDetail from './pages/FuncionarioDetail'; 

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota principal */}
        <Route path="/" element={isAuthenticated() ? <Navigate to="/funcionarios" /> : <Login />} />

        {/* Rota para a página de login */}
        <Route path="/login" element={<Login />} />

        {/* Rota para a lista de funcionários */}
        <Route path="/funcionarios" element={isAuthenticated() ? <Funcionarios /> : <Navigate to="/login" />} />

        {/* Rota para cadastro de novo funcionário */}
        <Route path="/funcionarios/novo" element={isAuthenticated() ? <FuncionarioForm /> : <Navigate to="/login" />} />

        {/* Rota para editar um funcionário específico */}
        <Route path="/funcionarios/:id" element={isAuthenticated() ? <FuncionarioDetail /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
