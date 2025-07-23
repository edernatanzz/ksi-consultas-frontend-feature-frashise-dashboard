'use client'

import { useState } from "react";
import { RatingProvider } from "@/contexts/RatingContext/RatingContext";
import DescriptionIcon from "@mui/icons-material/Description";
import { ResultadosTemplate } from "@/components/template/ResultadosTemplate/ResultadosTemplate";
import { FormularioConsulta } from "@/components/molecules/FormConsulta/FormConsulta";
import CardDescription from "@/components/molecules/CardDescription/CardDescription";
import CardOptionalData from "@/components/molecules/CardOptionalData/CardOptionalData";
import { AnaliseIA } from "@/components/atoms/AnaliseIA/AnaliseIA";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { TabPainel } from "@/components/organisms/TabPainel/TabPainel";
import { renderResultadosCreditos } from "@/components/organisms/TabResultadosCredito/renderResultadosCreditos";
import { renderResultadosContato } from "@/components/organisms/TabResultadosContato/renderResultadosContato";
import renderResultadosInformacoes from "@/components/organisms/TabResultadosInformacoes/renderResultadosInformacoes";
import CopyRight from "@/components/atoms/CopyRight/CopyRight";
import Medidores from '@/components/molecules/MedidoresPontScore/MedidoresPontScore';
import { validateDocument } from "@/utils/Validator";
import Section from "@/components/molecules/SectionConsultasBancarias/SectionConsultasBancarias";
import { Box } from "@mui/material";
import { Button } from "@/components/atoms/Button/Button"

export default function RelatorioTopPage() {
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
    {item: "CADIN Federal, Estadual e Municipal", id: "cadin"},
    {item: "Renda familiar", id: "rendaFamiliar"},
    {item: "Ação Judicial Nacional", id: "acaoJudicial"},
    {item: "SCR - Banco Central", id: "SCR"},
    {item: "Óbito (NOVO)", id: "obito"},
  ]

  const renderConsultaPage = () => (
    <RatingProvider>
            <div className="flex-1 flex flex-col">
                <div className="flex-col h-full flex px-4 sm:px-10 lg:px-20 2xl:px-72 py-4 space-y-4">
                  <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <DescriptionIcon className="text-[#e02725] w-6 h-6" />
                      <h1 className="text-xl md:text-2xl font-bold text-[#112331]">Relatório Top</h1>
                    </div>
                    <p className="text-sm md:text-base text-gray-600">Análise completa de crédito e score</p>
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
                            EM CASO DE DÚVIDAS ENTRAR EM CONTATO COM SEU CONSULTOR CORPORATIVO
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
                    {/* Card da descrição do relatório, reutulizável */}
                    <CardDescription title="Descrição" data={itensDescription} />
                  </div>
                </div>
            </div>
    </RatingProvider>
  )

  const mockContatoData = {
  data: [
    { email: "contato@empresa.com" },
    { telefone: "(11) 99999-9999" }
  ],
  enderecos: [
    {
      logradouro: "Rua Exemplo",
      numero: "123",
      bairro: "Centro", 
      cidade: "São Paulo",
      estado: "SP"
    }
  ],
  pessoas: [
    { nome: "João da Silva", documento: "05565485245", descricao: "Irmão" }
  ]
};

const scorePersonType = personType === 'fisica' ? 633 : 312;
const pontualidadePersonType = personType === 'fisica' ? 81.17 : 17.42;

const itensTabPainel = [
  { label: "Pendências", id: "creditos", content: () => renderResultadosCreditos() },
  { label: "Informações", id: "informacoes", content: () => renderResultadosInformacoes({ personType, opcionalSelected }) },
  { label: "Contato", id: "contato", content: () => renderResultadosContato(mockContatoData) },
]
  
  const renderResultadosPage = () => (
    <ResultadosTemplate title={"Relatório TOP"} document={document} personType={personType} onNovaConsulta={handleNovaConsulta}>
      <div className="flex flex-col w-full gap-4 lg:gap-6 max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 w-full justify-center">
            <AnaliseIA />
            <Section title="Dados Financeiros" icon={<DescriptionIcon className="text-[#e02725] w-6 h-6" />}>
              <div className="flex flex-col gap-4">
                <div data-testid="detalhes-medidores-section">
                  <Medidores Score={scorePersonType} Pontualidade={pontualidadePersonType} />
                </div>
                {personType === 'fisica' ? (
                    <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-4'>
                        <div>
                          {/* LIMITE DE CREDITO */}
                            <div data-testid="limite-credito-container" className='flex flex-col w-full items-center justify-center p-2 mb-2 mt-2 rounded-lg'>
                                <div data-testid="limite-credito-card" className='bg-white w-full p-4 rounded-lg shadow-md mt-4 flex flex-col items-center '>
                                    <div data-testid="limite-credito-title-container" className='flex items-center gap-2 mb-2 justify-center'>
                                        <CreditCardIcon data-testid="limite-credito-icon" className='text-primary-500' fontSize='medium' />
                                        <h3 data-testid="limite-credito-title">Limite de Crédito</h3>
                                    </div>
                                    <div data-testid="limite-credito-value-container" className='flex justify-center items-center flex-col'>
                                        <h2 data-testid="limite-credito-value" className='text-primary-500 font-bold mb-2 bg-secondary-50 w-fit p-2 rounded-md'>R$ 6.000,00</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                          {/* RENDA PRESUMIDA */}
                          <div data-testid="renda-presumida-container" className='flex flex-col w-full items-center justify-center p-4 mb-2 rounded-lg'>
                            <div data-testid="renda-presumida-card" className='bg-white w-full p-4 rounded-lg shadow-md mt-4 flex flex-col justify-center items-center'>
                              <div data-testid="renda-presumida-title-container" className='flex items-center gap-2 mb-2 justify-center'>
                                <AttachMoneyIcon data-testid="renda-presumida-icon" className='text-primary-500' fontSize='medium'/>
                                <h3 data-testid="renda-presumida-title">Renda Presumida</h3>
                              </div>
                              <div data-testid="renda-presumida-value-container" className='flex justify-center items-center flex-col'>
                                <h2 data-testid="renda-presumida-value" className='text-primary-500 font-bold mb-2 bg-secondary-50 w-fit p-2 rounded-md'>R$ 9.934,10</h2>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-4'>
                        <div>
                          {/* LIMITE DE CREDITO */}
                            <div data-testid="limite-credito-container" className='flex flex-col w-full items-center justify-center p-2 mb-2 rounded-lg'>
                                <div data-testid="limite-credito-card" className='bg-white w-full p-4 rounded-lg shadow-md mt-4 flex flex-col items-center '>
                                    <div data-testid="limite-credito-title-container" className='flex items-center gap-2 mb-2 justify-center'>
                                        <CreditCardIcon data-testid="limite-credito-icon" className='text-primary-500' fontSize='medium' />
                                        <h3 data-testid="limite-credito-title">Limite de Crédito</h3>
                                    </div>
                                    <div data-testid="limite-credito-value-container" className='flex justify-center items-center flex-col'>
                                        <h2 data-testid="limite-credito-value" className='text-primary-500 font-bold mb-2 bg-secondary-50 w-fit p-2 rounded-md'>R$ 100.000,00</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                          {/* FATURAMENTO PRESUMIDO */}
                            <div data-testid="faturamento-presumido-container" className='flex flex-col w-full items-center justify-center p-2 mb-2 rounded-lg'>
                                <div data-testid="faturamento-presumido-card" className='bg-white w-full p-4 rounded-lg shadow-md mt-4 flex flex-col justify-center items-center'>
                                    <div data-testid="faturamento-presumido-title-container" className='flex items-center gap-2 mb-2 justify-center'>
                                        <AttachMoneyIcon data-testid="faturamento-presumido-icon" className='text-primary-500' fontSize='medium'/>
                                        <h3 data-testid="faturamento-presumido-title">Faturamento Presumido (Cortesia)</h3>
                                    </div>
                                    <div data-testid="faturamento-presumido-value-container" className='flex justify-center items-center flex-col'>
                                        <h2 data-testid="faturamento-presumido-value" className='text-primary-500 font-bold mb-2 bg-secondary-50 w-fit p-2 rounded-md'>R$ 160.000,00</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
              </div>
            </Section>
          </div>
      </div>
      <div className="flex justify-center">
        <TabPainel label={itensTabPainel}/>
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
