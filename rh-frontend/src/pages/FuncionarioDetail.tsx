import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FuncionarioDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    // Dados Pessoais
    nome_completo: '',
    data_nascimento: '',
    sexo: '',
    estado_civil: '',
    nacionalidade: '',
    naturalidade: '',
    nome_mae: '',
    nome_pai: '',
    
    // Documentos
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
    ctps_uf: '',
    ctps_data_emissao: '',
    pis: '',
    pis_numero: '',
    pis_data_cadastro: '',
    cnh: '',
    categoria: '',
    validade_cnh: '',
    
    // Contato
    email: '',
    telefone: '',
    celular: '',
    
    // Endereço
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    
    // Trabalhista
    cargo: '',
    setor: '',
    salario: '',
    data_admissao: '',
    data_demissao: '',
    horas_mes: '',
    tipo_pagamento: '',
    cbo_numero: '',
    departamento: '',
    grau_instrucao: '',
    adicional_periculosidade: '',
    adicional_insalubridade: '',
    
    // FGTS
    fgts_data_opcao: '',
    fgts_banco: 'Caixa Econômica Federal',
    
    // PIS
    pis_banco: 'Caixa Econômica Federal',
    pis_agencia: '',
    
    // Status
    status: true,
    estrangeiro: false,
    
    // Beneficiários
    beneficiarios: [{ nome: '', data_nascimento: '', parentesco: '' }]
  });

  useEffect(() => {
    const fetchFuncionario = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/api/funcionarios/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Sanitiza os dados para evitar valores nulos/undefined
        const data = response.data;
        const sanitizedData = {
          nome_completo: data.nome_completo || '',
          data_nascimento: data.data_nascimento || '',
          sexo: data.sexo || '',
          estado_civil: data.estado_civil || '',
          nacionalidade: data.nacionalidade || '',
          naturalidade: data.naturalidade || '',
          nome_mae: data.nome_mae || '',
          nome_pai: data.nome_pai || '',
          cpf: data.cpf || '',
          rg: data.rg || '',
          orgao_emissor: data.orgao_emissor || '',
          data_emissao: data.data_emissao || '',
          titulo_eleitor: data.titulo_eleitor || '',
          zona: data.zona || '',
          secao: data.secao || '',
          reservista: data.reservista || '',
          ctps: data.ctps || '',
          serie: data.serie || '',
          ctps_uf: data.ctps_uf || '',
          ctps_data_emissao: data.ctps_data_emissao || '',
          pis: data.pis || '',
          pis_numero: data.pis_numero || '',
          pis_data_cadastro: data.pis_data_cadastro || '',
          cnh: data.cnh || '',
          categoria: data.categoria || '',
          validade_cnh: data.validade_cnh || '',
          email: data.email || '',
          telefone: data.telefone || '',
          celular: data.celular || '',
          cep: data.cep || '',
          endereco: data.endereco || '',
          numero: data.numero || '',
          complemento: data.complemento || '',
          bairro: data.bairro || '',
          cidade: data.cidade || '',
          estado: data.estado || '',
          cargo: data.cargo || '',
          setor: data.setor || '',
          salario: data.salario || '',
          data_admissao: data.data_admissao || '',
          data_demissao: data.data_demissao || '',
          horas_mes: data.horas_mes || '',
          tipo_pagamento: data.tipo_pagamento || '',
          cbo_numero: data.cbo_numero || '',
          departamento: data.departamento || '',
          grau_instrucao: data.grau_instrucao || '',
          adicional_periculosidade: data.adicional_periculosidade || '',
          adicional_insalubridade: data.adicional_insalubridade || '',
          fgts_data_opcao: data.fgts_data_opcao || '',
          fgts_banco: data.fgts_banco || 'Caixa Econômica Federal',
          pis_banco: data.pis_banco || 'Caixa Econômica Federal',
          pis_agencia: data.pis_agencia || '',
          status: data.status !== undefined ? data.status : true,
          estrangeiro: data.estrangeiro || false,
          beneficiarios: data.beneficiarios?.length ? data.beneficiarios.map((b: any) => ({
            nome: b.nome || '',
            data_nascimento: b.data_nascimento || '',
            parentesco: b.parentesco || ''
          })) : [{ nome: '', data_nascimento: '', parentesco: '' }]
        };

        setFormData(sanitizedData);
      } catch (error) {
        console.error(error);
        alert('Erro ao carregar funcionário');
      }
    };

    if (id) fetchFuncionario();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
    const { name, value } = e.target;
    
    if (index !== undefined) {
      const newBeneficiarios = [...formData.beneficiarios];
      newBeneficiarios[index] = { ...newBeneficiarios[index], [name]: value };
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
        // Conversões numéricas
        salario: formData.salario ? parseFloat(formData.salario) : null,
        horas_mes: formData.horas_mes ? parseInt(formData.horas_mes) : null,
        adicional_periculosidade: formData.adicional_periculosidade ? parseFloat(formData.adicional_periculosidade) : null,
        adicional_insalubridade: formData.adicional_insalubridade ? parseFloat(formData.adicional_insalubridade) : null,
        // Campos que podem ser nulos
        data_nascimento: formData.data_nascimento || null,
        data_emissao: formData.data_emissao || null,
        ctps_data_emissao: formData.ctps_data_emissao || null,
        pis_data_cadastro: formData.pis_data_cadastro || null,
        validade_cnh: formData.validade_cnh || null,
        data_admissao: formData.data_admissao || null,
        data_demissao: formData.data_demissao || null,
        fgts_data_opcao: formData.fgts_data_opcao || null
      };

      await axios.put(`http://localhost:8000/api/funcionarios/${id}/`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/funcionarios');
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar funcionário');
    }
  };

  // Helper para garantir valores não nulos nos inputs
  const getValue = (value: any) => value || '';

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-2xl mt-8">
      <h2 className="text-2xl font-bold mb-6">Editar Funcionário</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* DADOS PESSOAIS */}
        <h3 className="col-span-full text-xl font-semibold mb-4">DADOS PESSOAIS</h3>
        <div className="flex flex-col">
          <label className="text-sm">Nome Completo*</label>
          <input
            type="text"
            name="nome_completo"
            value={getValue(formData.nome_completo)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Data Nascimento</label>
          <input
            type="date"
            name="data_nascimento"
            value={getValue(formData.data_nascimento)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Sexo</label>
          <input
            type="text"
            name="sexo"
            value={getValue(formData.sexo)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Estado Civil</label>
          <input
            type="text"
            name="estado_civil"
            value={getValue(formData.estado_civil)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Nacionalidade</label>
          <input
            type="text"
            name="nacionalidade"
            value={getValue(formData.nacionalidade)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Naturalidade</label>
          <input
            type="text"
            name="naturalidade"
            value={getValue(formData.naturalidade)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Nome da Mãe</label>
          <input
            type="text"
            name="nome_mae"
            value={getValue(formData.nome_mae)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Nome do Pai</label>
          <input
            type="text"
            name="nome_pai"
            value={getValue(formData.nome_pai)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>

        {/* DOCUMENTOS */}
        <h3 className="col-span-full text-xl font-semibold mt-6 mb-4">DOCUMENTOS</h3>
        <div className="flex flex-col">
          <label className="text-sm">CPF</label>
          <input
            type="text"
            name="cpf"
            value={getValue(formData.cpf)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">RG</label>
          <input
            type="text"
            name="rg"
            value={getValue(formData.rg)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Órgão Emissor</label>
          <input
            type="text"
            name="orgao_emissor"
            value={getValue(formData.orgao_emissor)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Data Emissão</label>
          <input
            type="date"
            name="data_emissao"
            value={getValue(formData.data_emissao)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Título Eleitor</label>
          <input
            type="text"
            name="titulo_eleitor"
            value={getValue(formData.titulo_eleitor)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Zona</label>
          <input
            type="text"
            name="zona"
            value={getValue(formData.zona)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Seção</label>
          <input
            type="text"
            name="secao"
            value={getValue(formData.secao)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Reservista</label>
          <input
            type="text"
            name="reservista"
            value={getValue(formData.reservista)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">CTPS Número</label>
          <input
            type="text"
            name="ctps"
            value={getValue(formData.ctps)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">CTPS Série</label>
          <input
            type="text"
            name="serie"
            value={getValue(formData.serie)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">CTPS UF</label>
          <input
            type="text"
            name="ctps_uf"
            value={getValue(formData.ctps_uf)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">CTPS Data Emissão</label>
          <input
            type="date"
            name="ctps_data_emissao"
            value={getValue(formData.ctps_data_emissao)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">PIS/NIS</label>
          <input
            type="text"
            name="pis"
            value={getValue(formData.pis)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">PIS Número</label>
          <input
            type="text"
            name="pis_numero"
            value={getValue(formData.pis_numero)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">PIS Data Cadastro</label>
          <input
            type="date"
            name="pis_data_cadastro"
            value={getValue(formData.pis_data_cadastro)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">CNH Número</label>
          <input
            type="text"
            name="cnh"
            value={getValue(formData.cnh)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">CNH Categoria</label>
          <input
            type="text"
            name="categoria"
            value={getValue(formData.categoria)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">CNH Validade</label>
          <input
            type="date"
            name="validade_cnh"
            value={getValue(formData.validade_cnh)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>

        {/* CONTATO */}
        <h3 className="col-span-full text-xl font-semibold mt-6 mb-4">CONTATO</h3>
        <div className="flex flex-col">
          <label className="text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={getValue(formData.email)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Telefone</label>
          <input
            type="text"
            name="telefone"
            value={getValue(formData.telefone)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Celular</label>
          <input
            type="text"
            name="celular"
            value={getValue(formData.celular)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>

        {/* ENDEREÇO */}
        <h3 className="col-span-full text-xl font-semibold mt-6 mb-4">ENDEREÇO</h3>
        <div className="flex flex-col">
          <label className="text-sm">CEP</label>
          <input
            type="text"
            name="cep"
            value={getValue(formData.cep)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Endereço</label>
          <input
            type="text"
            name="endereco"
            value={getValue(formData.endereco)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Número</label>
          <input
            type="text"
            name="numero"
            value={getValue(formData.numero)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Complemento</label>
          <input
            type="text"
            name="complemento"
            value={getValue(formData.complemento)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Bairro</label>
          <input
            type="text"
            name="bairro"
            value={getValue(formData.bairro)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Cidade</label>
          <input
            type="text"
            name="cidade"
            value={getValue(formData.cidade)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Estado</label>
          <input
            type="text"
            name="estado"
            value={getValue(formData.estado)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>

        {/* DADOS TRABALHISTAS */}
        <h3 className="col-span-full text-xl font-semibold mt-6 mb-4">DADOS TRABALHISTAS</h3>
        <div className="flex flex-col">
          <label className="text-sm">Cargo</label>
          <input
            type="text"
            name="cargo"
            value={getValue(formData.cargo)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Setor*</label>
          <input
            type="text"
            name="setor"
            value={getValue(formData.setor)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Salário</label>
          <input
            type="text"
            name="salario"
            value={getValue(formData.salario)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Data Admissão</label>
          <input
            type="date"
            name="data_admissao"
            value={getValue(formData.data_admissao)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Data Demissão</label>
          <input
            type="date"
            name="data_demissao"
            value={getValue(formData.data_demissao)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Horas/Mês</label>
          <input
            type="text"
            name="horas_mes"
            value={getValue(formData.horas_mes)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Tipo Pagamento</label>
          <input
            type="text"
            name="tipo_pagamento"
            value={getValue(formData.tipo_pagamento)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">CBO</label>
          <input
            type="text"
            name="cbo_numero"
            value={getValue(formData.cbo_numero)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Departamento</label>
          <input
            type="text"
            name="departamento"
            value={getValue(formData.departamento)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Grau Instrução</label>
          <input
            type="text"
            name="grau_instrucao"
            value={getValue(formData.grau_instrucao)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Adicional Periculosidade (%)</label>
          <input
            type="text"
            name="adicional_periculosidade"
            value={getValue(formData.adicional_periculosidade)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Adicional Insalubridade (%)</label>
          <input
            type="text"
            name="adicional_insalubridade"
            value={getValue(formData.adicional_insalubridade)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>

        {/* FGTS */}
        <h3 className="col-span-full text-xl font-semibold mt-6 mb-4">FGTS</h3>
        <div className="flex flex-col">
          <label className="text-sm">Data Opção</label>
          <input
            type="date"
            name="fgts_data_opcao"
            value={getValue(formData.fgts_data_opcao)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Banco</label>
          <input
            type="text"
            name="fgts_banco"
            value={getValue(formData.fgts_banco)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>

        {/* PIS */}
        <h3 className="col-span-full text-xl font-semibold mt-6 mb-4">PIS</h3>
        <div className="flex flex-col">
          <label className="text-sm">Banco</label>
          <input
            type="text"
            name="pis_banco"
            value={getValue(formData.pis_banco)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Agência</label>
          <input
            type="text"
            name="pis_agencia"
            value={getValue(formData.pis_agencia)}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>

        {/* BENEFICIÁRIOS */}
        <h3 className="col-span-full text-xl font-semibold mt-6 mb-4">BENEFICIÁRIOS</h3>
        {formData.beneficiarios.map((beneficiario, index) => (
          <div key={index} className="col-span-full grid grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="text-sm">Nome</label>
              <input
                type="text"
                name="nome"
                value={getValue(beneficiario.nome)}
                onChange={(e) => handleChange(e, index)}
                className="border px-3 py-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Data Nascimento</label>
              <input
                type="date"
                name="data_nascimento"
                value={getValue(beneficiario.data_nascimento)}
                onChange={(e) => handleChange(e, index)}
                className="border px-3 py-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Parentesco</label>
              <input
                type="text"
                name="parentesco"
                value={getValue(beneficiario.parentesco)}
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

        {/* BOTÃO SALVAR */}
        <div className="col-span-full mt-8">
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold">
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
};

export default FuncionarioDetail;