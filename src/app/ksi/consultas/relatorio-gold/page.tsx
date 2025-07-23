'use client'

import { useState } from "react";
import { RatingProvider } from "@/contexts/RatingContext/RatingContext";
import DescriptionIcon from "@mui/icons-material/Description";
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import WalletIcon from '@mui/icons-material/Wallet';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import ApprovalIcon from '@mui/icons-material/Approval';
import GavelIcon from '@mui/icons-material/Gavel';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PlaceIcon from '@mui/icons-material/Place';
import ContactsIcon from '@mui/icons-material/Contacts';
import { ResultadosTemplate } from "@/components/template/ResultadosTemplate/ResultadosTemplate";
import { FormularioConsulta } from "@/components/molecules/FormConsulta/FormConsulta";
import CardDescription from "@/components/molecules/CardDescription/CardDescription";
import CardOptionalData from "@/components/molecules/CardOptionalData/CardOptionalData";
import CopyRight from "@/components/atoms/CopyRight/CopyRight";
import { validateDocument } from "@/utils/Validator";
import Resumo from "@/components/molecules/ResumoSCRBancoCentral/ResumoSCRBancoCentral";
import Table, { TableColumn } from "@/components/atoms/TableBancario/TableBancario";
import SectionSCRBacen from "@/components/molecules/SectionConsultasBancarias/SectionConsultasBancarias";
import type { DashboardCard as DashboardCardType } from "@/data/dashboard"
import { CardsData } from "@/components/molecules/CardsData/CardsData";
import ContainerTable from "@/components/molecules/ContainerTable/ContainerTable";
import { AnaliseIA } from "@/components/atoms/AnaliseIA/AnaliseIA";
import Medidores from "@/components/molecules/MedidoresPontScore/MedidoresPontScore";

export default function RelatorioGoldPage() {
  const [personType, setPersonType] = useState("fisica")
  const [document, setDocument] = useState("")
  const [newConsultation, setNewConsultation] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [opcionalSelected, setOpcionalSelected] = useState<string[]>([])

  const handleNovaConsulta = () => {
    setShowResults(false);
    setDocument("");
    setNewConsultation(true);
  }

  const handleConsultar = () => {
    if (document.trim() && validateDocument(document)) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setShowResults(true)
      }, 1500)
    }
  }

  const itensDescription = [
    {item: "KSI Premium."},
    {item: "Faturamento anual presumido PJ."},
    {item: "Renda mensal presumida PF."},
    {item: "Capacidade mensal de pagamento."},
    {item: "Limite de Crédito."},
    {item: "Pontualidade pagamentos."},
    {item: "Quadro Societário."},
    {item: "Capital Social."},
    {item: "Situação na Receita Federal."},
    {item: "Data de Fundação"},
    {item: "Score positivo"},
    {item: "Registro Geral de Inadimplência."},
    {item: "Pendências financeiras."},
    {item: "Protesto nacional."},
    {item: "CCF - Cheques sem fundos Nacionais."},
    {item: "Endereços."},
    {item: "Telefones."},
    {item: "E-mails."},
    {item: "Pessoas de contato (referências)."},
    {item: "Cadin (Opcional)."},
    {item: "Ação Judicial (Opcional)."},
    {item: "Renda Familiar (Pessoa Física; opcional)."},
    {item: "Consulta de cheque contra-ordem GRATUITO."},
  ]

  const itensOptionalData = [
    {item: "Cadin", id: "cadin"},
    {item: "Óbito (NOVO)", id: "obito"},
  ]

  const renderConsultaPage = () => (
    <RatingProvider>
      <div className="flex-1 flex flex-col" data-testid="consulta-page">
        <div className="flex-col h-full flex px-4 sm:px-10 lg:px-20 2xl:px-72 py-4 space-y-4">
          <div className="mb-6" data-testid="page-header">
            <div className="flex items-center space-x-2 mb-2">
              <DescriptionIcon className="text-[#e02725] w-6 h-6" />
              <h1 className="text-xl md:text-2xl font-bold text-[#112331]" data-testid="page-title">Relatório Gold</h1>
            </div>
          </div>
          {/* Page Content */}
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 flex flex-col lg:w-1/2 m-3">
              {/* Card dos dados opcionais reutilizável */}
              <CardOptionalData 
                title="Dados Opcionais" 
                data={itensOptionalData} 
                opcionalSelected={opcionalSelected} 
                setOpcionalSelected={setOpcionalSelected}
                data-testid="optional-data-card"
              />
              <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-4" data-testid="warning-message">
                <p className="text-red-600 text-sm text-center font-medium">
                  OS OPCIONAIS SERÃO COBRADOS COMO ADICIONAIS DA CONSULTA.
                  <br />
                  EM CASO DE DÚVIDAS ENTRAR EM CONTATO COM SEU CONSULTOR CORPORATIVO.
                </p>
              </div>
              <div className="flex flex-col gap-4 " data-testid="form-container">
                {isLoading && (
                  <div data-testid="loading" className="text-center text-red-600 font-medium">
                    Carregando...
                  </div>
                )}
                <div className="w-full">
                  <FormularioConsulta 
                    personType={personType}
                    document={document}
                    newConsultation={newConsultation}
                    isLoading={isLoading}
                    onPersonTypeChange={setPersonType}
                    onDocumentChange={setDocument}
                    onNewConsultationChange={setNewConsultation}
                    onSubmit={handleConsultar}
                    dataTestId="form-consulta"
                  />
                </div>
              </div>
            </div>
            {/* Card da descrição do relatório, reutilizável */}
            <CardDescription title="Descrição" data={itensDescription} data-testid="description-card" />
          </div>
        </div>
      </div>
    </RatingProvider>
  )

  
  const columnsResumo: TableColumn[] = [
    { key: 'descricao', label: '', align: 'left' },
    { key: 'quantidade', label: 'Quantidade', align: 'center', icon: <AddRoundedIcon className="text-primary-500 mr-1 align-bottom"/> },
    { key: 'valorTotal', label: 'Valor Total', align: 'center', icon: <AttachMoneyRoundedIcon className="text-primary-500 mr-1 align-bottom"/>,}

  ]

  const dataResumo = [
    { item: "RGIdoBrasil", descricao: 'RGI do Brasil', quantidade: "-", valorTotal: "-" },
    { item: "chequeSemFundo", descricao: 'Cheque Sem Fundo', quantidade: "-", valorTotal: "-" },
    { item: "protesto", descricao: 'Protesto', quantidade: "-", valorTotal: "-" },
    { item: "acoesCiveis", descricao: 'Ações Civeis', quantidade: "-", valorTotal: "-" },

  ]

  const score = personType === "fisica" ? 675 : 800;

  const mockDataCards: DashboardCardType[] = [
    {
        id: "dividas-nao-pagas",
        title: "RECUPERAÇÃO JUDICIAL E FALÊNCIA:",
        subtitle: "NADA CONSTA", 
        icon: "cancel",
        path: "#"
    },
    ...(personType === "fisica" ? [{
        id: "situacao-cpf",
        title: "SITUAÇÃO CPF:",
        subtitle: "REGULAR", 
        icon: "warning",
        path: "#"
    }] : []),
    {
        id: personType === "fisica" ? "limite-credito" : "faturamento-presumido",
        title: personType === "fisica" ? "LIMITE DE CRÉDITO:" : "FATURAMENTO PRESUMIDO:",
        subtitle: personType === "fisica" ? "R$ 7.222,44" : "R$ 250.000,00", 
        icon: "credit_score",
        path: "#"
    }
]

  const mockCardCapitalSocial: DashboardCardType[] = [
        {
            id: "capital-social",
            title: "CAPITAL SOCIAL:",
            subtitle: "R$ 50.000,00",
            icon: "attach_money",
            path: "#"
        }
    ]


  //Mock informações contato
  const columnsEnderecos: TableColumn[] = [
    { key: 'cep', label: 'CEP', align: 'left'},
    { key: 'logradouro', label: 'Logradouro', align: 'center'},
    { key: 'uf', label: 'UF', align: 'center'},
    { key: 'cidade', label: 'Cidade', align: 'center'},
    { key: 'bairro', label: 'Bairro', align: 'center'},
    { key: 'numero', label: 'Número', align: 'center', render: (value) => value || '-' },
  ]
  const dataEnderecos = personType === 'fisica' ? [
    { cep: '12345-678', logradouro: 'Rua Exemplo', uf: 'SP', cidade: 'São Paulo', bairro: 'Centro', numero: '123' },
    { cep: '98765-432', logradouro: 'Avenida Teste', uf: 'RJ', cidade: 'Rio de Janeiro', bairro: 'Copacabana', numero: '456' },
  ] : [
    { cep: '12345-678', logradouro: 'Rua Exemplo', uf: 'SP', cidade: 'São Paulo', bairro: 'Centro', numero: '123' },
    { cep: '98765-432', logradouro: 'Avenida Teste', uf: 'RJ', cidade: 'Rio de Janeiro', bairro: 'Copacabana', numero: '456' },
    { cep: '54321-098', logradouro: 'Praça Central', uf: 'MG', cidade: 'Belo Horizonte', bairro: 'Savassi', numero: '789' }
    ] 

  const columnsContatos: TableColumn[] = [
    { key: 'descricao', label: 'Item', align: 'left' },
    { key: 'info', label: '', align: 'center'}
  ]
  const dataContatos = personType === 'fisica' ? [
    { item: 'telefone', descricao: 'Telefone:', info: '(12) 93456-7890' },
    { item: 'email', descricao: 'E-mail:', info: 'email.teste@teste.com' }
  ] : [
    { item: 'telefone', descricao: 'Telefone:', info: '(43) 99487-8784' },
    { item: 'email', descricao: 'E-mail:', info: 'email.teste2@teste.com' },
    ]

    //mock alertas restricoes
    const columnsAlertas: TableColumn[] = [
        { key: 'info', label: 'Informação', align: 'left' },
        { key: 'descricao', label: 'Descrição', align: 'center' }
    ]
    const dataAlertas = personType === 'fisica' ? [
        { info: 'Consultas 30 dias', descricao: 'Quantidade total: 0' },
        { info: 'Consultas 31 a 60 dias', descricao: 'Quantidade total: 1' },
        { info: 'Consultas 61 a 90 dias', descricao: 'Quantidade total: 0' },
        { info: 'Consultas 90+ dias', descricao: 'Quantidade total: 0' },
        { info: 'Últimas Consultas', descricao: 'Data 09/06/2025, 1 ocorrência, segmento 0.' },
    ] : [
        { info: 'Matriz/Filial:', descricao: 'Matriz' },
        { info: 'Tempo de atuação:', descricao: '3 a 5 anos' },
        { info: 'Aeronaves', descricao: 'Nenhum registro encontrado nas bases consultadas' },
        { info: 'Imóveis', descricao: 'Nenhum registro encontrado nas bases consultadas' },
        { info: 'CNAES Secundários', descricao: '4723700 - Comercio Varejista de Bebidas' },
    ]

  const renderResultadosPage = () => (
    <ResultadosTemplate title={"Relatório Gold"} document={document} personType={personType} onNovaConsulta={handleNovaConsulta} data-testid="results-template">
      <div className="flex flex-col w-full gap-4 lg:flex-row lg:gap-6 max-w-7xl mx-auto" data-testid="results-container">
          <div className="flex flex-col gap-4 w-full justify-center">
            <div className="flex flex-col  items-center gap-4" data-testid="financial-data-section">
                <AnaliseIA 
                    texto="Não há registros que indiquem inadimplência ou qualquer outro fator que represente risco. 
                    O score decrédito é considerado alto, indicando confiabilidade. 
                    A renda estimada é suficiente para cobrir obrigações financeiras."
                    data-testid="analise-ia"
                />
                <SectionSCRBacen title="Dados Financeiros" titleTag="h3" icon={<WalletIcon />} data-testid="dados-financeiros-section"> 
                        <CardsData dataCards={mockDataCards} data-testid="financial-cards"/>
                </SectionSCRBacen>
            </div>
            <div className="flex flex-col lg:flex-row gap-4" data-testid="medidores-section">
              <SectionSCRBacen data-testid="medidores-container"> 
                <Medidores Score={score} Pontualidade={80} data-testid="medidores"/>
              </SectionSCRBacen>
            </div>
            <div data-testid="credit-info-section">
              <div className='flex flex-row mb-2'>
                <div className='flex items-center justify-center mr-2'>
                  <MonetizationOnRoundedIcon className='text-primary-500'/>
                </div>
                <h2 data-testid="credit-info-title" className='text-secondary-800'>Informações de Crédito e Pendências</h2>
              </div>
              <div data-testid="credit-info-content">
                <Resumo columns={columnsResumo} data={dataResumo} titleTag="h3" data-testid="resumo-table"/>
                <div>
                    <h3 data-testid="detail-title" className="text-secondary-800 p-2">Detalhes</h3>
                </div>
                <ContainerTable
                  icon={<HomeIcon />}
                  title="RGI - Registro Geral de Inadimplente Do Brasil"
                  titleTag="h3"
                  data-testid="table-rgi"
                  columns={columnsAlertas}
                  data={[]}
                />
                <ContainerTable
                  icon={<ReceiptLongIcon />}
                  title="Cheque Sem Fundo"
                  titleTag="h3"
                  data-testid="table-cheque-sem-fundo"
                  columns={columnsAlertas}
                  data={[]}
                />
                <ContainerTable
                  icon={<ApprovalIcon />}
                  title="Protesto"
                  titleTag="h3"
                  data-testid="table-protesto"
                  columns={columnsAlertas}
                  data={[]}
                />
                <ContainerTable
                  icon={<GavelIcon />}
                  title="Ações Cíveis"
                  titleTag="h3"
                  data-testid="table-acoes-civeis"
                  columns={columnsAlertas}
                  data={[]}
                />
                <div>
                    <h3 data-testid="additional-info-title" className="text-secondary-800 p-2">Informações Adicionais</h3>
                </div>
                <SectionSCRBacen data-testid="additional-info-section">
                    <div className="flex flex-col w-full gap-4 justify-center">
                        <div className="w-full">
                            <CardsData dataCards={mockCardCapitalSocial} data-testid="capital-social-cards"/>
                        </div>
                        <div className="w-full">
                            <div className='flex flex-row mb-2'>
                                <div className='flex items-center justify-center mr-2'>
                                    <WarningRoundedIcon className='text-primary-500'/>
                                </div>
                                <h3 data-testid="alertas-restricoes-title" className='text-secondary-800'>Informações Alertas Restrições</h3>
                            </div>
                            <div className="mb-4">
                                <Table 
                                    columns={columnsAlertas}
                                    data={dataAlertas}
                                    data-testid="alertas-restricoes-table"
                                />
                            </div>
                            <div className='flex flex-row mb-2'>
                                <div className='flex items-center justify-center mr-2'>
                                    <AssignmentTurnedInRoundedIcon className='text-primary-500'/>
                                </div>
                                <h3 data-testid="alertas-restricoes-title-2" className='text-secondary-800'>Informações Alertas Restrições</h3>
                            </div>
                            <div className="mb-4">
                                <Table 
                                    columns={columnsAlertas}
                                    data={[]}
                                    data-testid="alertas-restricoes-table-2"
                                />
                            </div>
                        </div>
                    </div>
                </SectionSCRBacen>
              </div>
            </div>
            <div data-testid="contact-info-section">
              <div className='flex flex-row mb-2'>
                <div className='flex items-center justify-center mr-2'>
                  <InfoOutlineIcon className='text-primary-500'/>
                </div>
                <h2 data-testid="contact-info-title" className='text-secondary-800'>Informações Contato</h2>
              </div>
              <div data-testid="contact-info-content">
                <ContainerTable
                  icon={<PlaceIcon />}
                  title="Endereços"
                  titleTag="h3"
                  data-testid="table-enderecos"
                  columns={columnsEnderecos}
                  data={dataEnderecos}
                />
                <ContainerTable
                  icon={<ContactsIcon />}
                  title="Contatos"
                  titleTag="h3"
                  data-testid="table-contatos"
                  columns={columnsContatos}
                  data={dataContatos}
                />
              </div>
            </div>
          </div>
      </div>
      <div className="flex justify-center" data-testid="footer-container">
      </div>
      <CopyRight data-testid="copyright" />
    </ResultadosTemplate>
  )
  return showResults ? renderResultadosPage() : renderConsultaPage();
}