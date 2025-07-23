'use client'

import { useState } from 'react';
import SearchBar from '@/components/atoms/SearchBar/Searchbar';
import Box from '@mui/material/Box';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@/components/atoms/Button/Button';
import { ProgressBar } from '@/components/atoms/ProgressBar/ProgressBar';
import Table, {TableColumn} from '@/components/atoms/TableBancario/TableBancario';
import Badge from '@/components/atoms/Badge/Badge';
import ClearModal from '@/components/atoms/ClearModal/ClearModal';
import { 
  applyFieldFormat, 
  validateField, 
  validateEmail, 
  validatePhone, 
  validateCEPFormat, 
  validateCNPJ 
} from '@/utils/Validator';

interface Partner {
  parceiro: string;
  codigo: string;
  email: string;
  telefone: string;
  empresa: string;
  cnpj: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  saldo: string;
  performance: number;
  ultimoAcesso: string;
  statusAtivo: boolean;
}

export default function FranchiseeParceirosPage() {
    const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
    const [partnerModalMode, setPartnerModalMode] = useState<'create' | 'edit' | 'view'>('create');
    const [busca, setBusca] = useState('');
    const [formData, setFormData] = useState({
      nome: '',
      email: '',
      telefone: '',
      empresa: '',
      cnpj: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: ''
    });
    const [formErrors, setFormErrors] = useState({
      nome: '',
      email: '',
      telefone: '',
      empresa: '',
      cnpj: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: ''
    });

  // Estado para controlar o status de bloqueio/desbloqueio de cada parceiro
  const [lockStatus, setLockStatus] = useState<{[key: string]: boolean}>({
    '12345': true, // true = bloqueado (LockOutlinedIcon), false = desbloqueado (LockOpenOutlinedIcon)
    '67890': false, // Parceiro B começa desbloqueado
    '85745': true, // Parceiro C começa bloqueado
  });

  // Estado para armazenar os dados dos parceiros
  const [partnersData, setPartnersData] = useState<Partner[]>([
    {
      parceiro: 'Parceiro A',
      codigo: '12345',
      email: 'parceiro.a@exemplo.com',
      telefone: '(11) 99999-9999',
      empresa: 'Empresa A',
      cnpj: '00.000.000/0000-01',
      endereco: 'Rua A, 123',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01000-000',
      saldo: 'R$ 1.000,00',
      performance: 96,
      ultimoAcesso: '01/10/2023',
      statusAtivo: true
    },
    {
      parceiro: 'Parceiro B',
      codigo: '67890',
      email: 'parceiro.b@exemplo.com',
      telefone: '(11) 88888-8888',
      empresa: 'Empresa B',
      cnpj: '00.000.000/0000-02',
      endereco: 'Rua B, 456',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      cep: '20000-000',
      saldo: 'R$ 500,00',
      performance: 60,
      ultimoAcesso: '15/09/2023',
      statusAtivo: true
    },
    {
      parceiro: 'Parceiro C',
      codigo: '85745',
      email: 'parceiro.c@exemplo.com',
      telefone: '(11) 77777-7777',
      empresa: 'Empresa C',
      cnpj: '00.000.000/0000-03',
      endereco: 'Rua C, 789',
      cidade: 'Belo Horizonte',
      estado: 'MG',
      cep: '30000-000',
      saldo: 'R$ 500,00',
      performance: 15,
      ultimoAcesso: '15/09/2023',
      statusAtivo: false
    }
  ]);

  // Estado para controlar o parceiro sendo editado
  const [editingPartnerCode, setEditingPartnerCode] = useState<string | null>(null);

  // Estado para controlar o modal de confirmação de exclusão
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({
    isOpen: false,
    partnerCode: '',
    partnerName: ''
  });

  // Estado para controlar o modal de visualização de saldo
  const [balanceModal, setBalanceModal] = useState({
    isOpen: false,
    partner: null as Partner | null
  });

  // Função para alternar o status de bloqueio
  const toggleLockStatus = (codigo: string) => {
    setLockStatus(prev => ({
      ...prev,
      [codigo]: !prev[codigo]
    }));
  };

  // Função para gerar código único para novo parceiro
  const generatePartnerCode = () => {
    const timestamp = Date.now().toString();
    return timestamp.slice(-5); // Últimos 5 dígitos do timestamp
  };

  const columns: TableColumn[] = [
    { key: 'parceiro', label: 'Parceiro', align: 'left', colorHeader: 'bg-gray-100', colorTextHeader: 'text-black', colorLine: 'bg-gray-50' },
    { key: 'codigo', label: 'Código', align: 'center', colorHeader: 'bg-gray-100', colorTextHeader: 'text-black' },
    { key: 'status', label: 'Status', align: 'center', colorHeader: 'bg-gray-100', colorTextHeader: 'text-black' },
    { key: 'saldo', label: 'Saldo', align: 'center', colorHeader: 'bg-gray-100', colorTextHeader: 'text-black' },
    { key: 'performance', label: 'Performance', align: 'center', colorHeader: 'bg-gray-100', colorTextHeader: 'text-black' },
    { key: 'ultimoAcesso', label: 'Último Acesso', align: 'center', colorHeader: 'bg-gray-100', colorTextHeader: 'text-black' },
    { key: 'acoes', label: 'Ações', align: 'center', colorHeader: 'bg-gray-100', colorTextHeader: 'text-black' }
  ];

  // Função para transformar dados em formato da tabela
  const transformDataForTable = () => {
    return partnersData.map(partner => ({
      parceiro: partner.parceiro,
      codigo: partner.codigo,
      status: 
        <div>
          <Badge
            variant='status'
            type={partner.statusAtivo ? 'active' : 'inactive'}
            className='text-xs font-semibold'>
            {partner.statusAtivo ? 'Ativo' : 'Inativo'}
          </Badge>
        </div>,
      saldo: partner.saldo,
      performance: <ProgressBar value={partner.performance} max={100} label={`${partner.performance}%`}/>,
      ultimoAcesso: partner.ultimoAcesso,
      acoes: 
        <div className='flex gap-1'>
          <BorderColorOutlinedIcon 
            fontSize='small' 
            className='text-blue-500 cursor-pointer' 
            data-testid="EditIcon" 
            onClick={() => handleEditPartner(partner)} 
          />
          <AttachMoneyRoundedIcon 
            fontSize='small' 
            className='text-green-500 cursor-pointer' 
            data-testid="ViewBalanceIcon" 
            onClick={() => handleViewBalance(partner)} 
          />
          {lockStatus[partner.codigo] ? 
            <LockOutlinedIcon 
              fontSize='small' 
              className='text-gray-500 cursor-pointer' 
              data-testid="LockIcon" 
              onClick={() => toggleLockStatus(partner.codigo)} 
            /> :
            <LockOpenOutlinedIcon 
              fontSize='small' 
              className='text-gray-500 cursor-pointer' 
              data-testid="LockOpenIcon" 
              onClick={() => toggleLockStatus(partner.codigo)} 
            />
          }
          <DeleteForeverOutlinedIcon 
            fontSize='small' 
            className='text-red-500 cursor-pointer' 
            data-testid="DeleteIcon" 
            onClick={() => handleDeletePartner(partner.codigo, partner.parceiro)} 
          />
        </div>
    }));
  };

  const data = transformDataForTable();

  const handleCreatePartner = () => {
    setPartnerModalMode('create');
    setEditingPartnerCode(null);
    setIsPartnerModalOpen(true);
  };

  const handleEditPartner = (partner: Partner) => {
    // Mapear os dados completos do parceiro para o formato do formulário
    setFormData({
      nome: partner.parceiro,
      email: partner.email,
      telefone: partner.telefone,
      empresa: partner.empresa,
      cnpj: partner.cnpj,
      endereco: partner.endereco,
      cidade: partner.cidade,
      estado: partner.estado,
      cep: partner.cep
    });
    setEditingPartnerCode(partner.codigo);
    setPartnerModalMode('edit');
    setIsPartnerModalOpen(true);
  };

  const handleDeletePartner = (codigo: string, nome: string) => {
    setDeleteConfirmModal({
      isOpen: true,
      partnerCode: codigo,
      partnerName: nome
    });
  };

  const handleViewBalance = (partner: Partner) => {
    setBalanceModal({
      isOpen: true,
      partner: partner
    });
  };

  const confirmDeletePartner = () => {
    setPartnersData(prev => 
      prev.filter(partner => partner.codigo !== deleteConfirmModal.partnerCode)
    );
    
    // Remover também do lockStatus
    setLockStatus(prev => {
      const newStatus = { ...prev };
      delete newStatus[deleteConfirmModal.partnerCode];
      return newStatus;
    });

    setDeleteConfirmModal({
      isOpen: false,
      partnerCode: '',
      partnerName: ''
    });
  };

  const handleClosePartnerModal = () => {
    setIsPartnerModalOpen(false);
    setEditingPartnerCode(null);
    // Reset form data when closing
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      empresa: '',
      cnpj: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: ''
    });
    // Reset form errors
    setFormErrors({
      nome: '',
      email: '',
      telefone: '',
      empresa: '',
      cnpj: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: ''
    });
  };
  
  const handleSavePartner = (partnerData: {
    nome: string;
    email: string;
    telefone: string;
    empresa: string;
    cnpj: string;
    endereco: string;
    cidade: string;
    estado: string;
    cep: string;
  }) => {
    if (partnerModalMode === 'create') {
      // Criar novo parceiro
      const newPartnerCode = generatePartnerCode();
      const newPartner = {
        parceiro: partnerData.nome,
        codigo: newPartnerCode,
        email: partnerData.email,
        telefone: partnerData.telefone,
        empresa: partnerData.empresa,
        cnpj: partnerData.cnpj,
        endereco: partnerData.endereco,
        cidade: partnerData.cidade,
        estado: partnerData.estado,
        cep: partnerData.cep,
        saldo: 'R$ 0,00', // Saldo inicial
        performance: 0, // Performance inicial
        ultimoAcesso: new Date().toLocaleDateString('pt-BR'),
        statusAtivo: true // Novo parceiro começa ativo
      };

      setPartnersData(prev => [...prev, newPartner]);
      
      // Adicionar ao lockStatus (inicialmente desbloqueado)
      setLockStatus(prev => ({
        ...prev,
        [newPartnerCode]: false
      }));

      console.log('Novo parceiro criado:', newPartner);
    } else if (partnerModalMode === 'edit' && editingPartnerCode) {
      // Editar parceiro existente
      setPartnersData(prev => 
        prev.map(partner => 
          partner.codigo === editingPartnerCode 
            ? {
                ...partner,
                parceiro: partnerData.nome,
                email: partnerData.email,
                telefone: partnerData.telefone,
                empresa: partnerData.empresa,
                cnpj: partnerData.cnpj,
                endereco: partnerData.endereco,
                cidade: partnerData.cidade,
                estado: partnerData.estado,
                cep: partnerData.cep
              }
            : partner
        )
      );

      console.log('Parceiro editado:', { codigo: editingPartnerCode, ...partnerData });
    }

    handleClosePartnerModal();
  };
  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    let error = '';

    // Aplicar formatação baseada no campo
    switch (field) {
      case 'telefone':
        formattedValue = applyFieldFormat(value, 'phone');
        const phoneValidation = validateField(formattedValue, 'phone');
        error = phoneValidation.message;
        break;
      case 'cep':
        formattedValue = applyFieldFormat(value, 'cep');
        const cepValidation = validateField(formattedValue, 'cep');
        error = cepValidation.message;
        break;
      case 'cnpj':
        formattedValue = applyFieldFormat(value, 'cnpj');
        const cnpjValidation = validateField(formattedValue, 'cnpj');
        error = cnpjValidation.message;
        break;
      case 'email':
        formattedValue = applyFieldFormat(value, 'email');
        const emailValidation = validateField(formattedValue, 'email');
        error = emailValidation.message;
        break;
      case 'nome':
        // Validação simples para nome
        if (!value.trim()) {
          error = 'Nome é obrigatório';
        } else if (value.trim().length < 2) {
          error = 'Nome deve ter pelo menos 2 caracteres';
        }
        break;
      default:
        break;
    }

    // Atualizar dados do formulário
    setFormData(prev => ({
      ...prev,
      [field]: formattedValue
    }));

    // Atualizar erros do formulário
    setFormErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };
  const handleSave = () => {
    // Validar todos os campos obrigatórios antes de salvar
    const requiredFields = ['nome', 'email', 'telefone'];
    let hasErrors = false;
    const newErrors = { ...formErrors };

    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData].trim()) {
        newErrors[field as keyof typeof newErrors] = `${field.charAt(0).toUpperCase() + field.slice(1)} é obrigatório`;
        hasErrors = true;
      }
    });

    // Validar campos específicos se estiverem preenchidos
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
      hasErrors = true;
    }

    if (formData.telefone && !validatePhone(formData.telefone)) {
      newErrors.telefone = 'Telefone inválido';
      hasErrors = true;
    }

    if (formData.cep && !validateCEPFormat(formData.cep)) {
      newErrors.cep = 'CEP inválido';
      hasErrors = true;
    }

    if (formData.cnpj && !validateCNPJ(formData.cnpj)) {
      newErrors.cnpj = 'CNPJ inválido';
      hasErrors = true;
    }

    setFormErrors(newErrors);

    if (hasErrors) {
      return; // Não salvar se houver erros
    }

    if (handleSavePartner) {
      handleSavePartner(formData);
    }
    // Reset form
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      empresa: '',
      cnpj: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: ''
    });
    setFormErrors({
      nome: '',
      email: '',
      telefone: '',
      empresa: '',
      cnpj: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: ''
    });
  };

  const parceirosFiltrados = data.filter((parceiro) => {
    const termoBusca = busca.toLowerCase();
    return (
      parceiro.parceiro.toLowerCase().includes(termoBusca) ||
      parceiro.codigo.toLowerCase().includes(termoBusca)
    );
  });

  return (
    <div className="p-8">
      <div>
        <div className='flex flex-row'>
          <HandshakeRoundedIcon fontSize='large' className="text-primary-500 mr-1 mb-2" />
          <h1 className="font-bold">Parceiros</h1>
        </div>
        <p>Sistema de Gerenciamento de Franqueados</p>
      </div>
      <div>
        <Box sx={{ borderTop: 2, borderColor: "divider", pt: 1, pb: 2, mt: 2 }}> 
          <div>
            <h2>Gestão de parceiros</h2>
          </div>
          <div className='mt-4 flex flex-col md:flex-row items-center gap-4'>
            <div className='w-fit'>
              <SearchBar value={busca} onChange={(value) => setBusca(value)} onClear={() => setBusca('')} placeholder='Buscar parceiro' />        
            </div>
            <Button onClick={handleCreatePartner} variant="primary" color="primary" startIcon={<AddIcon />}>Adicionar parceiro</Button>
          </div>
          <div className='mt-4'>
            {parceirosFiltrados.length > 0 ? (
              <Table columns={columns} data={parceirosFiltrados} />
            ) : busca ? (
              <div className="text-center py-8">
                <div className="text-gray-500 text-lg mb-2">
                  Nenhum parceiro encontrado
                </div>
                <div className="text-gray-400 text-sm">
                  Não foram encontrados parceiros com o termo &quot;{busca}&quot;
                </div>
              </div>
            ) : (
              <Table columns={columns} data={data} />
            )}
          </div>
        </Box>
      </div>

      {/* Modal para cadastro/edição de parceiros */}
      {isPartnerModalOpen && (
        <ClearModal
          title={partnerModalMode === 'create' ? 'Cadastro de Novo Parceiro' : 'Editar Parceiro'}
          onClose={handleClosePartnerModal}
          Children={
            <div>
              {/* Content */}
              <Box sx={{ p: 3 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nome */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome do Parceiro *
                    </label>
                    <input
                      type="text"
                      value={formData.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.nome ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Digite o nome do parceiro"
                      required
                    />
                    {formErrors.nome && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.nome}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="email@exemplo.com"
                      required
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Telefone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.telefone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="(11) 99999-9999"
                      required
                    />
                    {formErrors.telefone && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.telefone}</p>
                    )}
                  </div>

                  {/* Empresa */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Empresa
                    </label>
                    <input
                      type="text"
                      value={formData.empresa}
                      onChange={(e) => handleInputChange('empresa', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nome da empresa"
                    />
                  </div>

                  {/* CNPJ */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CNPJ
                    </label>
                    <input
                      type="text"
                      value={formData.cnpj}
                      onChange={(e) => handleInputChange('cnpj', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.cnpj ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="00.000.000/0000-00"
                    />
                    {formErrors.cnpj && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.cnpj}</p>
                    )}
                  </div>

                  {/* Endereço */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Endereço
                    </label>
                    <input
                      type="text"
                      value={formData.endereco}
                      onChange={(e) => handleInputChange('endereco', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Rua, número, complemento"
                    />
                  </div>

                  {/* Cidade */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cidade
                    </label>
                    <input
                      type="text"
                      value={formData.cidade}
                      onChange={(e) => handleInputChange('cidade', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nome da cidade"
                    />
                  </div>

                  {/* Estado */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estado
                    </label>
                    <select
                      value={formData.estado}
                      onChange={(e) => handleInputChange('estado', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Selecione o estado</option>
                      <option value="AC">Acre</option>
                      <option value="AL">Alagoas</option>
                      <option value="AP">Amapá</option>
                      <option value="AM">Amazonas</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="GO">Goiás</option>
                      <option value="MA">Maranhão</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PA">Pará</option>
                      <option value="PB">Paraíba</option>
                      <option value="PR">Paraná</option>
                      <option value="PE">Pernambuco</option>
                      <option value="PI">Piauí</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="RR">Roraima</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="SP">São Paulo</option>
                      <option value="SE">Sergipe</option>
                      <option value="TO">Tocantins</option>
                    </select>
                  </div>

                  {/* CEP */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CEP
                    </label>
                    <input
                      type="text"
                      value={formData.cep}
                      onChange={(e) => handleInputChange('cep', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.cep ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="00000-000"
                    />
                    {formErrors.cep && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.cep}</p>
                    )}
                  </div>
                </div>

                {/* Custom Children Content */}
                <div className="mt-4">
                  <div className="text-sm text-gray-600">
                    <p>Preencha todos os campos obrigatórios (*) para cadastrar um novo parceiro.</p>
                  </div>
                </div>
              </Box>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                {handleClosePartnerModal && (
                  <Button 
                    variant="outline" 
                    onClick={handleClosePartnerModal}
                    className="px-6 py-2"
                  >
                    Cancelar
                  </Button>
                )}
                <Button 
                  variant="primary" 
                  onClick={handleSave}
                  className="px-6 py-2"
                >
                  {partnerModalMode === 'create' ? 'Salvar Parceiro' : 'Salvar Alterações'}
                </Button>
              </div>
            </div>
          }
        />
      )}

      {/* Modal de confirmação de exclusão */}
      {deleteConfirmModal.isOpen && (
        <ClearModal
          title="Confirmar Exclusão"
          onClose={() => setDeleteConfirmModal({ isOpen: false, partnerCode: '', partnerName: '' })}
          Children={
            <div>
              {/* Content */}
              <Box sx={{ p: 3 }}>
                <div className="text-center">
                  <DeleteForeverOutlinedIcon 
                    fontSize="large" 
                    className="text-red-500 mx-auto mb-4" 
                  />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Tem certeza que deseja excluir este parceiro?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    O parceiro <strong>{deleteConfirmModal.partnerName}</strong> (Código: {deleteConfirmModal.partnerCode}) será removido permanentemente.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">
                      ⚠️ Esta ação não pode ser desfeita. Todos os dados relacionados a este parceiro serão perdidos.
                    </p>
                  </div>
                </div>
              </Box>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  onClick={() => setDeleteConfirmModal({ isOpen: false, partnerCode: '', partnerName: '' })}
                  className="px-6 py-2"
                >
                  Cancelar
                </Button>
                <Button 
                  variant="primary" 
                  onClick={confirmDeletePartner}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white"
                >
                  Sim, Excluir
                </Button>
              </div>
            </div>
          }
        />
      )}

      {/* Modal de visualização de saldo */}
      {balanceModal.isOpen && balanceModal.partner && (
        <ClearModal
          title="Saldo do Parceiro"
          onClose={() => setBalanceModal({ isOpen: false, partner: null })}
          Children={
            <div>
              {/* Content */}
              <Box sx={{ p: 3 }}>
                <div className="text-center">
                  <AttachMoneyRoundedIcon 
                    fontSize="large" 
                    className="text-green-500 mx-auto mb-4" 
                  />
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {balanceModal.partner.parceiro}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Código: {balanceModal.partner.codigo}
                    </p>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
                    <p className="text-sm text-green-800 mb-2">Saldo Atual</p>
                    <p className="text-3xl font-bold text-green-600">
                      {balanceModal.partner.saldo}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-600 mb-1">Performance</p>
                      <p className="font-semibold text-gray-900">
                        {balanceModal.partner.performance}%
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-600 mb-1">Último Acesso</p>
                      <p className="font-semibold text-gray-900">
                        {balanceModal.partner.ultimoAcesso}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-600 mb-1">Status</p>
                      <p className={`font-semibold ${balanceModal.partner.statusAtivo ? 'text-green-600' : 'text-red-600'}`}>
                        {balanceModal.partner.statusAtivo ? 'Ativo' : 'Inativo'}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-600 mb-1">Empresa</p>
                      <p className="font-semibold text-gray-900">
                        {balanceModal.partner.empresa || 'Não informado'}
                      </p>
                    </div>
                  </div>
                </div>
              </Box>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                <Button 
                  variant="primary" 
                  onClick={() => setBalanceModal({ isOpen: false, partner: null })}
                  className="px-6 py-2"
                >
                  Fechar
                </Button>
              </div>
            </div>
          }
        />
      )}
    </div>
  )
}
