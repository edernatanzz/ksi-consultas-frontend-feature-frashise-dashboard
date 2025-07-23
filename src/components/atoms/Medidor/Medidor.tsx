'use client'

import { Gauge } from '@mui/x-charts/Gauge';

interface MedidorProps {
    value: number;
    max: number;
}

export default function Medidor({ value, max }: MedidorProps) {
    return (
            <div className="w-full rounded-lg flex items-center justify-center mb-4">
                <Gauge
                    value={value}
                    valueMax={max}
                    startAngle={-110}
                    endAngle={110}
                    text={({ value, valueMax }) => `${value} / ${valueMax}`}
                    className='w-full h-48'
                />
            </div>
    );
}