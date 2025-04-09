import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FuncionarioForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nome_completo: '',
    data_nascimento: '',
    sexo: '',
    estado_civil: '',
    nacionalidade: '',
    naturalidade: '',
    nome_mae: '',
    nome_pai: '',
    cpf: '',
    rg: '',
    orgao_emissor: '',
    data_emissao: '',
    titulo_eleitor: '',
    zona: '',
    secao: '',
    reservista: '',
    ctps: '',
    serie: '',
    pis: '',
    cnh: '',
    categoria: '',
    validade_cnh: '',
    escolaridade: '',
    curso: '',
    instituicao: '',
    conclusao: '',
    email: '',
    telefone: '',
    celular: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cargo: '',
    setor: '',
    salario: '',
    data_admissao: '',
    data_demissao: '',
    status: true,
    estrangeiro: false,
    beneficiarios: [{ nome: '', data_nascimento: '', parentesco: '' }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const newBeneficiarios = [...formData.beneficiarios];
      newBeneficiarios[index][name] = value;
      setFormData({ ...formData, beneficiarios: newBeneficiarios });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddBeneficiario = () => {
    setFormData({
      ...formData,
      beneficiarios: [...formData.beneficiarios, { nome: '', data_nascimento: '', parentesco: '' }],
    });
  };

  const handleRemoveBeneficiario = (index: number) => {
    const newBeneficiarios = formData.beneficiarios.filter((_, i) => i !== index);
    setFormData({ ...formData, beneficiarios: newBeneficiarios });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const payload = {
      ...formData,
      salario: formData.salario ? parseFloat(formData.salario) : null,
      data_nascimento: formData.data_nascimento || null,
      data_emissao: formData.data_emissao || null,
      validade_cnh: formData.validade_cnh || null,
      data_admissao: formData.data_admissao || null,
      data_demissao: formData.data_demissao || null,
    };

    try {
      await axios.post('http://localhost:8000/api/funcionarios/', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/funcionarios');
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar funcionário');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-2xl mt-8">
      <h2 className="text-2xl font-bold mb-6">Cadastro de Funcionário</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* DADOS DO EMPREGADOR */}
        <h3 className="col-span-full text-xl font-semibold mb-4">DADOS DO EMPREGADOR</h3>
        <div className="flex flex-col">
          <label className="text-sm">Razão Social / Nome</label>
          <input type="text" name="nome_completo" value={formData.nome_completo} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">CNPJ / CEI</label>
          <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Endereço (Logradouro, Número, Andar, Apartamento)</label>
          <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Bairro (Distrito)</label>
          <input type="text" name="bairro" value={formData.bairro} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Município - UF</label>
          <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">CEP</label>
          <input type="text" name="cep" value={formData.cep} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>

        {/* DADOS DO EMPREGADO */}
        <h3 className="col-span-full text-xl font-semibold mt-6 mb-4">DADOS DO EMPREGADO</h3>
        <div className="flex flex-col">
          <label className="text-sm">Nome Completo</label>
          <input type="text" name="nome_completo" value={formData.nome_completo} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Data de Nascimento</label>
          <input type="date" name="data_nascimento" value={formData.data_nascimento} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Sexo</label>
          <select name="sexo" value={formData.sexo} onChange={handleChange} className="border px-3 py-2 rounded">
            <option value="">Selecione</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Estado Civil</label>
          <select name="estado_civil" value={formData.estado_civil} onChange={handleChange} className="border px-3 py-2 rounded">
            <option value="">Selecione</option>
            <option value="solteiro">Solteiro</option>
            <option value="casado">Casado</option>
            <option value="divorciado">Divorciado</option>
            <option value="viuvo">Viúvo</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Nacionalidade</label>
          <input type="text" name="nacionalidade" value={formData.nacionalidade} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Naturalidade (Município e UF)</label>
          <input type="text" name="naturalidade" value={formData.naturalidade} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>

        {/* Identificação */}
        <h3 className="col-span-full text-xl font-semibold mt-6 mb-4">DADOS DE IDENTIFICAÇÃO</h3>
        <div className="flex flex-col">
          <label className="text-sm">RG Número</label>
          <input type="text" name="rg" value={formData.rg} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Órgão Emissor</label>
          <input type="text" name="orgao_emissor" value={formData.orgao_emissor} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Data Emissão</label>
          <input type="date" name="data_emissao" value={formData.data_emissao} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Título de Eleitor</label>
          <input type="text" name="titulo_eleitor" value={formData.titulo_eleitor} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Zona / Seção</label>
          <input type="text" name="zona" value={formData.zona} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Reservista</label>
          <input type="text" name="reservista" value={formData.reservista} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">CTPS Número</label>
          <input type="text" name="ctps" value={formData.ctps} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Série / UF</label>
          <input type="text" name="serie" value={formData.serie} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>

        {/* Departamento e Cargo */}
        <div className="flex flex-col">
          <label className="text-sm">Departamento</label>
          <input
            type="text"
            name="setor"
            value={formData.setor}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            placeholder="Digite o departamento"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm">Cargo</label>
          <input type="text" name="cargo" value={formData.cargo} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>

        {/* Beneficiários */}
        <h3 className="col-span-full text-xl font-semibold mt-6 mb-4">Beneficiários</h3>
        {formData.beneficiarios.map((beneficiario, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="text-sm">Nome</label>
              <input
                type="text"
                name="nome"
                value={beneficiario.nome}
                onChange={(e) => handleChange(e, index)}
                className="border px-3 py-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Data de Nascimento</label>
              <input
                type="date"
                name="data_nascimento"
                value={beneficiario.data_nascimento}
                onChange={(e) => handleChange(e, index)}
                className="border px-3 py-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Parentesco</label>
              <input
                type="text"
                name="parentesco"
                value={beneficiario.parentesco}
                onChange={(e) => handleChange(e, index)}
                className="border px-3 py-2 rounded"
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemoveBeneficiario(index)}
              className="col-span-3 mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Remover Beneficiário
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddBeneficiario}
          className="col-span-full mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Adicionar Beneficiário
        </button>

        {/* Botão Salvar */}
        <div className="col-span-full mt-4">
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Salvar Funcionário
          </button>
        </div>
      </form>
    </div>
  );
};

export default FuncionarioForm;
