'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/molecules/LoginForm/LoginForm';
import LoginWelcome from '@/components/molecules/LoginWelcome/LoginWelcome';
import { useAuth } from '@/contexts/AuthContext';

interface LoginFormData {
  email: string;
  password: string;
}

const USER_DEMO_INFO = [
  // === AMBIENTE KSI ===
  {
    email: 'admin@ksi.com',
    password: '123456',
    name: 'Admin KSI',
    role: 'Administrador',
    description: 'Acesso completo ao ambiente KSI',
    environment: '🏢 KSI'
  },
  {
    email: 'financeiro@ksi.com',
    password: '123456',
    name: 'Financeiro KSI',
    role: 'Financeiro',
    description: 'Relatórios bancários e comerciais',
    environment: '🏢 KSI'
  },
  {
    email: 'suporte@ksi.com',
    password: '123456',
    name: 'Suporte KSI',
    role: 'Suporte',
    description: 'Atendimento e consultas',
    environment: '🏢 KSI'
  },
  {
    email: 'dev@ksi.com',
    password: '123456',
    name: 'Dev KSI',
    role: 'Desenvolvedor',
    description: 'Desenvolvimento e manutenção',
    environment: '🏢 KSI'
  },
  {
    email: 'marketing@ksi.com',
    password: '123456',
    name: 'Marketing KSI',
    role: 'Marketing',
    description: 'Dados comerciais e analytics',
    environment: '🏢 KSI'
  },
  {
    email: 'superadmin@ksi.com',
    password: '123456',
    name: 'Super Admin KSI',
    role: 'Super Admin',
    description: 'Administrador principal',
    environment: '🏢 KSI'
  },

  // === AMBIENTE FRANCHISEE ===
  {
    email: 'franquia@exemplo.com',
    password: '123456',
    name: 'Franquia SP',
    role: 'Gerente',
    description: 'Gestão da franquia São Paulo',
    environment: '🏪 Franchisee'
  },
  {
    email: 'franquia.rio@exemplo.com',
    password: '123456',
    name: 'Franquia RJ',
    role: 'Operador',
    description: 'Operação da franquia Rio de Janeiro',
    environment: '🏪 Franchisee'
  },
  {
    email: 'franquia.bh@exemplo.com',
    password: '123456',
    name: 'Franquia BH',
    role: 'Supervisor',
    description: 'Supervisão da franquia Belo Horizonte',
    environment: '🏪 Franchisee'
  },

  // === AMBIENTE PARTNER ===
  {
    email: 'parceiro@empresa.com',
    password: '123456',
    name: 'TechCorp',
    role: 'Gestor',
    description: 'Gestão de parceria empresarial',
    environment: '🤝 Partner'
  },
  {
    email: 'api@integrator.com',
    password: '123456',
    name: 'API Solutions',
    role: 'Integrador',
    description: 'Integração de sistemas via API',
    environment: '🤝 Partner'
  },
  {
    email: 'reseller@vendas.com',
    password: '123456',
    name: 'Comercial Plus',
    role: 'Representante',
    description: 'Representação comercial',
    environment: '🤝 Partner'
  }
];

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated, getDefaultRedirectPath } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDemoUsers, setShowDemoUsers] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = getDefaultRedirectPath();
      router.push(redirectPath);
    }
  }, [isAuthenticated, router, getDefaultRedirectPath]);

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true);
    setError('');

    try {
      await login(data.email, data.password);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro interno. Tente novamente.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (email: string, password: string) => {
    await handleLogin({ email, password });
  };

  return (
    <div className="min-h-screen bg-secondary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex">
        
        {/* Welcome Section - Left Side */}
        <div className="hidden md:flex md:w-1/2 bg-secondary-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 border border-white rounded-full"></div>
            <div className="absolute top-1/2 right-10 w-16 h-16 border border-white rounded-full"></div>
          </div>
          <LoginWelcome />
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-sm">
            <LoginForm
              onSubmit={handleLogin}
              loading={loading}
              error={error}
            />

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowDemoUsers(!showDemoUsers)}
                className="text-sm text-secondary-600 hover:text-secondary-800 underline"
              >
                {showDemoUsers ? 'Ocultar' : 'Ver'} usuários de demonstração
              </button>
            </div>

            {showDemoUsers && (
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Usuários de Demonstração - Múltiplos Ambientes:
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {USER_DEMO_INFO.map((user, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded border text-xs cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleDemoLogin(user.email, user.password)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-secondary-800">
                              {user.name}
                            </span>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              {user.environment}
                            </span>
                          </div>
                          <div className="text-gray-600">
                            {user.email}
                          </div>
                          <div className="text-primary-600 font-medium">
                            {user.role}
                          </div>
                          <div className="text-gray-500 mt-1">
                            {user.description}
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">
                          Clique para entrar
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs text-gray-500 text-center">
                  Senha padrão para todos: <strong>123456</strong>
                  <br />
                  <span className="text-blue-600">Cada usuário será redirecionado para seu ambiente específico</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;