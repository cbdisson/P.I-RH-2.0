import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FuncionarioForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    // Dados do Empregador (opcional, pode remover se não for necessário)
    razao_social: '',
    cnpj_cei: '',
    endereco_empregador: '',
    bairro_empregador: '',
    municipio_empregador: '',
    uf_empregador: '',
    cep_empregador: '',

    // Dados do Empregado
    nome_completo: '',
    data_nascimento: '',
    municipio_nascimento: '',
    uf_nascimento: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    municipio: '',
    uf: '',
    cep: '',
    nome_mae: '',
    nome_pai: '',
    nacionalidade: '',
    estado_civil: '',
    rg_numero: '',
    rg_data_emissao: '',
    rg_orgao_emissor: '',
    cpf: '',
    ctps_numero: '',
    ctps_serie: '',
    ctps_uf: '',
    ctps_data_emissao: '',
    titulo_eleitor: '',
    titulo_zona: '',
    titulo_secao: '',
    cnh_numero: '',
    cnh_categoria: '',
    documento_militar: '',
    cbo_numero: '',
    cargo: '',
    data_admissao: '',
    salario: '',
    tipo_pagamento: '',
    horas_mes: '',
    departamento: '',
    grau_instrucao: '',
    adicional_periculosidade: '',
    adicional_insalubridade: '',
    telefone: '',
    fgts_data_opcao: '',
    fgts_banco: '',
    pis_numero: '',
    pis_data_cadastro: '',
    pis_banco: '',
    pis_agencia: '',
    estrangeiro: false,
    rne: '',
    casado_brasileiro: '',
    nome_conjuge: '',
    data_chegada_brasil: '',
    filhos_brasileiros: '',
    naturalizado: false,
    decreto_naturalizacao: '',
    visto_numero: '',
    visto_vencimento: '',

    // Horário de Trabalho
    horario_seg: '',
    horario_ter: '',
    horario_qua: '',
    horario_qui: '',
    horario_sex: '',
    horario_sab: '',
    horario_dom: '',

    // Rescisão (opcional)
    data_saida: '',
    tipo_desligamento: '',
    homologacao_numero: '',
    homologacao_local: '',

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
    
    try {
      await axios.post('http://localhost:8000/api/funcionarios/', formData, {
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
        {/* DADOS DO EMPREGADOR (opcional) */}
        <h3 className="col-span-full text-xl font-semibold mb-4">DADOS DO EMPREGADOR</h3>
        <div className="flex flex-col">
          <label className="text-sm">Razão Social / Nome</label>
          <input type="text" name="razao_social" value={formData.razao_social} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">CNPJ / CEI</label>
          <input type="text" name="cnpj_cei" value={formData.cnpj_cei} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Endereço</label>
          <input type="text" name="endereco_empregador" value={formData.endereco_empregador} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Bairro</label>
          <input type="text" name="bairro_empregador" value={formData.bairro_empregador} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Município - UF</label>
          <input type="text" name="municipio_empregador" value={formData.municipio_empregador} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">CEP</label>
          <input type="text" name="cep_empregador" value={formData.cep_empregador} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>

        {/* DADOS DO EMPREGADO */}
        <h3 className="col-span-full text-xl font-semibold mt-6 mb-4">DADOS DO EMPREGADO</h3>
        <div className="flex flex-col">
          <label className="text-sm">Nome Completo*</label>
          <input 
            type="text" 
            name="nome_completo" 
            value={formData.nome_completo} 
            onChange={handleChange} 
            className="border px-3 py-2 rounded" 
            required 
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Data Nascimento</label>
          <input type="date" name="data_nascimento" value={formData.data_nascimento} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Município Nascimento - UF</label>
          <input type="text" name="municipio_nascimento" value={formData.municipio_nascimento} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Endereço (Logradouro, Número)</label>
          <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Complemento</label>
          <input type="text" name="complemento" value={formData.complemento} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Bairro</label>
          <input type="text" name="bairro" value={formData.bairro} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Município - UF</label>
          <input type="text" name="municipio" value={formData.municipio} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">CEP</label>
          <input type="text" name="cep" value={formData.cep} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Nome da Mãe</label>
          <input type="text" name="nome_mae" value={formData.nome_mae} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Nome do Pai</label>
          <input type="text" name="nome_pai" value={formData.nome_pai} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>

        {/* DOCUMENTOS */}
        <h3 className="col-span-full text-xl font-semibold mt-6 mb-4">DOCUMENTOS</h3>
        <div className="flex flex-col">
          <label className="text-sm">Nacionalidade</label>
          <input type="text" name="nacionalidade" value={formData.nacionalidade} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Estado Civil</label>
          <input type="text" name="estado_civil" value={formData.estado_civil} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">RG Número</label>
          <input type="text" name="rg_numero" value={formData.rg_numero} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">RG Data Emissão</label>
          <input type="date" name="rg_data_emissao" value={formData.rg_data_emissao} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">RG Órgão Emissor</label>
          <input type="text" name="rg_orgao_emissor" value={formData.rg_orgao_emissor} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">CPF</label>
          <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">CTPS Número</label>
          <input type="text" name="ctps_numero" value={formData.ctps_numero} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">CTPS Série / UF</label>
          <input type="text" name="ctps_serie" value={formData.ctps_serie} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">CTPS Data Emissão</label>
          <input type="date" name="ctps_data_emissao" value={formData.ctps_data_emissao} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Título Eleitor</label>
          <input type="text" name="titulo_eleitor" value={formData.titulo_eleitor} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Zona / Seção</label>
          <input type="text" name="titulo_zona" value={formData.titulo_zona} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">CNH Número</label>
          <input type="text" name="cnh_numero" value={formData.cnh_numero} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">CNH Categoria</label>
          <input type="text" name="cnh_categoria" value={formData.cnh_categoria} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Documento Militar</label>
          <input type="text" name="documento_militar" value={formData.documento_militar} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>

        {/* DADOS TRABALHISTAS */}
        <h3 className="col-span-full text-xl font-semibold mt-6 mb-4">DADOS TRABALHISTAS</h3>
        <div className="flex flex-col">
          <label className="text-sm">CBO Número</label>
          <input type="text" name="cbo_numero" value={formData.cbo_numero} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Cargo / Função</label>
          <input type="text" name="cargo" value={formData.cargo} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Data Admissão</label>
          <input type="date" name="data_admissao" value={formData.data_admissao} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Salário</label>
          <input type="text" name="salario" value={formData.salario} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Tipo de Pagamento</label>
          <input type="text" name="tipo_pagamento" value={formData.tipo_pagamento} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Horas/Mês</label>
          <input type="text" name="horas_mes" value={formData.horas_mes} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Departamento</label>
          <input type="text" name="departamento" value={formData.departamento} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Grau Instrução</label>
          <input type="text" name="grau_instrucao" value={formData.grau_instrucao} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Adicional Periculosidade (%)</label>
          <input type="text" name="adicional_periculosidade" value={formData.adicional_periculosidade} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Adicional Insalubridade (%)</label>
          <input type="text" name="adicional_insalubridade" value={formData.adicional_insalubridade} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Telefone</label>
          <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>

        {/* FGTS */}
        <h3 className="col-span-full text-xl font-semibold mt-6 mb-4">FGTS</h3>
        <div className="flex flex-col">
          <label className="text-sm">Data da Opção</label>
          <input type="date" name="fgts_data_opcao" value={formData.fgts_data_opcao} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Banco Depositário</label>
          <input type="text" name="fgts_banco" value={formData.fgts_banco} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>

        {/* HORÁRIO DE TRABALHO */}
        <h3 className="col-span-full text-xl font-semibold mt-6 mb-4">HORÁRIO DE TRABALHO</h3>
        <div className="flex flex-col">
          <label className="text-sm">Segunda-feira</label>
          <input type="text" name="horario_seg" value={formData.horario_seg} onChange={handleChange} className="border px-3 py-2 rounded" placeholder="Ex: 08:00-12:00 13:00-17:00" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Terça-feira</label>
          <input type="text" name="horario_ter" value={formData.horario_ter} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Quarta-feira</label>
          <input type="text" name="horario_qua" value={formData.horario_qua} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Quinta-feira</label>
          <input type="text" name="horario_qui" value={formData.horario_qui} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Sexta-feira</label>
          <input type="text" name="horario_sex" value={formData.horario_sex} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Sábado</label>
          <input type="text" name="horario_sab" value={formData.horario_sab} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Domingo</label>
          <input type="text" name="horario_dom" value={formData.horario_dom} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>

        {/* PIS */}
        <h3 className="col-span-full text-xl font-semibold mt-6 mb-4">PIS</h3>
        <div className="flex flex-col">
          <label className="text-sm">PIS Número</label>
          <input type="text" name="pis_numero" value={formData.pis_numero} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Cadastrado em</label>
          <input type="date" name="pis_data_cadastro" value={formData.pis_data_cadastro} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Banco</label>
          <input type="text" name="pis_banco" value={formData.pis_banco} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Agência</label>
          <input type="text" name="pis_agencia" value={formData.pis_agencia} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>

        {/* ESTRANGEIRO */}
        <h3 className="col-span-full text-xl font-semibold mt-6 mb-4">ESTRANGEIRO</h3>
        <div className="flex flex-col">
          <label className="text-sm">RNE</label>
          <input type="text" name="rne" value={formData.rne} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Casado com Brasileiro?</label>
          <input type="text" name="casado_brasileiro" value={formData.casado_brasileiro} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Nome do Cônjuge</label>
          <input type="text" name="nome_conjuge" value={formData.nome_conjuge} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Data Chegada ao Brasil</label>
          <input type="date" name="data_chegada_brasil" value={formData.data_chegada_brasil} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Número de Filhos Brasileiros</label>
          <input type="text" name="filhos_brasileiros" value={formData.filhos_brasileiros} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Naturalizado</label>
          <input type="checkbox" name="naturalizado" checked={formData.naturalizado} onChange={() => setFormData({...formData, naturalizado: !formData.naturalizado})} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Decreto Naturalização</label>
          <input type="text" name="decreto_naturalizacao" value={formData.decreto_naturalizacao} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Visto Número</label>
          <input type="text" name="visto_numero" value={formData.visto_numero} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Visto Vencimento</label>
          <input type="date" name="visto_vencimento" value={formData.visto_vencimento} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>

        {/* RESCISÃO (opcional) */}
        <h3 className="col-span-full text-xl font-semibold mt-6 mb-4">RESCISÃO (opcional)</h3>
        <div className="flex flex-col">
          <label className="text-sm">Data Saída</label>
          <input type="date" name="data_saida" value={formData.data_saida} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Tipo Desligamento</label>
          <input type="text" name="tipo_desligamento" value={formData.tipo_desligamento} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Homologação Número</label>
          <input type="text" name="homologacao_numero" value={formData.homologacao_numero} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Local Homologação</label>
          <input type="text" name="homologacao_local" value={formData.homologacao_local} onChange={handleChange} className="border px-3 py-2 rounded" />
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
                value={beneficiario.nome}
                onChange={(e) => handleChange(e, index)}
                className="border px-3 py-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Data Nascimento</label>
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

        {/* BOTÃO SALVAR */}
        <div className="col-span-full mt-8">
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold">
            Salvar Funcionário
          </button>
        </div>
      </form>
    </div>
  );
};

export default FuncionarioForm;