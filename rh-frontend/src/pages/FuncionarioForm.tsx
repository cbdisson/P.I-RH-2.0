import { useState } from 'react';
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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: val });
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
        {Object.keys(formData).map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-sm capitalize">{field.replace(/_/g, ' ')}</label>
            <input
              type={
                field.includes('data') ? 'date' :
                field === 'salario' ? 'number' :
                typeof formData[field as keyof typeof formData] === 'boolean' ? 'checkbox' :
                'text'
              }
              name={field}
              value={
                typeof formData[field as keyof typeof formData] === 'boolean'
                  ? undefined
                  : formData[field as keyof typeof formData]
              }
              checked={
                typeof formData[field as keyof typeof formData] === 'boolean'
                  ? formData[field as keyof typeof formData] as boolean
                  : undefined
              }
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            />
          </div>
        ))}

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
