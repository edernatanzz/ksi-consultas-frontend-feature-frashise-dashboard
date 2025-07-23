'use client'

import { useState } from "react";
import { RatingProvider } from "@/contexts/RatingContext/RatingContext";
import DescriptionIcon from "@mui/icons-material/Description";
import { ResultadosTemplate } from "@/components/template/ResultadosTemplate/ResultadosTemplate";
import { FormularioConsulta } from "@/components/molecules/FormConsulta/FormConsulta";
import Section from "@/components/molecules/SectionConsultasBancarias/SectionConsultasBancarias";
import  CopyRight  from "@/components/atoms/CopyRight/CopyRight";
import type { DashboardCard as DashboardCardType } from "@/data/dashboard"
import { validateDocument } from "@/utils/Validator";
import { CardsData } from "@/components/molecules/CardsData/CardsData";
import { Box, Grid, Avatar } from "@mui/material";
import { Chip, List, ListItem, ListItemText, Typography } from "@mui/material"
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AddCardIcon from '@mui/icons-material/AddCard';
import Table, {TableColumn} from "@/components/atoms/TableBancario/TableBancario";
import BalanceIcon from '@mui/icons-material/Balance';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import WalletIcon from '@mui/icons-material/Wallet';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import { Button } from "@/components/atoms/Button/Button"
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import TypeSpecimenRoundedIcon from '@mui/icons-material/TypeSpecimenRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';

export default function RatingBancarioPage() {
  const [personType, setPersonType] = useState("fisica")
  const [document, setDocument] = useState("")
  const [newConsultation, setNewConsultation] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

  const renderConsultaPage = () => (
    <RatingProvider>
      <div className="flex-1 flex flex-col">
        <div className="flex-col h-full flex px-4 sm:px-10 lg:px-16 xl:px-28 py-4 space-y-4">
          {/* Page Content */}
          <div className="flex-1 flex flex-col items-center">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <DescriptionIcon className="text-[#e02725] w-6 h-6" />
                <h1 className="text-xl md:text-2xl font-bold text-[#112331]">Rating Bancário</h1>
              </div>
              <p className="text-sm md:text-base text-gray-600">Relatório analítico de crédito - Rating</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
              <div className="w-full">
                {isLoading && (
                  <div data-testid="loading" className="text-center text-red-600 font-medium mb-4">
                    Carregando...
                  </div>
                )}
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
        </div>
      </div>
    </RatingProvider>
  )
  
  const userClassification = "AA"
  const classifications = ["AAA", "AA", "A", "BBB", "BB", "B", "C", "C-"]

  const isPessoaFisica = personType === "fisica"

  const columnsLimiteCredito: TableColumn[] = [
    { key: "item", label: "Item" },
    { key: "quantidade", label: "Quantidade", icon: <BalanceIcon fontSize="small" className="text-primary-500 mr-1 align-bottom mb-1" /> },
    { key: "ultimaOcorrencia", label: "Última Ocorrência", icon: <CalendarMonthIcon fontSize="small" className="text-primary-500 mr-1 align-bottom mb-1" /> },
    { key: "pontuacao", label: "Pontuação", icon: <CreditScoreIcon fontSize="small" className="text-primary-500 mr-1 align-bottom mb-1" /> },
    { key: "valorTotal", label: "Valor Total", icon: <LocalAtmIcon fontSize="small" className="text-primary-500 mr-1 align-bottom mb-1" /> }
  ]

    const resumoDataFisica = [
        { item: "RGI do Brasil", quantidade: "-", ultimaOcorrencia: "-", pontuacao: "APROVADO", valorTotal: "-" },
        { item: "Cheque Sem Fundo", quantidade: "-", ultimaOcorrencia: "-", pontuacao: "APROVADO", valorTotal: "-" },
        { item: "Protesto Nacional", quantidade: "-", ultimaOcorrencia: "-", pontuacao: "APROVADO", valorTotal: "-" },
        {item: "Recuperação Judicial e Falência", quantidade: "-", ultimaOcorrencia: "-", pontuacao: "APROVADO", valorTotal: "-"},
        { item: "Limite de crédito", quantidade: "0,00", ultimaOcorrencia: "-", pontuacao: "-", valorTotal: "-" },
        {item: "Classificação do Risco de Crédito", quantidade: "AA", ultimaOcorrencia: "-", pontuacao: "-", valorTotal: "-"}
    ]

    const resumoDataJuridica = [
        { item: "RGI do Brasil", quantidade: "273", ultimaOcorrencia: "-", pontuacao: "-", valorTotal: "R$ 113.173,63" },
        { item: "Cheque Sem Fundo", quantidade: "-", ultimaOcorrencia: "-", pontuacao: "APROVADO", valorTotal: "-" },
        { item: "Protesto Nacional", quantidade: "-", ultimaOcorrencia: "-", pontuacao: "APROVADO", valorTotal: "-" },
        {item: "Recuperação Judicial e Falência", quantidade: "-", ultimaOcorrencia: "-", pontuacao: "APROVADO", valorTotal: "-"},
        { item: "Faturamento Presumido", quantidade: "R$: 0,00", ultimaOcorrencia: "-", pontuacao: "-", valorTotal: "-" },
        {item: "Classificação do Risco de Crédito", quantidade: "AA", ultimaOcorrencia: "-", pontuacao: "-", valorTotal: "-"}
    ]

    const resumoData = isPessoaFisica ? resumoDataFisica : resumoDataJuridica

    const columnsInfoCredito: TableColumn[] = [
        { key: "descricao", label: "Descrição" },
        { key: "info", label: "Informações", icon: <InfoOutlineIcon fontSize="small" className="text-primary-500 mr-1 align-bottom mb-1" /> }
    ]
    const resumoInfoFisica = [
        { descricao: "Início de Relacionamento", info: "26/06/2020"},
        { descricao: "Quantidade de Instituições", info: "3"},
        { descricao: "Quantidade de Operações", info: "10"},
        { descricao: "Quantidade de Operações com Manifestação por Discordência", info: "NADA CONSTA"},
        { descricao: "Quantidade de Operações Amparadas por Sub-Judice", info: "NADA CONSTA"},
    ]

    const resumoInfoJuridica = [
        { descricao: "Início de Relacionamento", info: "26/06/2020"},
        { descricao: "Quantidade de Instituições", info: "3"},
        { descricao: "Quantidade de Operações", info: "10"},
        { descricao: "Quantidade de Operações com Manifestação por Discordência", info: "NADA CONSTA"},
        { descricao: "Quantidade de Operações Amparadas por Sub-Judice", info: "NADA CONSTA"},
    ]

    const resumoInfo = isPessoaFisica ? resumoInfoFisica : resumoInfoJuridica
    
    const titleLimiteCredito = isPessoaFisica ? "Limite de Crédito" : "Faturamento Mensal Presumido"

    const mockCardsCarteira: DashboardCardType[] = [
        {
            id: "",
            title: "VALOR A PAGAR:",
            subtitle: "R$ 3.476,97", 
            icon: "payments", 
            path: "#"
        },
        {
            id: "",
            title: "DÍVIDAS NÃO PAGAS:",
            subtitle: "R$ 0,00", 
            icon: "cancel",
            path: "#"
        },
        {
            id: "",
            title: "PREJUÍZO AO SISTEMA FINANCEIRO:",
            subtitle: "R$ 0,00", 
            icon: "warning",
            path: "#"
        },
        {
            id: '',
            title: "LIMITE DE CRÉDITO:",
            subtitle: "R$ 7.222,44", 
            icon: "credit_score",
            path: "#"
        }
    ]

    const columnsCarteira: TableColumn[] = [
      { key: "descricao", label: "Descrição" },
      { key: 'valor', label: "Valor", icon: <LocalAtmIcon fontSize="small" className="text-primary-500 mr-1 align-bottom mb-1" /> },
      { key: 'porcentagem', label: '', icon: <PercentRoundedIcon fontSize="small" className="text-primary-500 mr-1 align-bottom mb-1" /> }
    ]
    const dataCarteriaFisica = [
        { descricao: "EMPRÉSTIMOS"},
        { descricao: 'CARTÃO DE CRÉDITO ? COMPRA, FATURA PARCELADA OU SAQUE FINANCIADO PELA INSTITUIÇÃO EMITENTE DO CARTÃO'},
        { descricao: 'Créditos a vencer em até 30 dias', valor: 'R$ 5,33', porcentagem: '0,05%' },
        { descricao: 'Créditos a vencer em 31 a 60 dias', valor: 'R$ 163,15', porcentagem: '1,52%' },
        { descricao: 'Créditos a vencer em 61 a 90 dias', valor: 'R$ 35,26', porcentagem: '0,33%' },
        { descricao: 'Total', valor: 'R$ 203,74', porcentagem: '1,90%' },
        { descricao: "OUTROS CREDITOS"},
        { descricao: 'CARTÃO DE CRÉDITO - COMPRA À VISTA E PARCELADO LOJISTA'},
        { descricao: 'Créditos a vencer em até 30 dias', valor: 'R$ 2.524,56', porcentagem: '23,60%' },
        { descricao: 'Créditos a vencer em 31 a 60 dias', valor: 'R$ 471,03', porcentagem: '4,40%' },
        { descricao: 'Créditos a vencer em 61 a 90 dias', valor: 'R$ 277,64', porcentagem: '2,59%' },
        { descricao: 'Total', valor: 'R$ 3.273,23', porcentagem: '30,59%' },
        { descricao: "LIMITE"},
        { descricao: 'CARTÃO DE CRÉDITO'},
        { descricao: 'Limite de crédito com vencimento em até 360 dias', valor: 'R$ 7.222,44', porcentagem: '67,50%' },
        { descricao: 'Total', valor: 'R$ 7.222,44', porcentagem: '67,50%' },
      ]
      const dataCarteriaJuridica = [
        { descricao: "ADIANTAMENTOS A DEPOSITANTES"},
        { descricao: 'ADIANTAMENTOS A DEPOSITANTES'},
        { descricao: 'Créditos a vencer em até 30 dias', valor: 'R$ 0,79', porcentagem: '0,00%' },
        { descricao: 'Total', valor: 'R$ 0,79', porcentagem: '0,00%' },
        { descricao: "OUTROS CREDITOS"},
        { descricao: 'CARTÃO DE CRÉDITO - COMPRA À VISTA E PARCELADO LOJISTA'},
        { descricao: 'Créditos a vencer em até 30 dias', valor: 'R$ 238.280,25', porcentagem: '11,29%' },
        { descricao: 'Créditos a vencer em 31 a 60 dias', valor: 'R$ 32.244,86', porcentagem: '1,53%' },
        { descricao: 'Créditos a vencer em 61 a 90 dias', valor: 'R$ 9.438,06', porcentagem: '0,45%' },
        { descricao: 'Créditos a vencer em 91 a 180 dias', valor: 'R$ 28.314,18', porcentagem: '1,34%' },
        { descricao: 'Créditos a vencer em 181 a 360 dias', valor: 'R$ 28.900,77', porcentagem: '1,37%' },
        { descricao: 'Total', valor: 'R$ 337.178,12', porcentagem: '15,98%' },
        { descricao: "LIMITE"},
        { descricao: 'CARTÃO DE CRÉDITO'},
        { descricao: 'Limite de crédito com vencimento em até 360 dias', valor: 'R$ 304.370,75', porcentagem: '14,43%' },
        { descricao: 'Limite de crédito com vencimento acima de 360 dias', valor: 'R$ 1.468.452,15', porcentagem: '69,59%' },
        { descricao: 'Total', valor: 'R$ 1.772.822,90', porcentagem: '84,02%' },
      ]

      const creditData = isPessoaFisica ? dataCarteriaFisica : dataCarteriaJuridica

    const columnsInfoAlertas: TableColumn[] = [ 
        { key: "info", label: "Informação", icon: <InfoOutlineIcon fontSize="small" className="text-primary-500 mr-1 align-bottom mb-1" /> },
        { key: "descricao", label: "Descrição", icon: <ArticleRoundedIcon fontSize="small" className="text-primary-500 mr-1 align-bottom mb-1" /> }
    ]
    const dataInfoAlertasFisica = [
        { info: "STATUS CADASTRO POSITIVO", descricao: "CLIENTE NOTIFICADO, PERIODO DE RESPOSTA ENCERRADO, DADOS PRONTOS PARA SEREM USADOS" },
        { info: "CONSULTAS 30 DIAS", descricao: "QUANTIDADE TOTAL: 0" },
        { info: "CONSULTAS 31 A 60 DIAS", descricao: "QUANTIDADE TOTAL: 0" },
        { info: "CONSULTAS 61 A 90 DIAS", descricao: "QUANTIDADE TOTAL: 0" },
        { info: "CONSULTAS 90+ DIAS", descricao: "QUANTIDADE TOTAL: 0" },
    ]
    const dataInfoAlertasJuridica = [
        { info: "MATRIZ/FILIAL", descricao: "FILIAL" },
        { info: "TEMPO DE ATUAÇÃO", descricao: "21 a 30 anos" },
        { info: "AERONAVES", descricao: "NENHUM REGISTRO ENCONTRADO NAS BASES CONSULTADAS" },
        { info: "IMOVEIS", descricao: "NENHUM REGISTRO ENCONTRADO NAS BASES CONSULTADAS" },
        { info: "SITES", descricao: "aspa.org.br /" },
        { info: "REPRESENTANTE", descricao: "CPF/CNPJ: 03701553866 - MARLINTON SOUZA LOPES" },
        { info: "CNAES SECUNDARIOS", descricao: "9430800-ATIVIDADES DE ASSOCIACOES DE DEFESA DE DIREITOS SOCIAIS /" },
    ]
    const alertasData = isPessoaFisica ? dataInfoAlertasFisica : dataInfoAlertasJuridica

    const columnsPassagens: TableColumn[] = [
        { key: "data", label: "Informação", icon: <CalendarMonthIcon fontSize="small" className="text-primary-500 mr-1 align-bottom mb-1" /> },
        { key: "tipo", label: "Tipo", icon: <TypeSpecimenRoundedIcon fontSize="small" className="text-primary-500 mr-1 align-bottom mb-1" /> },
        { key: "valor", label: "Valor", icon: <LocalAtmIcon fontSize="small" className="text-primary-500 mr-1 align-bottom mb-1" /> },
        { key: "status", label: "Status", icon: <MoreHorizRoundedIcon fontSize="small" className="text-primary-500 mr-1 align-bottom mb-1" /> }
    ]

  const renderResultadosPage = () => (
    <ResultadosTemplate title={"Rating Bancário"} document={document} personType={personType} onNovaConsulta={handleNovaConsulta}>
      {/* CLASSIFICAÇÃO DE CRÉDITO */}
      <div className="mb-6">
        <Section title="Classificação de Risco de Crédito" icon={<QueryStatsIcon className="text-[#e02725] w-6 h-6" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex justify-center items-center h-full">
              <Grid container spacing={4} justifyContent={"center"}> 
                    <Grid className="xs={12} md={6}">
                        <Box className="flex justify-center items-center h-full">
                            <Avatar
                                sx={{
                                    width: 120,
                                    height: 120,
                                    backgroundColor: "transparent",
                                    border: "8px solid #94a3b8", // Cor cinza claro
                                    fontSize: "2.5rem",
                                    fontWeight: "bold",
                                    color: "#e02725", // Cor cinza escuro
                                }}>
                                {userClassification}
                            </Avatar>
                        </Box>
                    </Grid>
                    <Grid className="xs={12}">
                        <Box>
                            <List dense className="w-fit justify-center">
                              {classifications.map((classification) => (
                                  <ListItem key={classification} sx={{ py: 0.5 }}>
                                      <ListItemText
                                          primary={
                                              <div className="flex items-center justify-between">
                                                  <span className="text-sm font-medium">{classification}</span>
                                                  {classification === userClassification && (
                                                      <Chip
                                                          label="Atual"
                                                          size="small"
                                                          color="primary"
                                                          variant="filled"
                                                          sx={{ ml: 2, fontSize: "0.75rem", height: "20px" }}
                                                      />
                                                  )}
                                              </div>
                                          }
                                          sx={{
                                              "& .MuiListItemText-primary": {
                                                  color: classification === userClassification ? "#e02725" : "#112331",
                                                  fontWeight: classification === userClassification ? 600 : 400,
                                              }
                                          }}
                                      />
                                  </ListItem>
                              ))}
                          </List>
                        </Box>
                    </Grid>
                </Grid>
            </div>
            <div className="lg:pr-10">
              <Typography variant="body2" color="#475569" className="mb-3 text-justify">
                A faixa de classificação fornecida visa estimar a classe ou perfil no qual {personType === "fisica" ? "um indivíduo" : "uma empresa"} se insere, com base nas melhores práticas e modelos
                estatísticos disponíveis. No entento, esta estimativa pode não refletir com precisão a renda real {personType === "fisica" ? "do indivíduo" : "da empresa"}. 
                A decisão final de aprovação ou recusa é de responsabilidade exclusiva do cedente. As informações fornecidas 
                pela nosssa empresa têm o objetivo de subsidiar a tomada de decisões, mas, em hipótese alguma, devem ser usadas 
                como critério decisivo para a aprovação ou recusa de {personType === "fisica" ? "um indivíduo" : "uma empresa"}. 
                Outros fatores relevantes devem ser considerados pelo concedente ao tomar sua decisão. 
                O resultado é calculado com base nos dados disponíveis nas melhores bases no momento da consulta.
              </Typography>
            </div>
          </div>
        </Section>
      </div>
      {/* LIMITE DE CRÁDITO */}
      <div className="mb-6">
        <Section title={titleLimiteCredito} icon={<AddCardIcon className="text-[#e02725] w-6 h-6" />}>
          <div className="flex flex-col w-full">
            <Typography variant="body2" color="#475569" className="mb-3 mx-8 text-justify">
              {isPessoaFisica ? 
                "Informa, por meio de faixa de valores em reais, um limite mensal de concessão de crédito para um determinado grupo ou perfil no qual o indivíduo está inserido. É um modelo estatístico que utiliza informações sobre a renda mensal estimada."
                : "O faturamento mensal presumido representa uma estimativa do potencial de geração de receita mensal com base em informações relevantes sobre a renda da empresa e outros dados financeiros. Esse valor reflete o perfil econômico de um grupo, proporcionando uma visão clara de sua capacidade fincanceira. O cálculo leva em conta práticas estatísticas e dados do mercado, oferencendo uma análise precisa do cenário econômico. Essa informação tem como objetivo proporcionar uma compreensão mais ampla do potencial financeiro do indivíduo, sendo útil em diversos contextos financeiros. Contudo, é importante obsevar que as decisões relacionadas a análise de crédito devem considerar outros fatores além do faturamento, a fim de garantir uma visão completa e equilibrada. As informações fornecidas são importantes são confidenciais e geridas de acordo com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709, de 14 de agosto de 2018)."
              }
            </Typography>
            <Typography variant="h3" fontWeight="bold" color="primary" className="mb-3 ml-8">
              R$ 0,00
            </Typography>
            <Box sx={{ borderTop: 1, borderColor: "divider", pt: 1, pb: 2 }}>
              <Typography variant="h6" fontWeight="bold" color="#112331" className="text-center mb-3">
                Resumo
              </Typography>
              <Table columns={columnsLimiteCredito} data={resumoData} />
              <Typography variant="h6" fontWeight="bold" color="#112331" className="text-center my-3">
                Informações Adicionais
              </Typography>
              <Table columns={columnsInfoCredito} data={resumoInfo} />
            </Box>
          </div>    
        </Section>
      </div>
      {/* CARTEIRA DE CRÉDITO */}
      <div className="mb-6">
        <Section title="Carteira de Crédito" icon={<WalletIcon className="text-[#e02725] w-6 h-6" />}>
          <div className="flex flex-col w-full">
            <CardsData dataCards={mockCardsCarteira} data-testid="financial-cards" />
            <Box sx={{ borderTop: 1, borderColor: "divider",mt: 2, pt: 1, pb: 2 }}>
              <Typography variant="h6" fontWeight="bold" color="#112331" className="text-center mb-3">
                Carteira de Crédito Detalhada
              </Typography>
              <Table columns={columnsCarteira} data={creditData} />
            </Box>
          </div>    
        </Section>
      </div>
      {/* ALERTAS RESTRICOES */}
      <div className="mb-6">
        <Section title="Alertas e Restrições" icon={<ErrorRoundedIcon className="text-[#e02725] w-6 h-6" />}> 
          <div className="flex flex-col w-full">
            <Box sx={{ pt: 1, pb: 2 }}>
              <Table columns={columnsInfoAlertas} data={alertasData} />
            </Box>
          </div>
        </Section>
      </div>
      {/* PASSAGENS COMERCIAIS */}
      <div className="mb-6">
        <Section title="Passagens Comerciais" icon={<BusinessCenterRoundedIcon className="text-[#e02725] w-6 h-6" />}> 
          <div className="flex flex-col w-full">
            <Box sx={{ pt: 1, pb: 2 }}>
              <Table columns={columnsPassagens} data={[]} />
            </Box>
          </div>
        </Section>
      </div>
      {/* BOTAO NOVA CONSULTA */}
      <Box textAlign="center" mb={4}>
        <Button className="bg-gray-600 hover:bg-gray-700 text-white" onClick={handleNovaConsulta}>
          Fazer nova consulta
        </Button>
      </Box>
      {/* COPYRIGHT */}
      <CopyRight />
    </ResultadosTemplate>
  )

  return showResults ? renderResultadosPage() : renderConsultaPage();
}
