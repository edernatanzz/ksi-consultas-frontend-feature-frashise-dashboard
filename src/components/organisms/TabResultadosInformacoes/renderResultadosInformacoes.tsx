'use client';

import FormatListNumberedRoundedIcon from '@mui/icons-material/FormatListNumberedRounded';
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';
import Table, { TableColumn } from "@/components/atoms/TableBancario/TableBancario";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import BalanceRoundedIcon from '@mui/icons-material/BalanceRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import DocumentScannerRoundedIcon from '@mui/icons-material/DocumentScannerRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';


interface renderResultadosInformacoesProps {
    personType: string;
    opcionalSelected: string[];
}

const columnsRestricoes: TableColumn[] = [
    { key: 'descricao', label: 'Descrição', align: 'left', icon: <ArticleRoundedIcon className="text-primary-500 align-bottom mr-1"/>, colorHeader: 'bg-secondary-50', colorTextHeader: 'text-secondary-800', colorLine: 'bg-secondary-25' },
    { key: 'quantidade', label: 'Quantidade',  align: 'center', icon: <BalanceRoundedIcon className="text-primary-500 align-bottom mr-1"/>, colorTextHeader: 'text-secondary-800' },
    { key: 'ultimaOcorrencia', label: 'Última Ocorrência',  align: 'center', icon: <CalendarMonthRoundedIcon className="text-primary-500 align-bottom mr-1"/>, colorTextHeader: 'text-secondary-800' },
    { key: 'valorTotal', label: 'Valor Total',  align: 'center', icon: <PaidRoundedIcon className="text-primary-500 align-bottom mr-1"/>, colorTextHeader: 'text-secondary-800' },
];
const dataRestricoes = [
    { descricao: 'REGISTRO DE SPC', quantidade: 0, ultimaOcorrencia: '--/--/----', valorTotal: "R$ 0,00" },
    { descricao: 'PENDENCIAS FINANCEIRAS SERASA', quantidade: 8, ultimaOcorrencia: '05/01/2025', valorTotal: "R$ 8.484,28" },
];

const columnsRestricoesPlus: TableColumn[] = [
    { key: 'descricao', label: 'Informações', align: 'left', icon: <AddRoundedIcon className="text-primary-500 align-bottom mr-1" />, colorHeader: 'bg-secondary-50', colorTextHeader: 'text-secondary-800', colorLine: 'bg-secondary-25' },
    { key: 'info', label: '',  align: 'right', colorTextHeader: 'text-secondary-800' },
];
const dataRestricoesPlusFisica = [
    { descricao: 'Cliente Premium:', info: "Não" },
    { descricao: 'Classe Social:', info: "C2" },
    { descricao: 'Recuperação Judicial e Falência:', info: "Nada consta" },
];
const dataRestricoesPlusJuridica = [
    { descricao: 'Atividade Social:', info: "Não informado" },
    { descricao: 'Capital Social:', info: 0 },
];

const columnsParticipacao: TableColumn[] = [
    { key: 'nomeEmpresa', label: 'Nome da Empresa', align: 'left', icon: <AccountBalanceRoundedIcon className="text-primary-500 align-bottom mr-1"/>, colorHeader: 'bg-secondary-50', colorTextHeader: 'text-secondary-800', colorLine: 'bg-secondary-25' },
    { key: 'cnpj', label: 'CNPJ', align: 'center', icon: <DocumentScannerRoundedIcon className="text-primary-500 align-bottom mr-1"/>,colorTextHeader: 'text-secondary-800' },
    { key: 'participacao', label: 'Participação', align: 'center', icon: <HandshakeRoundedIcon className="text-primary-500 align-bottom mr-1"/>,colorTextHeader: 'text-secondary-800' },
];

const columnsAlertas: TableColumn[] = [
    { key: 'descricao', label: 'Descrição', align: 'left', icon: <ArticleRoundedIcon className="text-primary-500 align-bottom mr-1"/>, colorHeader: 'bg-secondary-50', colorTextHeader: 'text-secondary-800', colorLine: 'bg-secondary-25' },
    { key: 'info', label: 'Informação',  align: 'center', icon: <AddRoundedIcon className="text-primary-500 align-bottom mr-1"/>, colorTextHeader: 'text-secondary-800' },
];
const dataAlertas = [
    { descricao: 'Status Cadastro Positivo', info: 'Cliente notificado, período de resposta encerrado, dados prontos para serem usados.' },
    { descricao: 'Consultas 30 dias', info: 0 },
    { descricao: 'Consultas 31 a 60 dias', info: 0 },
    { descricao: 'Consultas 61 a 90 dias', info: 0 },
    { descricao: 'Consultas mais de 90 dias', info: 0 },
];

const columnsPassagens: TableColumn[] = [
    { key: 'data', label: 'Data', align: 'left', icon: <CalendarMonthRoundedIcon className="text-primary-500 align-bottom mr-1"/>, colorHeader: 'bg-secondary-50', colorTextHeader: 'text-secondary-800', colorLine: 'bg-secondary-25' },
    { key: 'descricao', label: 'Descrição',  align: 'right', icon: <AccountBalanceRoundedIcon className="text-primary-500 align-bottom mr-1"/>, colorTextHeader: 'text-secondary-800' },
];
const dataPassagens = [
    { data: "19/05/2025", descricao: "CAIXA ECONOMICA FEDERAL" },
    { data: "11/04/2025", descricao: "CAIXA ECONOMICA FEDERAL" },
    { data: "14/03/2025", descricao: "CAIXA ECONOMICA FEDERAL" },
];

const dataResumoSCR = [
    { descricao: 'Início de Relacionamento:', info: "31/12/1972" },
    { descricao: 'Quantidade de Instituições:', info: "2" },
    { descricao: 'Quantidade de Operações:', info: "28" },
    { descricao: 'Quantidade de Operações com Manifestação por Discordância:', info: "Nada Consta" },
    { descricao: 'Quantidade de Operações Amparadas por Sub-Judice:', info: "Nada Consta" },
];
const columnsScore: TableColumn[] = [
    { key: 'score', label: 'Score', align: 'left', icon: <SpeedRoundedIcon className="text-primary-500 align-bottom mr-1"/>, colorHeader: 'bg-secondary-50', colorTextHeader: 'text-secondary-800', colorLine: 'bg-secondary-25' },
    { key: 'valor', label: '',  align: 'right', colorTextHeader: 'text-secondary-800' },
];
const dataScore = [
    { score: 'Score', valor: '950 Pontos' },
    { score: 'Pontuação', valor: 'Ótimo' },
];
const columnsPontuacao: TableColumn[] = [
    { key: 'classificacao', label: 'Pontuação', align: 'left', icon: <FormatListNumberedRoundedIcon className="text-primary-500 align-bottom mr-1"/>, colorHeader: 'bg-secondary-50', colorTextHeader: 'text-secondary-800', colorLine: 'bg-secondary-25' },
    { key: 'pontuacao', label: '',  align: 'right', colorTextHeader: 'text-secondary-800' },
];
const dataPontuacao = [
    { classificacao: 'Péssimo', pontuacao: '0 a 200 Pontos' },
    { classificacao: 'Ruim', pontuacao: '201 a 400 Pontos' },
    { classificacao: 'Regular', pontuacao: '401 a 600 Pontos' },
    { classificacao: 'Bom', pontuacao: '601 a 800 Pontos' },
    { classificacao: 'Ótimo', pontuacao: '801 a 1000 Pontos' },
];

const dataResumoCarteira = [
    { descricao: 'Valor a pagar (A):', info: "R$ 3.476,97" },
    { descricao: 'Dívidas não pagas (B):', info: "R$ 0,00" },
    { descricao: 'Prejuízo ao sistema finaceiro (C):', info: "R$ 0,00" },
    { descricao: 'Total (A + B + C):', info: "R$ 3.476,97" },
    { descricao: 'Limite de Crédito:', info: "R$ 7.222,44" },
];
const columnsDestalhesCarteria: TableColumn[] = [
    { key: 'title', label: 'Carteira de Crédito', align: 'left', icon: <AccountBalanceWalletRoundedIcon className="text-primary-500 align-bottom mr-1"/>, colorHeader: 'bg-secondary-50', colorTextHeader: 'text-secondary-800', colorLine: 'bg-secondary-25' },
    { key: 'valor', label: '',  align: 'right', colorTextHeader: 'text-secondary-800' },
    { key: 'porcentagem', label: '',  align: 'right', colorTextHeader: 'text-secondary-800' },
];
const dataDestalhesCarteria = [
    { title: 'Emprestimos:', valor: "" , porcentagem: "" },
    { title: 'Cartão de crédito? Compra, fatura parcelada ou saque financiado pela instituição eminente do cartão', valor: "R$ 203,74" , porcentagem: "1.90%" },
    { title: 'Creditos a vencer ate 30 dias', valor: "R$ 5,33" , porcentagem: "0.05%" },
    { title: 'Creditos a vencer de 31 a 60 dias', valor: "R$ 163,15" , porcentagem: "1.52%" },
    { title: 'Creditos a vencer de 61 a 90 dias', valor: "R$ 35,26" , porcentagem: "0.33%" },
    { title: 'Outros Créditos:', valor: "" , porcentagem: "" },
    { title: 'Cartão de crédito - Compra a vista e parcelado lojista', valor: "R$ 3.273,23" , porcentagem: "30.59%" },
    { title: 'Creditos a vencer ate 30 dias', valor: "R$ 2.524,56" , porcentagem: "23.60%" },
    { title: 'Creditos a vencer de 31 a 60 dias', valor: "R$ 471,03" , porcentagem: "4.40%" },
    { title: 'Creditos a vencer de 61 a 90 dias', valor: "R$ 277,64" , porcentagem: "2.59%" },
    { title: 'Limites:', valor: "" , porcentagem: "" },
    { title: 'Cartão de crédito', valor: "R$ 7.222,44" , porcentagem: "67.50%" },
    { title: 'Limite de credito com vencimento ate 360 dias', valor: "R$ 7.222,44" , porcentagem: "67.50%" },
    { title: 'Empréstimos com garantia:', valor: "R$ 0,00" , porcentagem: "0.00%" },
];
export default function renderResultadosInformacoes({personType, opcionalSelected}: renderResultadosInformacoesProps) {
    const dataRestricoesPlus = personType === "fisica" ? dataRestricoesPlusFisica : dataRestricoesPlusJuridica;
    
    return (
    <div className="w-full mb-4">
        {/* RESTRICOES SINTETICAS */}
        <div className="w-full mb-4">
            <div className=" flex flex-col w-full justify-between items-center">
                <div className="mb-2">
                    <h2 className="text-center">Restrições Sintéticas</h2>
                </div>
                <div className="mb-4 w-full">
                    <Table columns={columnsRestricoes} data={dataRestricoes} />
                </div>
                <div className=" w-full">
                    <Table columns={columnsRestricoesPlus} data={dataRestricoesPlus} />
                </div>
            </div>
        </div>
        {/* PARTICIPACAO SOCIETARIA */}
        <div className="w-full mb-4">
            <div className=" flex flex-col w-full justify-between items-center">
                <div className="mb-2">
                    <h2 className="text-center">Particitação Societária (Cortesia)</h2>
                </div>
                <div className="mb-4 w-full">
                    <Table columns={columnsParticipacao} data={[]} />
                </div>
            </div>
        </div>
        {/* ALERTAS RESTRIÇÕES */}
        <div className="w-full mb-4">
            <div className=" flex flex-col w-full justify-between items-center">
                <div className="mb-2">
                    <h2 className="text-center">Informações Alertas Restrições</h2>
                </div>
                <div className="mb-4 w-full">
                    <Table columns={columnsAlertas} data={dataAlertas} />
                </div>
            </div>
        </div>
        {/* PASSAGENS COMERCIAIS */}
        <div className="w-full mb-4">
            <div className=" flex flex-col w-full justify-between items-center">
                <div className="mb-2">
                    <h2 className="text-center">Passagens Comerciais</h2>
                </div>
                <div className="mb-4 w-full">
                    <Table columns={columnsPassagens} data={dataPassagens} />
                </div>
            </div>
        </div>
        {/* ACOES CIVEIS */}
        <div className="w-full mb-4">
            <div className=" flex flex-col w-full justify-between items-center">
                <div className="mb-2">
                    <h2 className="text-center">Ações Cíveis</h2>
                </div>
                <div className="mb-4 w-full">
                    <Table columns={columnsPassagens} data={[]} />
                </div>
            </div>
        </div>
        {opcionalSelected.length > 0 && 
            <div className="w-full mb-4">
                <div className=" flex flex-col w-full justify-between items-center">
                    <div className="mb-2">
                        <h2 className="text-center">Informações Opcionais</h2>
                    </div>
                    <div className="mb-4 w-full">
                        {/* RENDA FAMILIAR */}
                        {personType === 'fisica' && opcionalSelected.includes('rendaFamiliar') && (
                            <div data-testid="renda-presumida-container" className='flex flex-col w-full items-center justify-center p-4 mb-2 rounded-lg'>
                                <div data-testid="renda-presumida-card" className='bg-secondary-50 p-4 rounded-lg shadow-md mt-4 flex flex-col justify-center items-center'>
                                    <div data-testid="renda-presumida-title-container" className='flex items-center gap-2 mb-2 justify-center'>
                                        <AttachMoneyIcon data-testid="renda-presumida-icon" className='text-primary-500' fontSize='medium'/>
                                        <h3 data-testid="renda-presumida-title">Renda Familiar</h3>
                                    </div>
                                    <div data-testid="renda-presumida-value-container" className='flex justify-center items-center flex-col'>
                                        <h2 data-testid="renda-presumida-value" className='text-primary-500 font-bold mb-2 bg-white w-fit p-2 rounded-md'>R$ 5.500,00</h2>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* ACOES JUDICIAIS */}
                        {opcionalSelected.includes('acaoJudicial') && 
                            <div className="w-full mb-4">
                                <div className=" flex flex-col w-full justify-between items-center">
                                    <div className="mb-2">
                                        <h3 className="text-center">Ações Judiciais</h3>
                                    </div>
                                    <div className="mb-4 w-full">
                                        <Table columns={columnsAlertas} data={[]} />
                                    </div>
                                </div>
                            </div>
                        }
                        {/* SCR - BANCO CENTRAL */}
                        {opcionalSelected.includes('SCR') && 
                            <div className="w-full mb-4">
                                <div className=" flex flex-col w-full justify-between items-center">
                                    <div className="mb-2">
                                        <h3 className="text-center">SCR - Banco Central</h3>
                                    </div>
                                    <div className="mb-4 w-full">
                                        <div className="w-full mb-4">
                                            <div className=" flex flex-col w-full justify-between items-center">
                                                <div className="mb-2">
                                                    <h4 className="text-center">Resumo</h4>
                                                </div>
                                                <div className="mb-4 w-full">
                                                    <Table columns={columnsAlertas} data={dataResumoSCR} />
                                                </div>
                                                <div className="mb-2">
                                                    <h4 className="text-center">Detalhes</h4>
                                                </div>
                                                <div className="mb-4 w-full">
                                                    <Table columns={columnsScore} data={dataScore} />
                                                </div>
                                                <div className="mb-4 w-full">
                                                    <Table columns={columnsPontuacao} data={dataPontuacao} />
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className=" flex flex-col w-full justify-between items-center">
                                    <div className="mb-2">
                                        <h3 className="text-center">Carteira de Crédito</h3>
                                    </div>
                                    <div className="mb-4 w-full">
                                        <div className="w-full">
                                            <div className=" flex flex-col w-full justify-between items-center">
                                                <div className="mb-2">
                                                    <h4 className="text-center">Resumo</h4>
                                                </div>
                                                <div className="mb-4 w-full">
                                                    <Table columns={columnsAlertas} data={dataResumoCarteira} />
                                                </div>
                                                <div className="mb-2">
                                                    <h4 className="text-center">Detalhes</h4>
                                                </div>
                                                <div className=" w-full">
                                                    <Table columns={columnsDestalhesCarteria} data={dataDestalhesCarteria} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {/* CADIN */}
                        {opcionalSelected.includes('cadin') &&
                            <div className="w-full mb-4">
                                <div className=" flex flex-col w-full justify-between items-center">
                                    <div className="mb-2">
                                        <h2 className="text-center">Cadin</h2>
                                    </div>
                                    <div className="mb-4 w-full">
                                        <Table columns={columnsAlertas} data={[]} />
                                    </div>
                                </div>
                            </div>
                        }
                        {/* OBITO */}
                        {opcionalSelected.includes('obito') &&
                            <div className="w-full mb-4">
                                <div className=" flex flex-col w-full justify-between items-center">
                                    <div className="mb-2">
                                        <h2 className="text-center">Óbito</h2>
                                    </div>
                                    <div className="mb-4 w-full">
                                        <Table columns={columnsAlertas} data={[]} />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        }
    </div> 
    );
  }