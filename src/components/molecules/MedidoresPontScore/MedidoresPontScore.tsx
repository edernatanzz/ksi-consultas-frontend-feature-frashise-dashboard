'use client';

import Medidor from '@/components/atoms/Medidor/Medidor';
import SpeedIcon from '@mui/icons-material/Speed';

interface MedidoresProps {
    Score: number;
    Pontualidade: number;
}

export default function Medidores({Score, Pontualidade}:MedidoresProps) {
    return (
        <div data-testid="medidores-container" className="flex flex-col lg:flex-row w-full h-full p-4 rounded-lg lg:space-x-10">
            <div data-testid="medidores-score-container" className="w-full rounded-lg flex flex-col mb-4 items-center">
                <div data-testid="medidores-score-title-container" className='flex flex-row space-x-1 lg:space-x-2'>
                    <SpeedIcon data-testid="medidores-score-icon" className="text-primary-500 mb-2" fontSize="medium"/>
                    <h3 data-testid="medidores-score-title" className="mb-2 font-semibold text-center">Score Positivo: Fonte de dados Bacen</h3>
                </div>
                <div data-testid="medidores-score-medidor-container">
                    <Medidor value={Score} max={1000} />
                </div>
                <p data-testid="medidores-score-description" className="text-center">O score é baseado nas informações do BACEN, mercado financeiro, nos melhores parâmetros de análise de credito e inteligência artificial para definir o perfil do consumidor de baixo, médio e alto risco.</p>
            </div>
            <div data-testid="medidores-pontualidade-container" className="w-full rounded-lg flex flex-col mb-4 items-center">
                <div data-testid="medidores-pontualidade-title-container" className='flex flex-row space-x-1 lg:space-x-2'>
                    <SpeedIcon data-testid="medidores-pontualidade-icon" className="text-primary-500 mb-2" fontSize="medium"/>
                    <h3 data-testid="medidores-pontualidade-title" className="mb-2 font-semibold text-center">Pontualidade de Pagamento</h3>
                </div>
                <div data-testid="medidores-pontualidade-medidor-container">
                    <Medidor value={Pontualidade} max={100}/>
                </div>
                <p data-testid="medidores-pontualidade-description" className="text-center">O consumidor realiza pagamento de {Pontualidade}% dos seus compromissos financeiros até a data do vencimento.</p>
            </div>
        </div>
    );
}