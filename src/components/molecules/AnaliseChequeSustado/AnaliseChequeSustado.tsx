'use client'

import Button from "@/components/atoms/Button/Button"

export default function AnaliseChequeSustado() {
    return (
        <div className="text-center text-gray-700 p-4 mb-4 rounded-lg bg-secondary-50 border-l-4 border-l-primary-500" style={{ borderLeftStyle: 'solid' }}>
            <p>Deseja saber se o cheque é sustado, roubado ou fraudado?</p>
            <p className="mb-4">Na nossa plataforma essa informação é GRATUITA.</p>
            <Button className="text-gray-700" variant="secondary" size="small">Clique aqui</Button>
        </div>
    )
}