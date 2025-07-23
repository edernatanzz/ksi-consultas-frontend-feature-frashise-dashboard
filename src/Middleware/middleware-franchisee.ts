import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { UserRole } from '@/types/auth'

// Rotas protegidas do ambiente Franchisee
const FRANCHISEE_PROTECTED_ROUTES = {
  '/franchisee/dashboard': [UserRole.FRANCHISEE, UserRole.ADMIN],
  '/franchisee/consultas': [UserRole.FRANCHISEE, UserRole.ADMIN],
  '/franchisee/relatorios': [UserRole.FRANCHISEE, UserRole.ADMIN],
  '/franchisee/clientes': [UserRole.FRANCHISEE, UserRole.ADMIN],
  '/franchisee/parceiros': [UserRole.FRANCHISEE, UserRole.ADMIN],
  '/franchisee/configuracoes': [UserRole.FRANCHISEE, UserRole.ADMIN]
}

export function middlewareFranchisee(request: NextRequest) {
  const userRole = request.cookies.get('user_role')?.value as UserRole
  const userProfile = request.cookies.get('user_profile')?.value
  const path = request.nextUrl.pathname



  // Se for apenas /franchisee (página principal), permite para qualquer usuário autenticado
  if (path === '/franchisee') {

    return NextResponse.next()
  }

  // Verifica se o usuário tem perfil de franqueado válido
  if (userProfile) {
    try {
      const profile = JSON.parse(userProfile)
      if (!profile.isFranchisee) {

        return NextResponse.redirect(new URL('/acesso-negado', request.url))
      }
    } catch {

      return NextResponse.redirect(new URL('/acesso-negado', request.url))
    }
  } else {
    return NextResponse.redirect(new URL('/acesso-negado', request.url))
  }

  // Verifica se a rota está protegida
  const protectedRoute = Object.entries(FRANCHISEE_PROTECTED_ROUTES).find(([route]) => 
    path.startsWith(route)
  )

  if (protectedRoute) {
    const [, allowedRoles] = protectedRoute
    if (!userRole || !allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL('/acesso-negado', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/franchisee/dashboard/:path*',
    '/franchisee/consultas/:path*',
    '/franchisee/relatorios/:path*',
    '/franchisee/clientes/:path*',
    '/franchisee/parceiros/:path*',
    '/franchisee/configuracoes/:path*'
  ]
}
