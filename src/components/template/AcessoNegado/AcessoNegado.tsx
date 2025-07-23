'use client'

import { useRouter } from 'next/navigation'
import WarningIcon from '@mui/icons-material/Warning'
import { Button } from '@/components/atoms/Button/Button'

interface AcessoNegadoProps {
  message?: string
  showBackButton?: boolean
}

export const AcessoNegado: React.FC<AcessoNegadoProps> = ({
  message = 'Você não tem permissão para acessar esta página.',
  showBackButton = true
}) => {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-4">
          <WarningIcon className="mx-auto h-12 w-12 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Acesso Negado</h2>
        <p className="text-gray-600 mb-6">
          {message}
          <br />
          Entre em contato com o administrador se necessário.
        </p>
        {showBackButton && (
          <Button
            onClick={() => router.back()}
            variant="primary"
            size="medium"
          >
            Voltar
          </Button>
        )}
      </div>
    </div>
  )
} 