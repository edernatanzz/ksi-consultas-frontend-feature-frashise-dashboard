'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import LoginPage from '@/components/template/LoginPage/LoginPage';
import Loading from '@/components/atoms/Loading/Loading';

export default function Home() {
  const { isAuthenticated, user, getDefaultRedirectPath } = useAuth();
  const router = useRouter();

  // Se usuário já está logado, redireciona para o ambiente correto
  React.useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = getDefaultRedirectPath();
      router.push(redirectPath);
    }
  }, [isAuthenticated, user, getDefaultRedirectPath, router]);

  // Se usuário já está logado, mostra loading enquanto redireciona
  if (isAuthenticated && user) {
    return (
      <Loading 
        fullScreen={true}
        size="large"
        message="Redirecionando para seu ambiente..."
      />
    );
  }

  return <LoginPage />;
}