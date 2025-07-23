// Endereço
export interface Endereco {
  cep: string;
  uf: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  numero: string | null;
  complemento: string | null;
}

// Pessoa contato
export interface PessoaContato {
  nome: string;
  documento: string;
  descricao: string;
}

// Participação societária
export interface ParticipacaoSocietaria {
  cnpj: string;
  razaoSocial: string;
  posicao: string | null;
  situacao: string;
}

// Modalidade
export interface Modalidade {
  codigo: string;
  descricao: string;
}

// Vencimento
export interface Vencimento {
  codigo: string;
  descricao: string;
  valor: string;
  percentual: string;
  restritivo: string;
  qtdMeses: string;
}

// Operação financeira
export interface Operacao {
  modalidade: Modalidade;
  subModalidade: Modalidade;
  variacaoCambial: string;
  total: string;
  percentual: string;
  vencimentos: Vencimento[];
}

// Carteira de crédito
export interface CarteiraCredito {
  creditoAvencer: string;
  creditoVencido: string;
  prejuizo: string;
  limiteCredito: string;
}

// Score
export interface Score {
  pontuacao: string;
  faixa: string;
}

// Cheque sem fundos
export interface ChequeSemFundos {
  banco: string;
  agencia: string;
  conta: string;
  cheque: string;
  dataOcorrencia: string;
  valor: number;
  motivo: string;
}

// Registro Boa Vista
export interface RegistroBoaVista {
  data: string;
  valor: number;
  origem: string;
  descricao: string;
}

// Pendência específica
export interface Pendencia {
  origem: string;
  descricao: string;
  valor: number;
  dataVencimento: string;
  situacao: string;
}

// Registro SCR
export interface RegistroScr {
  databaseConsultada: string;
  dataInicioRelacionamento: string;
  quantidadeInstituicoes: string;
  quantidadeOperacoes: string;
  quantidadeOperacoesDiscordancia: string;
  quantidadeOperacoesSubjudice: string;
  score: Score | null;
  score1: Score;
  carteiraCredito: CarteiraCredito;
  operacoes: Operacao[] | null;
  operacoes1: Operacao[];
}

// Protesto
export interface Protesto {
  cartorio: string;
  endereco: string;
  municipio: string;
  data: string;
  valor: number;
}

// Ocorrência
export interface Ocorrencia {
  codigoTipoInformacao?: string;
  descricaoTipoInformacao?: string;
  titulo?: string;
  observacoes?: string;
  dataConsulta?: string;
  horaConsulta?: string;
  clienteConsulta?: string;
  telefoneCliente?: string;
  cidadeUfCliente?: string;
}

// Status retorno
export interface StatusRetorno {
  codigo: string;
  descricao: string;
}

// Informações alertas restrições
export interface InformacoesAlertasRestricoes {
  statusRetorno: StatusRetorno;
  quantidadeOcorrencia: string;
  ocorrencias: Ocorrencia[];
}

// Passagens comerciais
export interface PassagensComerciais {
  statusRetorno: StatusRetorno;
  quantidadeOcorrencia: string;
  ocorrencias: Ocorrencia[];
}

// Ações cíveis
export interface AcoesCiveis {
  quantidadeOcorrencia: string;
  ocorrencias: Ocorrencia[];
}

// Informações adicionais
export interface InformacoesAdicionais {
  informacoesAlertasRestricoes: InformacoesAlertasRestricoes;
  passagensComerciais: PassagensComerciais;
  acoesCiveis: AcoesCiveis;
}

// Cadastro PF
export interface CadastroPF {
  nome: string;
  documento: string;
  dataNascimento: string;
  qntEmails: number;
  emails: string[];
  qntTelefones: number;
  telefones: string[];
  qntEnderecos: number;
  enderecos: Endereco[];
  score: number;
  pontualidadeDePagamento: number;
  limiteDeCredito: number;
  rendaEstimada: number;
  nomeDaMae: string;
  situacaoCpf: string;
  rg: string;
  clientePremium: string;
  classeSocial: string;
  qntPessoasContatos: number;
  pessoasContatos: PessoaContato[];
  qntParticipacaoSocietaria: number;
  participacoesSocietaria: ParticipacaoSocietaria[];
}

// Cadastro PJ
export interface CadastroPJ {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  dataFundacao: string;
  telefones: string[];
  emails: string[];
  endereco: Endereco;
  capitalSocial: number;
  situacaoCadastral: string;
  naturezaJuridica: string;
  cnaePrincipal: {
    codigo: string;
    descricao: string;
  };
  cnaeSecundarios: {
    codigo: string;
    descricao: string;
  }[];
  sociosAdministradores: {
    nome: string;
    documento: string;
    participacao: string;
    dataEntrada: string;
  }[];
  faturamentoPresumido: number;
  quantidadeFuncionarios: number;
}

// Pendências financeiras 
export interface PendenciasFinanceiras {
  totalDividas: number;
  quantidadePendencias: number;
  pendencias: Pendencia[];
}

// Relatório rating bancário -
export interface RelatorioRatingBancario {
  classificacaoRisco: string;
  comprometimentoRenda: string;
  recuperacaoFalencia: string;
  cadastraispf: CadastroPF | null;
  cadastraispj: CadastroPJ | null;
  quantidadeChSemFundos: number;
  registrosChSemFundos: ChequeSemFundos[]; 
  quantidadeBoaVista: number;
  registrosBoaVista: RegistroBoaVista[];
  registroScr: RegistroScr;
  contemProtesto: boolean;
  qntProtesto: number;
  valorTotalProtesto: number;
  registrosProtesto: Protesto[];
  informacoesAdicionais: InformacoesAdicionais;
  contemRestricoesSinteticas: boolean;
  qntRestricoesSinteticas: number;
  valorTotalRestricoesSinteticas: number;
  pendenciasFinanceiras?: PendenciasFinanceiras;
}

// Resposta da consulta
export interface ConsultaResponse {
  baseDisponivel: boolean;
  logQuery: string;
  relatorioRatingBancario: RelatorioRatingBancario;
}

// Tipo do resultado de consulta
export interface ResultadoConsulta {
  success: boolean;
  data?: ConsultaResponse;
  message?: string;
}

// Estado da consulta
export interface ConsultaState {
  loading: boolean;
  resultado: ResultadoConsulta | null;
  error: string | null;
}

// Tipo de documento
export type TipoDocumento = 'cpf' | 'cnpj';

// Tipo para erros de API
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}