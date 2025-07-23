import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Teste KSI | Sistema de Consultas',
  description: 'Ambiente de testes do KSI'
}

export default function TesteKSIPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Ambiente de Teste KSI</h1>
        <p className="text-gray-600 mt-2">Área de testes e desenvolvimento para o ambiente KSI</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Ambiente de Teste</h3>
          <p className="text-gray-500">Área exclusiva para testes e desenvolvimento</p>
        </div>
      </div>
    </div>
  )
}