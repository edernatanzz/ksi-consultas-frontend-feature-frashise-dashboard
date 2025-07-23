import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { UserRole } from '@/types/auth'

// Rotas protegidas do ambiente Partner
const PARTNER_PROTECTED_ROUTES = {
  '/partner/dashboard': [UserRole.PARTNER, UserRole.ADMIN],
  '/partner/consultas': [UserRole.PARTNER, UserRole.ADMIN],
  '/partner/clientes': [UserRole.PARTNER, UserRole.ADMIN],
  '/partner/relatorios': [UserRole.PARTNER, UserRole.ADMIN],
  '/partner/configuracoes': [UserRole.PARTNER, UserRole.ADMIN]
}

export function middlewarePartner(request: NextRequest) {
  const userRole = request.cookies.get('user_role')?.value as UserRole
  const userProfile = request.cookies.get('user_profile')?.value
  const path = request.nextUrl.pathname



  // Se for apenas /partner (página principal), permite para qualquer usuário autenticado
  if (path === '/partner') {

    return NextResponse.next()
  }

  // Verifica se é admin KSI (permite acesso a todos ambientes) ou parceiro válido
  if (userProfile) {
    try {
      const profile = JSON.parse(userProfile)
      // Admin KSI tem acesso total
      if (userRole === UserRole.ADMIN) {
        return NextResponse.next()
      }
      // Verifica se tem perfil de parceiro
      if (!profile.isPartner) {
        return NextResponse.redirect(new URL('/acesso-negado', request.url))
      }
    } catch {
      return NextResponse.redirect(new URL('/acesso-negado', request.url))
    }
  } else {
    return NextResponse.redirect(new URL('/acesso-negado', request.url))
  }

  // Verifica se a rota está protegida
  const protectedRoute = Object.entries(PARTNER_PROTECTED_ROUTES).find(([route]) => 
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
    '/partner/dashboard/:path*',
    '/partner/consultas/:path*',
    '/partner/clientes/:path*',
    '/partner/relatorios/:path*',
    '/partner/configuracoes/:path*'
  ]
}
