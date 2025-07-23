'use client'

import { useEffect, useState } from "react";
import { RatingProvider } from "@/contexts/RatingContext/RatingContext";
import DescriptionIcon from "@mui/icons-material/Description";
import AddIcon from '@mui/icons-material/Add';
import WalletIcon from '@mui/icons-material/Wallet';
import SpeedIcon from '@mui/icons-material/Speed';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import PlaceIcon from '@mui/icons-material/Place';
import ContactsIcon from '@mui/icons-material/Contacts';
import { ResultadosTemplate } from "@/components/template/ResultadosTemplate/ResultadosTemplate";
import { FormularioConsulta } from "@/components/molecules/FormConsulta/FormConsulta";
import CardDescription from "@/components/molecules/CardDescription/CardDescription";
import CopyRight from "@/components/atoms/CopyRight/CopyRight";
import Resumo from "@/components/molecules/ResumoSCRBancoCentral/ResumoSCRBancoCentral";
import { TableColumn } from "@/components/atoms/TableBancario/TableBancario";
import Score from "@/components/organisms/ScoreSCRBancoCentral/ScoreSCRBancoCentral";
import SectionSCRBacen from "@/components/molecules/SectionConsultasBancarias/SectionConsultasBancarias";
import type { DashboardCard as DashboardCardType } from "@/data/dashboard"
import { CardsData } from "@/components/molecules/CardsData/CardsData";
import ContainerTable from "@/components/molecules/ContainerTable/ContainerTable";
import { validateDocument } from "@/utils/Validator";

export default function RelatorioTopPage() {
  const [personType, setPersonType] = useState("fisica")
  const [document, setDocument] = useState("")
  const [newConsultation, setNewConsultation] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [shouldTriggerConsulta, setShouldTriggerConsulta] = useState(false);

  useEffect(() => {
    if (shouldTriggerConsulta) {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        setIsLoading(false);
        setShowResults(true);
        setShouldTriggerConsulta(false); // evita repetir
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [shouldTriggerConsulta]);

  const handleNovaConsulta = () => {
    setShowResults(false);
    setDocument("");
    setNewConsultation(true);
  }

  const handleConsultar = () => {
    // Validação usando as funções do cpfValidator
    if (document.trim() && validateDocument(document)) {
      setShouldTriggerConsulta(true);
    }
  };

  const itensDescription = [
    {item: "Score do Banco Central."},
    {item: "Prejuízo ao Sistema Financeiro."},
    {item: "Valores Vencidos."},
    {item: "Valores a Vencer."},
    {item: "Limite de Crédito."},
    {item: "Empréstimos com Garantia."},
    {item: "Cartão de Crédito."},
    {item: "Empréstimos."},
    {item: "Limite de Cheque Especial."},
    {item: "Crédito Pessoal."},
    {item: "Financiamentos Rurais."},
    {item: "Financiamentos Imobiliários."},
    {item: "Financiamentos de Agroindústrias."},
    {item: "Limite de Capital de Giro."},
    {item: "Início de Relacionamento com Banco Central."},
    {item: "Etc."},
  ]

  const renderConsultaPage = () => (
    <RatingProvider>
      <div className="flex-1 flex flex-col" data-testid="consulta-page">
        <div className="flex-col h-full flex px-4 sm:px-10 lg:px-20 2xl:px-72 py-4 space-y-4">
          <div className="m-2">
            <div className="flex items-center">
              <DescriptionIcon className="text-[#e02725] w-6 h-6" data-testid="title-icon" />
              <h1 className="text-xl md:text-2xl font-bold text-[#112331]" data-testid="page-title">Sistema de Informações de Crédito - Banco Central</h1>
            </div>
          </div>
          {/* Page Content */}
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 flex flex-col lg:w-1/2 m-3">
              <div className="flex flex-col gap-4 ">
                {isLoading && (
                  <div data-testid="loading-message" className="text-center text-red-600 font-medium">
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

  const columnsResumo: TableColumn[] = [
    { key: 'descricao', label: 'Descrição', align: 'left', icon: <DescriptionIcon className="text-primary-500 mr-1 align-bottom"/> },
    { key: 'info', label: 'Informações', align: 'center', icon: <AddIcon className="text-primary-500 mr-1 align-bottom"/>,}
  ]

  const dataResumo = [
    { item: "inicio", descricao: 'Valor a pagar:', info: "16/11/2022" },
    { item: "qtdInstituicoes", descricao: 'Dívidas não pagas:', info: "3" },
    { item: "qtdOperacoes", descricao: 'Prejuízo ao sistema financeiro:', info: "3" },
    { item: "qtdDiscordancia", descricao: 'Limite de crédito:', info: "Nada Consta"},
    { item: "qtdSubJudice", descricao: 'Limite de crédito:', info: "Nada Consta"}
  ]

  const score = personType === "fisica" ? 675 : 800;

  const mockDataCards: DashboardCardType[] = [
        {
            id: "valor-a-pagar",
            title: "VALOR A PAGAR:",
            subtitle: "R$ 3.476,97", 
            icon: "payments", 
            path: "#"
        },
        {
            id: "dividas-nao-pagas",
            title: "DÍVIDAS NÃO PAGAS:",
            subtitle: "R$ 0,00", 
            icon: "cancel",
            path: "#"
        },
        {
            id: "prejuizo-sistema-financeiro",
            title: "PREJUÍZO AO SISTEMA FINANCEIRO:",
            subtitle: "R$ 0,00", 
            icon: "warning",
            path: "#"
        },
        {
            id: "limite-credito",
            title: "LIMITE DE CRÉDITO:",
            subtitle: "R$ 7.222,44", 
            icon: "credit_score",
            path: "#"
        }
  ]
  
  // Mock carteira de crédito
  const columnsCarteira: TableColumn[] = [
    { key: 'descricao', label: 'Descrição', align: 'left', icon: <DescriptionIcon className="text-primary-500 mr-1 align-bottom"/> },
    { key: 'valor', label: '', align: 'center', icon: <AttachMoneyIcon className="text-primary-500 mr-1 align-bottom"/>},
    { key: 'porcentagem', label: '', align: 'center', icon: <PercentIcon className="text-primary-500 mr-1 align-bottom"/>}
  ]
  
  const dataCarteiraEmprestimos = [
    { item: "descricaoEmprestimos", descricao: 'Cartão de crédito? Compra, fatura parcelada ou saque financiado pela instituição emitente do cartão', valor: "", porcentagem: "" },
    { item: "credVencer30", descricao: 'Créditos a vencer em até 30 dias', valor: "R$ 192,48", porcentagem: " 1,63%" },
    { item: "credVencer31a60", descricao: 'Créditos a vencer em 31 a 60 dias', valor: "R$ 285,24", porcentagem: "2,41%" },
    { item: "credVencer61a90", descricao: 'Créditos a vencer em 61 a 90 dias', valor: "R$ 275,79", porcentagem: "2,33%"},
    { item: "total", descricao: 'Total:', valor: "R$ 753,51", porcentagem: "6,38%"}
  ]
  
  const dataCarteiraOutros = [
    { item: "descricaoEmprestimos", descricao: 'Cartão de crédito - Compra a vista e parcelado Logista', valor: "", porcentagem: "" },
    { item: "credVencer30", descricao: 'Créditos a vencer em até 30 dias', valor: "R$ 3.226,22", porcentagem: "27,31%" },
    { item: "credVencer31a60", descricao: 'Créditos a vencer em 31 a 60 dias', valor: "R$ 635,61", porcentagem: "5,38%" },
    { item: "credVencer61a90", descricao: 'Créditos a vencer em 61 a 90 dias', valor: "R$ 263,82", porcentagem: "2,23%"},
    { item: "total", descricao: 'Total:', valor: "R$ 4.373,31", porcentagem: "37,02%"}
  ]
  
  const dataCarteiraLimite = [
    { item: "cartao", descricao: 'Cartão de crédito', valor: '', porcentagem: '' },
    { item: "credVencer360", descricao: 'Limite de credito com vencimento ate 360 dias', valor: 'R$ 6.687,49', porcentagem: '56,60%' },
    { item: "total", descricao: 'Total', valor: 'R$ 6.687,49', porcentagem: '56,60%' }
  ]

  //Mock informações
  const columnsEnderecos: TableColumn[] = [
    { key: 'cep', label: 'CEP', align: 'left'},
    { key: 'logradouro', label: 'Logradouro', align: 'center'},
    { key: 'uf', label: 'UF', align: 'center'},
    { key: 'cidade', label: 'Cidade', align: 'center'},
    { key: 'bairro', label: 'Bairro', align: 'center'}
  ]

  const columnsContatos: TableColumn[] = [
    { key: 'descricao', label: 'Item', align: 'left' },
    { key: 'info', label: '', align: 'center'}
  ]
  
  const dataContatos = [
    { item: 'telefone', descricao: 'Telefone:', info: '' },
    { item: 'email', descricao: 'E-mail:', info: '' }
  ] // Mock data contatos

  const renderResultadosPage = () => (
    <div data-testid="resultados-page">
      <ResultadosTemplate 
        title={"Sistema de Informações de Crédito - Banco Central"} 
        document={document} 
        personType={personType} 
        onNovaConsulta={handleNovaConsulta}
        data-testid="resultados-template"
      >
        <div className="flex flex-col w-full gap-4 lg:flex-row lg:gap-6 max-w-7xl mx-auto">
            <div className="flex flex-col gap-4 w-full justify-center">

              <div data-testid="resumo-section">
                <Resumo columns={columnsResumo} data={dataResumo} data-testid="resumo-table"/>
              </div>
              
                <div className="flex w-full flex-col lg:flex-row gap-4">
                  <div className="w-full" data-testid="score-section">
                    <SectionSCRBacen title="Score" icon={<SpeedIcon />}>
                      <Score data-testid="score-value" score={score}/>
                    </SectionSCRBacen>
                  </div>
                  <div className="w-full" data-testid="carteira-credito-section">
                    <SectionSCRBacen title="Carteira de Crédito" icon={<WalletIcon />}> 
                      <CardsData dataCards={mockDataCards} data-testid="cards-data"/>
                    </SectionSCRBacen>
                  </div>
                </div>
              
              <div data-testid="carteira-detalhada-section">
                <div className='flex flex-row'>
                  <div className='flex items-center justify-center mr-2'>
                    <WalletIcon className='text-primary-500'/>
                  </div>
                  <h2 data-testid="carteira-detalhada-title" className='text-secondary-800'>Carteira de Crédito - Detalhada</h2>
                </div>
                <div>
                  <ContainerTable
                    title="Empréstimos"
                    titleTag="h3"
                    data-testid="table-emprestimos"
                    columns={columnsCarteira}
                    data={dataCarteiraEmprestimos}
                  />
                  <ContainerTable
                    title="Outros Créditos"
                    titleTag="h3"
                    data-testid="table-outros-creditos"
                    columns={columnsCarteira}
                    data={dataCarteiraOutros}
                  />
                  <ContainerTable
                    title="Limite de Crédito"
                    titleTag="h3"
                    data-testid="table-limite-credito"
                    columns={columnsCarteira}
                    data={dataCarteiraLimite}
                  />
                </div>
              </div>
              
              <div data-testid="informacoes-section">
                <div className='flex flex-row'>
                  <div className='flex items-center justify-center mr-2'>
                    <InfoOutlineIcon className='text-primary-500'/>
                  </div>
                  <h2 data-testid="informacoes-title" className='text-secondary-800'>Informações</h2>
                </div>
                <div>
                  <ContainerTable
                    icon={<PlaceIcon />}
                    title="Endereços"
                    titleTag="h3"
                    data-testid="table-enderecos"
                    columns={columnsEnderecos}
                    data={[]}
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
        <div className="flex justify-center" data-testid="copyright-container">
          <CopyRight data-testid="copyright" />
        </div>
      </ResultadosTemplate>
    </div>
  )

  return (
    <div data-testid="relatorio-scr-page">
      {showResults ? renderResultadosPage() : renderConsultaPage()}
    </div>
  );
}