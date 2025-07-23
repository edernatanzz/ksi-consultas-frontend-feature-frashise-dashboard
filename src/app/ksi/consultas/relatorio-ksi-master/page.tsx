'use client'

import { useState } from "react";
import { RatingProvider } from "@/contexts/RatingContext/RatingContext";
import DescriptionIcon from "@mui/icons-material/Description";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckIcon from '@mui/icons-material/Check';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import MenuIcon from '@mui/icons-material/Menu';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HandshakeIcon from '@mui/icons-material/Handshake';
import GavelIcon from '@mui/icons-material/Gavel';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PlaceIcon from '@mui/icons-material/Place';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import InfoIcon from '@mui/icons-material/Info';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Box } from "@mui/material";
import { Button } from "@/components/atoms/Button/Button"
import { ResultadosTemplate } from "@/components/template/ResultadosTemplate/ResultadosTemplate";
import { FormularioConsulta } from "@/components/molecules/FormConsulta/FormConsulta";
import CardDescription from "@/components/molecules/CardDescription/CardDescription";
import CardOptionalData from "@/components/molecules/CardOptionalData/CardOptionalData";
import CopyRight from "@/components/atoms/CopyRight/CopyRight";
import Table, { TableColumn } from "@/components/atoms/TableBancario/TableBancario";
import Section from "@/components/molecules/SectionConsultasBancarias/SectionConsultasBancarias";
import Medidores from "@/components/molecules/MedidoresPontScore/MedidoresPontScore";
import { mockData, mockDataPJ } from "../../../../../api-consultas/data/mockdata";
import AnaliseChequeSustado from "@/components/molecules/AnaliseChequeSustado/AnaliseChequeSustado";
import { validateDocument } from "@/utils/Validator";
import { formatCurrency } from "@/utils/user";
import ContainerTable from "@/components/molecules/ContainerTable/ContainerTable";

export default function RelatorioTopPage() {
  const [personType, setPersonType] = useState("fisica")
  const [document, setDocument] = useState("")
  const [newConsultation, setNewConsultation] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [opcionalSelected, setOpcionalSelected] = useState<string[]>([])
  const [expandido, setExpandido] = useState(false);

  const handleNovaConsulta = () => {
    setShowResults(false);
    setDocument("");
    setNewConsultation(true);
  }

  const handleConsultar = () => {
    // Validação usando as funções do cpfValidator
    if (document.trim() && validateDocument(document)) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setShowResults(true)
      }, 1500)
    }
  }

  const itensDescription = [
    {item: "Score Positivo."},
    {item: "Faturamento anual presumido PJ."},
    {item: "Renda mensal presumida PF."},
    {item: "Capacidade mensal de pagamento."},
    {item: "Limite de Crédito."},
    {item: "Pontualidade pagamentos."},
    {item: "Quadro Societário."},
    {item: "Participação Societária"},
    {item: "Capital Social."},
    {item: "Situação na Receita Federal."},
    {item: "Data de Fundação"},
    {item: "Registro Geral de Inadimplência."},
    {item: "Restrições de varejo."},
    {item: "Pendências financeiras."},
    {item: "Protesto nacional."},
    {item: "CCF - Cheques sem fundos Nacionais."},
    {item: "Participação societária."},
    {item: "Recuperação judicial ou falência."},
    {item: "Endereços."},
    {item: "Telefones."},
    {item: "E-mails."},
    {item: "Pessoas de contato (referências)."},
    {item: "Consulta de cheque contra-ordem GRATUITO."},
  ]

  const itensOptionalData = [
    {item: "Cadin", id: "cadin"},
    {item: "Base IV (Cortesia)", id: "BaseIV"},
  ]

  const renderConsultaPage = () => (
    <RatingProvider>
            <div className="flex-1 flex flex-col">
                <div className="flex-col h-full flex px-4 sm:px-10 lg:px-20 2xl:px-72 py-4 space-y-4">
                  <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <DescriptionIcon className="text-[#e02725] w-6 h-6" />
                      <h1 className="text-xl md:text-2xl font-bold text-[#112331]">Relatório KSI Master</h1>
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
                          />

                          <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-4">
                            <p className="text-red-600 text-sm text-center font-medium">
                            OS OPCIONAIS SERÃO COBRADOS COMO ADICIONAIS DA CONSULTA.
                            <br />
                            EM CASO DE DÚVIDAS ENTRAR EM CONTATO COM SEU CONSULTOR CORPORATIVO.
                            </p>
                          </div>

                          <div className="flex flex-col gap-4 ">
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
                    <CardDescription title="Descrição" data={itensDescription} />
                  </div>
                </div>
            </div>
    </RatingProvider>
  )


  const columnsRGI: TableColumn[] = [
    { key: 'dataOcorrencia', label: 'Data da Ocorrência', align: 'left', colorHeader: 'bg-secondary-200', colorTextHeader: 'text-secondary-800', icon: <CalendarMonthIcon className="text-primary-500 align-bottom mr-1"/> },
    { key: 'contrato', label: 'Contrato', align: 'center', colorTextHeader: 'text-secondary-800', icon: <GavelIcon className="text-primary-500 align-bottom mr-1"/> },
    { key: 'modalidade', label: 'Modalidade', align: 'center', colorTextHeader: 'text-secondary-800', icon: <CreditCardIcon className="text-primary-500 align-bottom mr-1"/> },
    { key: 'informante', label: 'Informante', align: 'center', colorTextHeader: 'text-secondary-800', icon: <AccountBalanceIcon className="text-primary-500 align-bottom mr-1"/> },
    { key: 'valor', label: 'Valor', align: 'center', colorTextHeader: 'text-secondary-800', icon: <LocalAtmIcon className="text-primary-500 align-bottom mr-1"/> },
  ]
  const dataRGI = personType === 'juridica' ? [
    {dataOcorrencia: '01042025', contrato:  2075218, modalidade: 'Comprador', informante: 'PA-RDO/Residencial Jardim Universita', valor: 252.99},
    {dataOcorrencia: '01032025', contrato:  2045825, modalidade: 'Comprador', informante: 'PA-RDO/Residencial Jardim Universita', valor: 253.15},
    {dataOcorrencia: '01022025', contrato:  1962502, modalidade: 'Comprador', informante: 'PA-RDO/Residencial Jardim Universita', valor: 252.83},
    {dataOcorrencia: '01012025', contrato:  1962501, modalidade: 'Comprador', informante: 'PA-RDO/Residencial Jardim Universita', valor: 257.75},
    {dataOcorrencia: '05112024', contrato:  "0000228052202410", modalidade: 'Comprador', informante: 'ENERGISA ACRE DIST DE ENERGIA SA', valor: 55.22},
    {dataOcorrencia: '21102024', contrato:  "0001394091202410", modalidade: 'Comprador', informante: 'ENERGISA RONDONIA DIST DE ENERGIA SA', valor: 79.25},
    {dataOcorrencia: '04102024', contrato:  "0000228052202409", modalidade: 'Comprador', informante: 'ENERGISA ACRE DIST DE ENERGIA SA', valor: 55.26},
  ] : []

  const columnsBacen: TableColumn[] = [
    { key: 'numBanco', label: 'Número do Banco', align: 'left', colorHeader: 'bg-secondary-200', colorTextHeader: 'text-secondary-800', icon: <GavelIcon className="text-primary-500 align-bottom mr-1"/> },
    { key: 'nomeBanco', label: 'Nome do Banco', align: 'center', colorTextHeader: 'text-secondary-800', icon: <AccountBalanceIcon className="text-primary-500 align-bottom mr-1"/> },
    { key: 'agencia', label: 'Agência', align: 'center', colorTextHeader: 'text-secondary-800', icon: <PlaceIcon className="text-primary-500 align-bottom mr-1"/> },
    { key: 'quantidade', label: 'Quantidade', align: 'center', colorTextHeader: 'text-secondary-800', icon: <AddIcon className="text-primary-500 align-bottom mr-1"/> },
  ]

  const columnsQuadroSocietario: TableColumn[] = [
    { key: 'nomeSocio', label: 'Nome do Sócio', align: 'left', colorHeader: 'bg-secondary-200', colorTextHeader: 'text-secondary-800', icon: <PersonIcon className="text-primary-500 align-bottom mr-1"/> },
    { key: 'nomeEmpresa', label: 'Nome da Empresa', align: 'center', colorTextHeader: 'text-secondary-800', icon: <DriveFileRenameOutlineIcon className="text-primary-500 align-bottom mr-1"/> },
    { key: 'tipo', label: 'Tipo', align: 'center', colorTextHeader: 'text-secondary-800', icon: <FormatListBulletedIcon className="text-primary-500 align-bottom mr-1"/> },
    { key: 'cpf', label: 'CPF', align: 'center', colorTextHeader: 'text-secondary-800', icon: <AssignmentIndIcon className="text-primary-500 align-bottom mr-1"/> },
  ]
  
  const columnsParticipacaoSocietaria: TableColumn[] = [
    { key: 'cnpj', label: 'CNPJ', align: 'left', colorHeader: 'bg-secondary-200', colorTextHeader: 'text-secondary-800', icon: <AssignmentIndIcon className="text-primary-500 align-bottom mr-1"/> },
    { key: 'dataEntrada', label: 'Data de Entrada', align: 'center', colorTextHeader: 'text-secondary-800', icon: <CalendarMonthIcon className="text-primary-500 align-bottom mr-1"/> },
    { key: 'nomeEmpresa', label: 'Nome da Empresa', align: 'center', colorTextHeader: 'text-secondary-800', icon: <DriveFileRenameOutlineIcon className="text-primary-500 align-bottom mr-1"/> },
    { key: 'posicoes', label: 'Posições', align: 'center', colorTextHeader: 'text-secondary-800', icon: <FormatListBulletedIcon className="text-primary-500 align-bottom mr-1"/> },
  ]

  const columnsHistorico: TableColumn[] = [
    { key: 'dataConsulta', label: 'Data da Consulta', align: 'left', colorHeader: 'bg-secondary-200', colorTextHeader: 'text-secondary-800', icon: <CalendarMonthIcon className="text-primary-500 align-bottom mr-1"/> },
    { key: 'informante', label: 'Informante', align: 'center', colorTextHeader: 'text-secondary-800', icon: <AccountBalanceIcon className="text-primary-500 align-bottom mr-1"/> },
    { key: 'tipoConsulta', label: 'Tipo de Consulta', align: 'center', colorTextHeader: 'text-secondary-800', icon: <DescriptionIcon className="text-primary-500 align-bottom mr-1"/> },
  ]

  const columnsCadin: TableColumn[] = [
    { key: 'sigla', label: 'Sigla', align: 'left', colorHeader: 'bg-secondary-200', colorTextHeader: 'text-secondary-800', icon: <DescriptionIcon className="text-primary-500 align-bottom mr-1"/> },
    { key: 'entidade', label: 'Entidade', align: 'center', colorTextHeader: 'text-secondary-800', icon: <AccountBalanceIcon className="text-primary-500 align-bottom mr-1"/> },
    { key: 'quantidade', label: 'Quantidade', align: 'center', colorTextHeader: 'text-secondary-800', icon: <AddIcon className="text-primary-500 align-bottom mr-1"/> },
  ]

  const scorePersonType = personType === 'fisica' ? 633 : 312;
  const pontualidadePersonType = personType === 'fisica' ? 81.17 : 17.42;
  const capitalSocial = (mockDataPJ.relatorioRatingBancario.cadastraispj.capitalSocial || "-") as number;
  const limiteCredito = 4000.00;


  const columnsEnderecos: TableColumn[] = [
    { key: 'cep', label: 'CEP', align: 'left', colorHeader: 'bg-secondary-200', colorTextHeader: 'text-secondary-800' },
    { key: 'uf', label: 'UF', align: 'center', colorTextHeader: 'text-secondary-800' },
    { key: 'cidade', label: 'Cidade', align: 'center', colorTextHeader: 'text-secondary-800' },
    { key: 'bairro', label: 'Bairro', align: 'center', colorTextHeader: 'text-secondary-800' },
    { key: 'logradouro', label: 'Logradouro', align: 'center', colorTextHeader: 'text-secondary-800' },
    { key: 'numero', label: 'Número', align: 'center', colorTextHeader: 'text-secondary-800'},
    { key: 'complemento', label: 'Complemento', align: 'center', colorTextHeader: 'text-secondary-800' },
  ]
  const dataEnderecos = personType === 'fisica' ? 
  (mockData.relatorioRatingBancario.cadastraispf.enderecos ?? []).map(enderecos => 
  ({
    cep: enderecos.cep,
    logradouro: enderecos.logradouro,
    bairro: enderecos.bairro,
    cidade: enderecos.cidade,
    uf: enderecos.uf,
    numero: enderecos.numero || "-",
    complemento: enderecos.complemento || "-",
  })) : 
  [mockDataPJ.relatorioRatingBancario.cadastraispj.endereco].filter(Boolean).map(endereco => ({
    cep: endereco.cep,
    logradouro: endereco.logradouro,
    bairro: endereco.bairro,
    cidade: endereco.cidade,
    uf: endereco.uf,
    numero: endereco.numero || "-",
    complemento: endereco.complemento || "-",
  }));

  const columnsTelefones: TableColumn[] = [
    { key: 'telefones', label: 'Telefones', align: 'left', colorHeader: 'bg-secondary-200', colorTextHeader: 'text-secondary-800', icon: <PhoneIcon className="text-primary-500 align-bottom mr-1"/> },
  ]
  const dataTelefones = (mockData.relatorioRatingBancario.cadastraispf.telefones ?? []).map(tel => ({ telefones: tel }));
  
  const columnsEmails: TableColumn[] = [
    { key: 'emails', label: 'Emails', align: 'left', colorHeader: 'bg-secondary-200', colorTextHeader: 'text-secondary-800', icon: <AlternateEmailIcon className="text-primary-500 align-bottom mr-1"/>}
  ]
  const dataEmails = personType === 'fisica' 
  ? (mockData.relatorioRatingBancario.cadastraispf.emails ?? []).map(email => ({ emails: email })) 
  : (mockDataPJ.relatorioRatingBancario.cadastraispj.emails ?? []).map(email => ({ emails: email }));
  
  const columnsPessoasContato: TableColumn[] = [
    { key: 'cpf', label: 'CPF', align: 'left', colorHeader: 'bg-secondary-200', colorTextHeader: 'text-secondary-800', icon: <AssignmentIndIcon className="text-primary-500 align-bottom mr-1"/> },
    { key: 'nome', label: 'Nome', align: 'center', colorTextHeader: 'text-secondary-800', icon: <PersonIcon className="text-primary-500 align-bottom mr-1"/> },
    { key: 'parentesco', label: 'Parentesco', align: 'center', colorTextHeader: 'text-secondary-800', icon: <HandshakeIcon className="text-primary-500 align-bottom mr-1"/>}
  ]
  const dataPessoasContato = (mockData.relatorioRatingBancario.cadastraispf.pessoasContatos ?? []).map(pessoa => ({
    cpf: pessoa.documento,
    nome: pessoa.nome,
    parentesco: pessoa.descricaos
  }));

  const columnResumo: TableColumn[] = [
    { key: 'item', label: '', align: 'left', colorHeader: 'bg-secondary-200', colorTextHeader: 'text-secondary-800'},
    { key: 'quantidade', label: 'Quantidade', align: 'center', colorTextHeader: 'text-secondary-800', icon: <AddIcon className="text-primary-500 align-bottom mr-1"/>},
    { key: 'ultimaOcorrencia', label: 'Última Ocorrência', align: 'center', colorTextHeader: 'text-secondary-800', icon: <CalendarMonthIcon className="text-primary-500 align-bottom mr-1"/> },
    { key: 'pontuacao', label: 'Pontuação', align: 'center', colorTextHeader: 'text-secondary-800', icon: <CheckIcon className="text-primary-500 align-bottom mr-1"/> },
    { key: 'valorTotal', label: 'Valor Total', align: 'center', colorTextHeader: 'text-secondary-800', icon: <LocalAtmIcon className="text-primary-500 align-bottom mr-1"/> },
  ]

  const dataResume_PF = [
    {
      item: "RGI do Brasil",
      quantidade: "-",
      ultimaOcorrencia: "-",
      pontuacao: "-",
      valorTotal: "-"
    },
    {
      item: "Cheque sem Fundo",
      quantidade: "-",
      ultimaOcorrencia: "-",
      pontuacao: "-",
      valorTotal: "-"
    },
    {
      item: "Recuperação Judicial e Falência",
      quantidade: "-",
      ultimaOcorrencia: "-",
      pontuacao: "-",
      valorTotal: "-"
    },
    {
      item: "Score Positivo",
      quantidade: "-",
      ultimaOcorrencia: "-",
      pontuacao: scorePersonType,
      valorTotal: "-"
    },
    {
      item: "Pontualidade de Pagamento",
      quantidade: "-",
      ultimaOcorrencia: "-",
      pontuacao:  `${pontualidadePersonType}%`,
      valorTotal: "-"
    },
    {
      item: "Capacidade de Pagamento Mensal",
      quantidade: "-",
      ultimaOcorrencia: "-",
      pontuacao:  "-",
      valorTotal: "R$ 2.980,23"
    },
    {
      item: "Renda Presumida",
      quantidade: "-",
      ultimaOcorrencia: "-",
      pontuacao:  "-",
      valorTotal: "R$ 9.934,10"
    },
    {
      item: "Participação Societária",
      quantidade: "-",
      ultimaOcorrencia: "-",
      pontuacao:  "-",
      valorTotal: "-"
    },
    {
      item: "Histórico de Consultas",
      quantidade: "-",
      ultimaOcorrencia: "-",
      pontuacao:  "-",
      valorTotal: "-"
    },
    {
      item: "Endereços encontrados",
      quantidade: (mockData.relatorioRatingBancario.cadastraispf.enderecos ?? []).length,
      ultimaOcorrencia: "-",
      pontuacao:  "-",
      valorTotal: "-"
    },
    {
      item: "Telefones encontrados",
      quantidade: (mockData.relatorioRatingBancario.cadastraispf.telefones ?? []).length,
      ultimaOcorrencia: "-",
      pontuacao:  "-",
      valorTotal: "-"
    },
    {
      item: "Emails encontrados",
      quantidade: (mockData.relatorioRatingBancario.cadastraispf.emails ?? []).length,
      ultimaOcorrencia: "-",
      pontuacao:  "-",
      valorTotal: "-"
    },
    {
      item: "Pessoas para contato",
      quantidade: (mockData.relatorioRatingBancario.cadastraispf.pessoasContatos ?? []).length,
      ultimaOcorrencia: "-",
      pontuacao:  "-",
      valorTotal: "-"
    },
    {
      item: "CADIN (Opcional)",
      quantidade: "-",
      ultimaOcorrencia: "-",
      pontuacao: "-",
      valorTotal: "-"
    },
  ];

  const dataResume_PJ = [
    {
      item: "RGI do Brasil",
      quantidade: dataRGI.length,
      ultimaOcorrencia: dataRGI[0]?.dataOcorrencia || "-",
      pontuacao: "-",
      valorTotal: dataRGI.reduce((total, row) => total + (row.valor || 0), "-")
    },
    {
      item: "Cheque sem Fundo",
      quantidade: "",
      ultimaOcorrencia: "-",
      pontuacao: "-",
      valorTotal: "-"
    },
    {
      item: "Recuperação Judicial e Falência",
      quantidade: "-",
      ultimaOcorrencia: "-",
      pontuacao: "-",
      valorTotal: "-"
    },
    {
      item: "Score Positivo",
      quantidade: "-",
      ultimaOcorrencia: "-",
      pontuacao: scorePersonType,
      valorTotal: "-"
    },
    {
      item: "Pontualidade de Pagamento",
      quantidade: "-",
      ultimaOcorrencia: "-",
      pontuacao:  `${pontualidadePersonType}%`,	
      valorTotal: "-"
    },
    {
      item: "Faturamento Presumido",
      quantidade: "-",
      ultimaOcorrencia: "-",
      pontuacao: "-",
      valorTotal: "R$ 12.350,59"
    },
    {
      item: "Capital Social",
      quantidade: "-",
      ultimaOcorrencia: "-",
      pontuacao: "-",
      valorTotal: capitalSocial
    },
    {
      item: "Limite de Crédito",
      quantidade: "-",
      ultimaOcorrencia: "-",
      pontuacao: "-",
      valorTotal: "R$ 4.000,00"
    },
    {
      item: "Histórico de Consultas",
      quantidade: 33,
      ultimaOcorrencia: "-",
      pontuacao: "-",
      valorTotal: "-"
    },
    {
      item: "Quadro Societário",
      quantidade: "-",
      ultimaOcorrencia: "-",
      pontuacao: "-",
      valorTotal: "-"
    },
    {
      item: "Endereços encontrados",
      quantidade: mockDataPJ.relatorioRatingBancario.cadastraispj.endereco ? 1 : 0,
      ultimaOcorrencia: "-",
      pontuacao: "-",
      valorTotal: "-"
    },
    {
      item: "Emails encontrados",
      quantidade: (mockDataPJ.relatorioRatingBancario.cadastraispj.emails ?? []).length,
      ultimaOcorrencia: "-",
      pontuacao: "-",
      valorTotal: "-"
    },
    {
      item: "CADIN (Opcional)",
      quantidade: "-",
      ultimaOcorrencia: "-",
      pontuacao: "-",
      valorTotal: "-"
    },
  ];

  // Selecionar linhas conforme o tipo de pessoa
  const dataResumo = personType === 'fisica' ? dataResume_PF : dataResume_PJ;
  // Filtrar linhas com base na seleção de dados opcionais
  const filteredRows = opcionalSelected.includes('cadin')
  ? dataResumo
  : dataResumo.filter(dataResumo => dataResumo.item !== 'CADIN (Opcional)');
  
  const renderResultadosPage = () => (
    <ResultadosTemplate title={"Relatório KSI Master"} document={document} personType={personType} onNovaConsulta={handleNovaConsulta}>
      <div className="flex flex-col w-full gap-4 lg:flex-row lg:gap-6 max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 w-full justify-center">
            {/* RESUMO */}
            <div>
              <Section>
                <div className="flex flex-col w-full">
                  <div data-testid="resumo-header" className="flex mb-2 ">
                    <h2 data-testid="resumo-title" className='text-secondary-800'>Resumo</h2>
                    {expandido ? (
                        <ExpandMoreIcon 
                            data-testid="resumo-expand-more-icon"
                            fontSize='large' 
                            className='text-primary-500 cursor-pointer' 
                            onClick={() => setExpandido(false)} 
                        />
                    ) : (
                        <ExpandLessIcon 
                            data-testid="resumo-expand-less-icon"
                            fontSize='large' 
                            className='text-primary-500 cursor-pointer' 
                            onClick={() => setExpandido(true)} 
                        />
                    )}
                  </div>
                  {expandido && (
                    <div className="p-4" data-testid="resumo-table-container">
                      <Table columns={columnResumo} data={filteredRows} />
                    </div>
                  )}
                </div>
              </Section>
            </div>
            {/* DETALHES */}
            <div>
              <div data-testid="detalhes-header" className="flex mb-2 space-x-3">
                <MenuIcon data-testid="detalhes-icon" fontSize='large' className='text-primary-500'/>
                <h2 data-testid="detalhes-title">Detalhes</h2>
              </div>
              {/* MEDIDORES E CARDS */}
              <div className="mb-6">
                <Section>
                  <div className="mb-4">
                    <div data-testid="detalhes-medidores-section">
                        <Medidores Score={scorePersonType} Pontualidade={pontualidadePersonType} />
                    </div>
                    {personType === 'fisica' ? (
                        <div data-testid="detalhes-fisica-section" className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                            <div data-testid="detalhes-capacidade-pagamento-section">
                              <div className='bg-white p-4 rounded-lg shadow-md mt-4 flex flex-col justify-center items-center'>
                                  <div className='flex items-center gap-2 mb-2 justify-center'>
                                      <BusinessCenterIcon className='text-primary-500' fontSize='medium' data-testid="business-icon"/>
                                      <h3>Capacidade mensal de pagamento (Cortesia)</h3>
                                  </div>
                                  <div className='flex justify-center items-center flex-col'>
                                      <h2 className='text-primary-500 font-bold mb-2 bg-secondary-50 w-fit p-2 rounded-md' data-testid="valor-capacidade">R$ 2.345,34</h2>
                                      <p>O consumidor possui uma capacidade mensal de pagamento entre 0 a R$ 2.345,34 para assumir um novo compromisso financeiro.</p>
                                  </div>
                              </div>
                            </div>
                            <div data-testid="detalhes-renda-presumida-section">
                                  <div data-testid="renda-presumida-card" className='bg-white p-4 rounded-lg shadow-md mt-4 flex flex-col justify-center items-center'>
                                      <div data-testid="renda-presumida-title-container" className='flex items-center gap-2 mb-2 justify-center'>
                                          <AttachMoneyIcon data-testid="renda-presumida-icon" className='text-primary-500' fontSize='medium'/>
                                          <h3 data-testid="renda-presumida-title">Renda Presumida (Cortesia)</h3>
                                      </div>
                                      <div data-testid="renda-presumida-value-container" className='flex justify-center items-center flex-col'>
                                          <h2 data-testid="renda-presumida-value" className='text-primary-500 font-bold mb-2 bg-secondary-50 w-fit p-2 rounded-md'>R$ 9.934,10</h2>
                                          <p data-testid="renda-presumida-description">Com análise de renda presumida você pode qualificar melhor seu cliente e diminuir os riscos.</p>
                                      </div>
                                  </div>
                            </div>
                        </div>
                    ) : (
                        <div data-testid="detalhes-juridica-section" className='flex flex-col lg:flex-row align-center items-center'>
                            <div data-testid="detalhes-faturamento-presumido-section">
                              <div data-testid="faturamento-presumido-container" className='flex flex-col items-center justify-center p-2 mb-2 rounded-lg'>
                                  <div data-testid="faturamento-presumido-card" className='bg-white p-4 rounded-lg shadow-md mt-4 flex flex-col justify-center items-center'>
                                      <div data-testid="faturamento-presumido-title-container" className='flex items-center gap-2 mb-2 justify-center'>
                                          <AttachMoneyIcon data-testid="faturamento-presumido-icon" className='text-primary-500' fontSize='medium'/>
                                          <h3 data-testid="faturamento-presumido-title">Faturamento Presumido (Cortesia)</h3>
                                      </div>
                                      <div data-testid="faturamento-presumido-value-container" className='flex justify-center items-center flex-col'>
                                          <h2 data-testid="faturamento-presumido-value" className='text-primary-500 font-bold mb-2 bg-secondary-50 w-fit p-2 rounded-md'>R$ 12.350,59</h2>
                                          <p>Com análise de faturamento presumido você pode qualificar melhor seu cliente e diminuir os riscos.</p>
                                      </div>
                                  </div>
                              </div>
                            </div>
                            <div data-testid="detalhes-limite-credito-section">
                                <div data-testid="limite-credito-container" className='flex flex-col items-center justify-center p-2 mb-2 rounded-lg'>
                                    <div data-testid="limite-credito-card" className='bg-white h-full p-4 rounded-lg shadow-md mt-4 flex flex-col items-center '>
                                        <div data-testid="limite-credito-title-container" className='flex items-center gap-2 mb-2 justify-center'>
                                            <CreditCardIcon data-testid="limite-credito-icon" className='text-primary-500' fontSize='medium' />
                                            <h3 data-testid="limite-credito-title">Limite de Crédito</h3>
                                        </div>
                                        <div data-testid="limite-credito-value-container" className='flex justify-center items-center flex-col'>
                                            <h2 data-testid="limite-credito-value" className='text-primary-500 font-bold mb-2 bg-secondary-50 w-fit p-2 rounded-md'>{formatCurrency(limiteCredito)}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div data-testid="detalhes-capital-social-section">
                              <div className='flex flex-col items-center justify-center p-2 mb-2 rounded-lg' data-testid="capital-social-container">
                                  <div className='bg-white h-full p-4 rounded-lg shadow-md mt-4 flex flex-col items-center text-center' data-testid="capital-social-card">
                                      <div className='flex items-center gap-2 mb-2 justify-center'>
                                          <HandshakeIcon className='text-primary-500' fontSize='medium' data-testid="HandshakeIcon"/>
                                          <h3>Capital Social</h3>
                                      </div>
                                      <div className='flex justify-center items-center flex-col'>
                                          <h2 className='text-primary-500 font-bold mb-2 bg-secondary-50 w-fit p-2 rounded-md'>{formatCurrency(capitalSocial)}</h2>
                                          <p>Com análise do capital social você pode qualificar melhor seu cliente e diminuir os riscos.</p>
                                      </div>
                                  </div>
                              </div>
                            </div>
                        </div>
                    )}
                  </div>
                </Section>
              </div>
              {/* RGI do Brasil */}
              <div className="mb-6">
                <ContainerTable 
                  columns={columnsRGI} 
                  data={dataRGI} 
                  title="RGI do Brasil"
                />
              </div>
              {/* CHEQUE SEM FUNDO BACEN */}
              <div className="mb-6">
                <ContainerTable 
                  columns={columnsBacen} 
                  data={[]} 
                  title="Cheque sem Fundo BACEN"
                />
              </div>
              {/* QUADRO SOCIERTARIO */}
              <div className="mb-6">
                <ContainerTable 
                  columns={columnsQuadroSocietario} 
                  data={[]} 
                  title="Quadro Societário e administradores (Receita Federal)"
                />
              </div>
              {personType === 'fisica' ? (
                  <div data-testid="detalhes-fisica-optional-section">
                      {/* PARTICIPACAO SOCIETARIA */}
                      <div data-testid="detalhes-participacao-societaria-section">
                        <div className="mb-6">
                          <ContainerTable 
                            columns={columnsParticipacaoSocietaria} 
                            data={[]} 
                            title="Participação Societária (Cortesia)"
                          />
                        </div>
                      </div>
                      {/* HISTORICO CONSULTAS */}
                      <div data-testid="detalhes-historico-consultas-section">
                        <div className="mb-6">
                          <ContainerTable 
                            columns={columnsHistorico} 
                            data={dataRGI} 
                            title="Histórico de Consultas"
                          />
                        </div>
                      </div>
                      {/* CADIN */}
                      {opcionalSelected.includes('cadin') && (
                          <div data-testid="detalhes-cadin-section">
                            <div className="mb-6" data-destid="cadin-table-container">
                              <ContainerTable 
                                columns={columnsCadin} 
                                data={[]} 
                                title="Cadin (Opcional)"
                              />
                            </div>
                          </div>
                      )}
                  </div>
              ) : (
                  <div data-testid="detalhes-juridica-optional-section">
                      {/* CADIN */}
                      {opcionalSelected.includes('cadin') && (
                          <div data-testid="detalhes-cadin-section">
                              <div className="mb-6">
                              <ContainerTable 
                                columns={columnsRGI} 
                                data={dataRGI} 
                                title="Cadin (Opcional)"
                              />
                            </div>
                          </div>
                      )}
                  </div>
              )}
            </div>
            {/* INFORMAÇÕES */}
            <div>
              <div data-testid="detalhes-header" className="flex mb-2 space-x-3">
                <InfoIcon data-testid="detalhes-icon" fontSize='large' className='text-primary-500'/>
                <h2 data-testid="detalhes-title">Informações</h2>
              </div>
              {/* ENDEREÇOS */}
              <div>
                <ContainerTable
                  columns={columnsEnderecos} 
                  data={dataEnderecos} 
                  title="Endereços"
                />
              </div>
              {/* CONTATOS */}
              <div className="mb-4">
                <Section>
                  <div className="flex flex-col w-full">
                    <div className="mb-2">
                      <h2 data-testid="detalhes-title">Contatos</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
                      <Table columns={columnsTelefones} data={dataTelefones} />
                      <Table columns={columnsEmails} data={dataEmails} />
                    </div>
                  </div>
                </Section>
              </div>
              {/* PESSOAS CONTATO */}
              <div>
                <ContainerTable
                  columns={columnsPessoasContato} 
                  data={dataPessoasContato} 
                  title="Pessoas para Contato"
                />
              </div>
            </div>
            <AnaliseChequeSustado/>
          </div>
      </div>
      {/* BOTAO NOVA CONSULTA */}
      <Box textAlign="center" mb={4}>
        <Button className="bg-gray-600 hover:bg-gray-700 text-white" onClick={handleNovaConsulta}>
          Fazer nova consulta
        </Button>
      </Box>
      <CopyRight />
    </ResultadosTemplate>
  )
  return showResults ? renderResultadosPage() : renderConsultaPage();
}
