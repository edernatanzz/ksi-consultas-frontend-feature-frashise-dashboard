import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { middleware as ksiMiddleware } from './Middleware/middleware-ksi'
import { middlewareFranchisee } from './Middleware/middleware-franchisee'
import { middlewarePartner } from './Middleware/middleware-partner'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const userProfile = request.cookies.get('user_profile')?.value
  const userRole = request.cookies.get('user_role')?.value

  // Para rotas de acesso público (login, acesso negado), permite
  if (path === '/' || path === '/acesso-negado') {
    return NextResponse.next()
  }

  // Verifica se o usuário está autenticado
  if (!userProfile || !userRole) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Parse do profile
  let profile
  try {
    profile = JSON.parse(userProfile)
  } catch {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // *** Admin do Ksi tem acesso a todos os ambientes ***
  const isAdmin = userRole === 'admin'
  if (isAdmin) {
    // Admin bypassa TODAS as validações e middlewares específicos
    return NextResponse.next()
  }

  // Roteamento para os diferentes ambientes (apenas para usuários não-admin)
  if (path === '/ksi' || path.startsWith('/ksi/')) {
    if (!profile.isKsi) {
      return NextResponse.redirect(new URL('/acesso-negado', request.url))
    }
    return ksiMiddleware(request)
  }
  
  if (path === '/franchisee' || path.startsWith('/franchisee/')) {
    if (!profile.isFranchisee) {
      return NextResponse.redirect(new URL('/acesso-negado', request.url))
    }
    return middlewareFranchisee(request)
  }
  
  if (path === '/partner' || path.startsWith('/partner/')) {
    if (!profile.isPartner) {
      return NextResponse.redirect(new URL('/acesso-negado', request.url))
    }
    return middlewarePartner(request)
  }

  // Para outras rotas, continua normalmente
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Rota principal
    '/',
    
    // Rota de acesso negado
    '/acesso-negado',
    
    // Rotas principais dos módulos
    '/ksi',
    '/franchisee',  
    '/partner',
    
    // Rotas KSI
    '/ksi/:path*',
    '/ksi/admin/:path*',
    '/ksi/dev/:path*',
    '/ksi/marketing/:path*',
    '/ksi/suporte/:path*',
    '/ksi/financeiro/:path*',
    '/ksi/teste/:path*',
    '/ksi/consultas/:path*',
    '/ksi/relatorios/:path*',
    
    // Rotas Franchisee
    '/franchisee/:path*',
    '/franchisee/dashboard/:path*',
    '/franchisee/consultas/:path*',
    '/franchisee/relatorios/:path*',
    '/franchisee/clientes/:path*',
    '/franchisee/parceiros/:path*',
    '/franchisee/configuracoes/:path*',
    
    // Rotas Partner
    '/partner/:path*',
    '/partner/dashboard/:path*',
    '/partner/consultas/:path*',
    '/partner/clientes/:path*',
    '/partner/relatorios/:path*',
    '/partner/configuracoes/:path*'
  ]
}