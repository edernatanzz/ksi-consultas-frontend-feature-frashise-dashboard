import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Consultas KSI | Sistema de Consultas',
  description: 'Gerenciamento de consultas do ambiente KSI'
}

export default function ConsultasKSIPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Consultas KSI</h1>
        <p className="text-gray-600 mt-2">Gerenciamento de consultas do ambiente KSI</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Módulo de Consultas</h3>
          <p className="text-gray-500">Sistema de consultas exclusivo para usuários KSI</p>
        </div>
      </div>
    </div>
  )
}