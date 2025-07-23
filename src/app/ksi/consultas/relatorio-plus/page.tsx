'use client'

import { useState } from "react";
import { RatingProvider } from "@/contexts/RatingContext/RatingContext";
import Button from "@/components/atoms/Button/Button";
import { ResultadosTemplate } from "@/components/template/ResultadosTemplate/ResultadosTemplate";
import { FormularioConsulta } from "@/components/molecules/FormConsulta/FormConsulta";
import CardDescription from "@/components/molecules/CardDescription/CardDescription";
import CopyRight from "@/components/atoms/CopyRight/CopyRight";
import { validateDocument } from "@/utils/Validator";
import Table, { TableColumn } from "@/components/atoms/TableBancario/TableBancario";
import SectionSCRBacen from "@/components/molecules/SectionConsultasBancarias/SectionConsultasBancarias";
import ContainerTable from "@/components/molecules/ContainerTable/ContainerTable";
import AnaliseChequeSustado from "@/components/molecules/AnaliseChequeSustado/AnaliseChequeSustado";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import DescriptionIcon from "@mui/icons-material/Description";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import HouseRoundedIcon from "@mui/icons-material/HouseRounded";


export default function RelatorioPlusPage() {
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
    if (document.trim() && validateDocument(document)) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setShowResults(true)
      }, 1500)
    }
  }

  const itensDescription = [
    {item: "RGI do Brasil."},
    {item: "Dívida Interna."},
    {item: "Protesto Nacional CENPROT (Cortesia)."},
    {item: "Cheque Sem Fundo Bacen."},
    {item: "Recuperação Judicial e Falência."},
    {item: "Histórico de Consultas."},
    {item: "Participação Societária."},
    {item: "Endereços."},
    {item: "Contatos Encontrados."},
    {item: "Pessoas para Contato."}
  ]

  const renderConsultaPage = () => (
    <RatingProvider>
            <div className="flex-1 flex flex-col" data-testid="consulta-page">
                <div className="flex-col h-full flex px-4 sm:px-10 lg:px-20 2xl:px-72 py-4 space-y-4">
                  <div className="m-2" data-testid="page-header">
                    <div className="flex items-center space-x-2 mb-2">
                      <DescriptionIcon className="text-[#e02725] w-6 h-6" />
                      <h1 className="text-xl md:text-2xl font-bold text-[#112331]" data-testid="page-title">Relatório Plus</h1>
                    </div>
                  </div>
                  {/* Page Content */}
                  <div className="flex flex-col lg:flex-row">
                    <div className="flex-1 flex flex-col lg:w-1/2 m-3">
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

  //mock alertas restricoes
  const columnsResumo: TableColumn[] = [
    { key: 'descricao', label: '', align: 'left' },
    { key: 'quantidade', label: 'Quantidade', align: 'center', icon: <AddRoundedIcon className="text-red-500 align-bottom" />},
    { key: 'valorTotal', label: 'Valor Total', align: 'center', icon: <LocalAtmIcon className="text-red-500 align-bottom" />, render: (value) => value ? `R$ ${value}` : 'R$ 0,00' },
  ]
  const dataResumo = personType === 'fisica' ? [
    { descricao: 'RGI do Brasil', quantidade: '-', valorTotal: '' },
    { descricao: 'Dívida Interna', quantidade: '-', valorTotal: '' },
    { descricao: 'Protesto Nacional CENPROT (Cortesia)', quantidade: '-', valorTotal: '' },
    { descricao: 'Cheque Sem Fundo Bacen', quantidade: '-', valorTotal: '' },
    { descricao: 'Recuperação Judicial e Falência', quantidade: '-', valorTotal: '' },
    { descricao: 'Histórico de Consultas', quantidade: '4', valorTotal: '' },
    { descricao: 'Participação Societária', quantidade: '1', valorTotal: '' },
    { descricao: 'Endereços', quantidade: '8', valorTotal: '' },
    { descricao: 'Telefones Encontrados', quantidade: '11', valorTotal: '' },
    { descricao: 'Emails Encontrados', quantidade: '2', valorTotal: '' },
    { descricao: 'Pessoas Contato', quantidade: '6', valorTotal: '' },
  ] : [
    { descricao: 'RGI do Brasil', quantidade: '-', valorTotal: '' },
    { descricao: 'Dívida Interna', quantidade: '-', valorTotal: '' },
    { descricao: 'Protesto Nacional CENPROT (Cortesia)', quantidade: '-', valorTotal: '' },
    { descricao: 'Cheque Sem Fundo Bacen', quantidade: '-', valorTotal: '' },
    { descricao: 'Recuperação Judicial e Falência', quantidade: '-', valorTotal: '' },
    { descricao: 'Histórico de Consultas', quantidade: '-', valorTotal: '' },
    { descricao: 'Participação Societária', quantidade: '-', valorTotal: '' },
    { descricao: 'Endereços', quantidade: '-', valorTotal: '' },
    { descricao: 'Telefones Encontrados', quantidade: '-', valorTotal: '' },
    { descricao: 'Emails Encontrados', quantidade: '-', valorTotal: '' },
    { descricao: 'Pessoas Contato', quantidade: '-', valorTotal: '' },
  ]

  //colunas tabela RGI
  const columnsRGI: TableColumn[] = [
    { key: 'dataOcorrencia', label: 'Data da Ocorrência', align: 'left', icon: <CalendarMonthRoundedIcon className="text-red-500 align-bottom mr-1"/> },
    { key: 'informante', label: 'Informante', align: 'center', icon: <AccountBalanceRoundedIcon className="text-red-500 align-bottom mr-1"/> },
    { key: 'valor', label: 'Valor', align: 'center', icon: <LocalAtmIcon className="text-red-500 align-bottom mr-1"/>, render: (value) => value ? `R$ ${value}` : 'R$ 0,00' },
  ]

  //colunas tabela historico de consultas
  const columnsHistoricoConsultas: TableColumn[] = [
    { key: 'dataConsulta', label: 'Data da Consulta', align: 'left', icon: <CalendarMonthRoundedIcon className="text-red-500 align-bottom mr-1"/> },
    { key: 'informante', label: 'Informante', align: 'center', icon: <AccountBalanceRoundedIcon className="text-red-500 align-bottom mr-1"/> },
  ]
  // mock data historico de consultas
  const dataHistoricoConsultas = personType === 'fisica' ? [
    { dataConsulta: '23/05/2025', informante: 'SP-BRE/LOCSEGMASTER' },
    { dataConsulta: '23/04/2025', informante: 'CAIXA ECONOMICA FEDERAL' },
    { dataConsulta: '30/03/2025', informante: 'NUBANK BV 1' },
    { dataConsulta: '20/03/2025', informante: 'FOMENTO DO PARANA' },
  ] : []

  //colunas tabela participacao em empresas
  const columnsParticipacaoEmpresas: TableColumn[] = [
    { key: 'cnpj', label: 'CNPJ', align: 'left', icon: <AccountBalanceRoundedIcon className="text-red-500 align-bottom mr-1"/> },
    { key: 'dataEntrada', label: 'Data Entrada', align: 'center', icon: <CalendarMonthRoundedIcon className="text-red-500 align-bottom mr-1"/> },
    { key: 'nomeEmpresa', label: 'Nome Empresa', align: 'center', icon: <BorderColorRoundedIcon className="text-red-500 align-bottom mr-1"/> },
    { key: 'posicao', label: 'Posição', align: 'center', icon: <AssignmentRoundedIcon className="text-red-500 align-bottom mr-1"/> }
  ]
  // mock data participacao em empresas
  const dataParticipacaoEmpresas = personType === 'fisica' ? [
    { cnpj: '19.934.718/0001-83', dataEntrada: '24/03/2014', nomeEmpresa: '19.934.718 BEATRIZ PRESTES DE JESUS', posicao: '' },
  ] : []

  //colunas tabela enderecos
  const columnsEnderecos: TableColumn[] = [
    { key: 'cep', label: 'CEP', align: 'left' },
    { key: 'uf', label: 'UF', align: 'center' },
    { key: 'cidade', label: 'Cidade', align: 'center' },
    { key: 'bairro', label: 'Bairro', align: 'center' },
    { key: 'logradouro', label: 'Logradouro', align: 'center' },
    { key: 'numero', label: 'Nº', align: 'center' },
    { key: 'complemento', label: 'Complemento', align: 'center' },
  ]
  // mock data enderecos
  const dataEnderecos = personType === 'fisica' ? [
    { cep: '85015-080', uf: 'PR', cidade: 'Guarapuava', bairro: 'Santa Cruz', logradouro: 'Av. Ver Rubem Siqueira Ribas', numero: '2868', complemento: '' },
    { cep: '85862-355', uf: 'PR', cidade: 'Foz do Iguaçu', bairro: 'Três Lagoas', logradouro: 'R. Quatro Pontes', numero: '383', complemento: '' },
    { cep: '66534-20', uf: 'SP', cidade: 'Itapevi', bairro: 'Jardim Julieta', logradouro: 'R. Alziro Vieira', numero: '81', complemento: '' },
    { cep: '85015-290', uf: 'PR', cidade: 'Grarapuava', bairro: 'Batel', logradouro: 'R. Dr. Laranjeiras', numero: '1927', complemento: '' },
    { cep: '85020-110', uf: 'PR', cidade: 'Gurarapuava', bairro: 'Boqueirao', logradouro: 'R. S. Mateus do Sul', numero: '136', complemento: '' },
  ] : []
  

  //colunas tabela telefones
  const columnsTelefones: TableColumn[] = [ 
    { key: 'ddd', label: 'DDD', align: 'left' },
    { key: 'numero', label: 'Número', align: 'center' },
  ]
  // mock data telefones
  const dataTelefones = personType === 'fisica' ?[
    { ddd: '42', numero: '99102-2089' },
    { ddd: '42', numero: '98406-4101' },
    { ddd: '42', numero: '99728-3267' },
    { ddd: '42', numero: '99814-7366' },
    { ddd: '42', numero: '98407-2028' },
    { ddd: '42', numero: '98409-0542' },
    { ddd: '42', numero: '99814-7366' },
    { ddd: '42', numero: '98407-2028' },
    { ddd: '42', numero: '98407-4104' },
    { ddd: '11', numero: '99728-3267' },
    { ddd: '11', numero: '3623-1711' },
    { ddd: '11', numero: '99972-8326' },
  ] : []

  //colunas tabela emails
  const columnsEmails: TableColumn[] = [
    { key: 'email', label: 'Endereços de E-mail', align: 'left' },
  ]
  //mock data emails
  const dataEmails = personType === 'fisica' ? [
    { email: 'deived_prestes@hotmail.com' },
    { email: ' beatrizprestes351@gmail.com' },
  ] : []

  // colunas pessoas contato    
  const columnsPessoasContato: TableColumn[] = [
    { key: 'cpf', label: 'CPF', align: 'left' },
    { key: 'nome', label: 'Nome', align: 'center' },
    { key: 'parentesco', label: 'Parentesco', align: 'center' },
  ]
  // mock data pessoas contato
  const dataPessoasContato = personType === 'fisica' ? [
    { cpf: ' 110.742.639-10', nome: 'Samuel Handel Prestes Jesus', parentesco: 'Filho' },
    { cpf: '411.636.999-34', nome: 'João Prestes de Jesus', parentesco: 'Avô' },
    { cpf: ' 436.062.889-72', nome: 'Sebastião Prestes de Jesus', parentesco: 'Pai' },
    { cpf: '956.712.189-34', nome: 'Ana Maria de Souza Prestes da Rosa', parentesco: 'Tio(a)' },
    { cpf: '066.799.379-73', nome: 'Diego Prestes de Jesus', parentesco: 'Parceiro(a)' },
  ] : []

  const [expandido, setExpandido] = useState(false);
  
  const renderResultadosPage = () => (
    <ResultadosTemplate title={"Relatório Plus"} document={document} personType={personType} onNovaConsulta={handleNovaConsulta} data-testid='results-template'>
      <div className="flex flex-col w-full gap-4 lg:gap-6 max-w-7xl mx-auto" data-testid="results-container">
          <div className="flex flex-col gap-4 w-full justify-center" data-testid="resume-container">
            <SectionSCRBacen data-testid="section-resumo">
              <div className="flex flex-col gap-4 w-full" data-testid="resumo-content">
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
                    <div data-testid="resumo-table-container">
                        <Table columns={columnsResumo} data={dataResumo}/>
                    </div>
                )}
              </div>
            </SectionSCRBacen>
            <SectionSCRBacen data-testid="section-negative">
              <div className="flex w-full flex-col items-center text-center gap-4" data-testid="negative-content">
                <p> Prezado cliente, recupere seu dinheiro agora! Negativando GRATUITAMENTE no RGI (registro geral de inadimplente do Brasil).</p>
                <Button data-testid="buttom-negative" className="text-gray-700" variant="secondary" size="small">Negative Agora!</Button>
              </div>
            </SectionSCRBacen>
          </div>
          <div data-testid="section-detalhes">
            <div className="flex flex-row items-center gap-1 mb-2" data-testid="detalhes-header">
              <ArticleRoundedIcon className="text-red-500 align-bottom" data-testid="icon-detalhes-header"/>
              <h2 className="text-secondary-800" data-testid="title-resumo">Detalhes</h2>
            </div>
            <ContainerTable
              icon={<HouseRoundedIcon />}
              title="RGI - Registro Geral de Inadimplentes Do Brasil"
              titleTag="h3"
              data-testid="table-RGI"
              columns={columnsRGI}
              data={[]}
            />
            <ContainerTable
              icon={<AutoStoriesRoundedIcon/>}
              title="Histórico de Consultas (Cortesia)"
              titleTag="h3"
              data-testid="table-historico-consultas"
              columns={columnsHistoricoConsultas}
              data={dataHistoricoConsultas}
            />
            <ContainerTable
              icon={<HandshakeRoundedIcon />}
              title="Participação em Empresas (Cortesia)"
              titleTag="h3"
              data-testid="table-participacao-empresas"
              columns={columnsParticipacaoEmpresas}
              data={dataParticipacaoEmpresas}
            />
          </div>
          <div data-testid="section-informacoes">
            <div data-testid="informacoes-header" className="flex flex-row items-center gap-1 mb-2">
              <InfoRoundedIcon className="text-red-500" data-testid="icon-informacoes-header"/>
              <h2 className="text-secondary-800" data-testid="title-informacoes">Informações</h2>
            </div>
            <ContainerTable
              icon={<PlaceRoundedIcon />}
              title="Endereços"
              titleTag="h3"
              data-testid="table-enderecos"
              columns={columnsEnderecos}
              data={dataEnderecos}
            />
            <ContainerTable
              icon={<LocalPhoneRoundedIcon />}
              title="Telefones"
              titleTag="h3"
              data-testid="table-telefones"
              columns={columnsTelefones}
              data={dataTelefones}
            />
            <ContainerTable
              icon={<EmailRoundedIcon />}
              title="E-mails"
              titleTag="h3"
              data-testid="table-emails"
              columns={columnsEmails}
              data={dataEmails}
            />
            <ContainerTable
              icon={<PeopleRoundedIcon />}
              title="Pessoas para Contato (Cortesia)"
              titleTag="h3"
              data-testid="table-pessoas-contato"
              columns={columnsPessoasContato}
              data={dataPessoasContato}
            />
          </div>
          <div data-testid="section-analise-cheque-sustado">
            <AnaliseChequeSustado/>
          </div>
      </div>
      <CopyRight data-testid="copyright" />
    </ResultadosTemplate>
  )
  return showResults ? renderResultadosPage() : renderConsultaPage();
}