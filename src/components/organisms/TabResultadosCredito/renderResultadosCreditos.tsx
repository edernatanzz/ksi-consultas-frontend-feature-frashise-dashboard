"use client"

import Table, { TableColumn } from "@/components/atoms/TableBancario/TableBancario";
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import BalanceRoundedIcon from '@mui/icons-material/BalanceRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';

// Mock de dados para a tabela de resumo
const columnsResumo: TableColumn[] = [
    { key: 'descricao', label: 'Descrição', align: 'left', icon: <ArticleRoundedIcon className="text-primary-500 align-bottom mr-1"/>, colorHeader: 'bg-secondary-50', colorTextHeader: 'text-secondary-800', colorLine: 'bg-secondary-25' },
    { key: 'quantidade', label: 'Quantidade', align: 'center', icon: <BalanceRoundedIcon className="text-primary-500 align-bottom mr-1"/>, colorTextHeader: 'text-secondary-800' },
    { key: 'valorTotal', label: 'Valor Total', align: 'center', icon: <PaidRoundedIcon className="text-primary-500 align-bottom mr-1"/>, colorTextHeader: 'text-secondary-800' },
];
const dataResumo = [
    { descricao: 'RGI do Brasil', quantidade: 4, valorTotal: 7893.23 },
    { descricao: 'Cheque sem fundo', quantidade: 0, valorTotal: 0 },
    { descricao: 'Protesto Nacional Cenprot', quantidade: 0, valorTotal: 0 },
];

// Mock de dados para a tabela de RGI
const columnsRGI: TableColumn[] = [
    { key: 'data', label: 'Data', align: 'left', icon: <CalendarMonthRoundedIcon className="text-primary-500 align-bottom mr-1"/>, colorHeader: 'bg-secondary-50', colorTextHeader: 'text-secondary-800', colorLine: 'bg-secondary-25' },
    { key: 'contrato', label: 'Contrato', align: 'center', icon: <AssignmentTurnedInRoundedIcon className="text-primary-500 align-bottom mr-1"/>, colorTextHeader: 'text-secondary-800' },
    { key: 'informante', label: 'Informante', align: 'center', icon: <AccountBalanceRoundedIcon className="text-primary-500 align-bottom mr-1"/>, colorTextHeader: 'text-secondary-800' },
    { key: 'valor', label: 'Valor', align: 'right', icon: <MonetizationOnRoundedIcon className="text-primary-500 align-bottom mr-1"/>, colorTextHeader: 'text-secondary-800' },
];
const dataRGI = [
    { data: '05/10/2022', contrato: '83C26AD89C66A85E', informante: 'NU FINANCEIRA S/A', valor: 526.75 },
    { data: '05/10/2023', contrato: '102130734876', informante: 'LOJAS RIACHUELO S/A', valor: 222.05 },
    { data: '10/08/2022', contrato: '10055197544', informante: 'BANCO CSF SA ATACADAO', valor: 2816.38 },
    { data: '26/10/2022', contrato: '0038715615236452690000', informante: 'CAIXA ECONOMICA FEDERAL', valor: 4328.05 },
];

export function renderResultadosCreditos() {
    return (
    <div className="w-full mb-4">
        {/* TABELA RESUMO */}
        <div className="flex flex-col w-full justify-between items-center mb-4">
            <div>
                <h2 className="font-bold mb-4 text-center">Resumo</h2>
            </div>
            <Table columns={columnsResumo} data={dataResumo}/>
        </div>
        {/* SEÇÃO DE DETALHES */}
        <div className="flex flex-col w-full justify-between items-center mb-4">
            <div>
                <h2 className="font-bold mb-4 text-center">Detalhes</h2>
            </div>
            {/* TABELA RGI */}
            <div className="flex flex-col w-full justify-between items-center mb-4">
                <div>
                    <h3 className="font-bold mb-2 text-center">RGI - Registro Geral de Inadimplente Do Brasil</h3>
                </div>
                <Table columns={columnsRGI} data={dataRGI}/>
            </div>
            {/* TABELA CHEQUE SEM FUNDO */}
            <div className="flex flex-col w-full justify-between items-center mb-4">
                <div>
                    <h3 className="font-bold mb-2 text-center">Cheque Sem Fundo</h3>
                </div>
                <Table columns={columnsRGI} data={[]}/>
            </div>
            {/* TABELA PROTESTO NACIONAL */}
            <div className="flex flex-col w-full justify-between items-center mb-4">
                <div>
                    <h3 className="font-bold mb-2 text-center">Protesto Nacional Cenprot</h3>
                </div>
                <Table columns={columnsRGI} data={[]}/>
            </div>
        </div>
    </div>
    );
  }