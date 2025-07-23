'use client'
import React, { useState } from 'react'
import { z } from 'zod'
import InputField from '@/components/atoms/InputField/InputField'
import Button from '@/components/atoms/Button/Button'
import { Login } from '@mui/icons-material'

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(4, 'Senha deve ter pelo menos 4 caracteres')
})

type LoginFormData = z.infer<typeof loginSchema>

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void
  loading?: boolean
  error?: string
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  loading = false,
  error
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  })

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const result = loginSchema.safeParse(formData)
    
    if (result.success) {
      setFieldErrors({})
      onSubmit(result.data)
    } else {
      const errors: Record<string, string> = {}
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string
        if (field && !errors[field]) {
          errors[field] = err.message
        }
      })
      setFieldErrors(errors)
    }
  }

  const handleChange = (field: keyof LoginFormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-secondary-800 mb-6">Login</h1>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Email"
          type="email"
          placeholder="seuemail@exemplo.com"
          value={formData.email}
          onChange={handleChange('email')}
          error={fieldErrors.email}
          required
          autoComplete="email"
        />
        
        <InputField
          label="Senha"
          type="password"
          placeholder="Sua senha"
          value={formData.password}
          onChange={handleChange('password')}
          error={fieldErrors.password}
          required
          autoComplete="current-password"
        />
        
        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-primary-500 hover:text-primary-600 font-medium bg-transparent border-none focus:outline-none active:bg-transparent focus:bg-transparent"
          >
            Esqueceu a senha?
          </button>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          size="large"
          fullWidth
          loading={loading}
          startIcon={<Login/>}
        >
          Entrar
        </Button>
        
        <div className="text-center text-sm text-secondary-600">
          Não tem uma conta?{' '}
          <button
            type="button"
            className="text-sm text-primary-500 hover:text-primary-600 font-medium bg-transparent border-none focus:outline-none active:bg-transparent focus:bg-transparent"
          >
            Crie uma agora
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm