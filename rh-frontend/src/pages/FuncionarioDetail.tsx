import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FuncionarioDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID do funcionário da URL
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
    beneficiarios: [{ nome: '', data_nascimento: '', parentesco: '' }], // Aqui estão os beneficiários
  });

  useEffect(() => {
    const fetchFuncionario = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/api/funcionarios/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData(response.data); // Preenche os campos com os dados do funcionário
      } catch (error) {
        console.error(error);
        alert('Erro ao carregar os dados do funcionário');
      }
    };

    if (id) {
      fetchFuncionario();
    }
  }, [id]);

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

    try {
      const payload = {
        ...formData,
        salario: formData.salario === '' ? null : parseFloat(formData.salario),
        data_nascimento: formData.data_nascimento || null,
        data_emissao: formData.data_emissao || null,
        validade_cnh: formData.validade_cnh || null,
        data_admissao: formData.data_admissao || null,
        data_demissao: formData.data_demissao || null,
      };

      await axios.put(`http://localhost:8000/api/funcionarios/${id}/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate('/funcionarios');
    } catch (error) {
      console.error(error);
      alert('Erro ao editar funcionário');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-2xl mt-8">
      <h2 className="text-2xl font-bold mb-6">Editar Funcionário</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* DADOS PESSOAIS */}
        <h3 className="col-span-full text-xl font-semibold mb-4">DADOS PESSOAIS</h3>
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
          <input type="text" name="sexo" value={formData.sexo} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Estado Civil</label>
          <input type="text" name="estado_civil" value={formData.estado_civil} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>

        {/* DADOS DE DOCUMENTOS */}
        <h3 className="col-span-full text-xl font-semibold mt-6 mb-4">DADOS DE DOCUMENTOS</h3>
        <div className="flex flex-col">
          <label className="text-sm">CPF</label>
          <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">RG</label>
          <input type="text" name="rg" value={formData.rg} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Órgão Emissor</label>
          <input type="text" name="orgao_emissor" value={formData.orgao_emissor} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>

        {/* DADOS DE CONTATO */}
        <h3 className="col-span-full text-xl font-semibold mt-6 mb-4">DADOS DE CONTATO</h3>
        <div className="flex flex-col">
          <label className="text-sm">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Telefone</label>
          <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Celular</label>
          <input type="text" name="celular" value={formData.celular} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>

        {/* ENDEREÇO */}
        <h3 className="col-span-full text-xl font-semibold mt-6 mb-4">ENDEREÇO</h3>
        <div className="flex flex-col">
          <label className="text-sm">CEP</label>
          <input type="text" name="cep" value={formData.cep} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Endereço</label>
          <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>

        {/* CARGO E DADOS DE EMPREGO */}
        <h3 className="col-span-full text-xl font-semibold mt-6 mb-4">CARGO E DADOS DE EMPREGO</h3>
        <div className="flex flex-col">
          <label className="text-sm">Cargo</label>
          <input type="text" name="cargo" value={formData.cargo} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Setor</label>
          <input type="text" name="setor" value={formData.setor} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>

        {/* BENEFICIÁRIOS */}
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
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
};

export default FuncionarioDetail;
