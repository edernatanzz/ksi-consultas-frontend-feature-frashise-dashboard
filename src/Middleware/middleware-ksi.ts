import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { UserRole } from '@/types/auth'

// Rotas protegidas do ambiente KSI
const KSI_PROTECTED_ROUTES = {
  '/ksi/admin': [UserRole.ADMIN, UserRole.DEVS],
  '/ksi/dev': [UserRole.ADMIN, UserRole.DEVS],
  '/ksi/marketing': [UserRole.ADMIN, UserRole.DEVS, UserRole.MARKETING],
  '/ksi/suporte': [UserRole.ADMIN, UserRole.DEVS, UserRole.SUPORTE],
  '/ksi/financeiro': [UserRole.ADMIN, UserRole.DEVS, UserRole.FINANCEIRO],
  '/ksi/teste': [UserRole.ADMIN, UserRole.DEVS],
  '/ksi/consultas': [UserRole.ADMIN, UserRole.DEVS, UserRole.MARKETING, UserRole.SUPORTE, UserRole.FINANCEIRO],
  '/ksi/relatorios': [UserRole.ADMIN, UserRole.DEVS, UserRole.MARKETING, UserRole.SUPORTE, UserRole.FINANCEIRO]
}

export function middleware(request: NextRequest) {
  const userRole = request.cookies.get('user_role')?.value as UserRole
  const userProfile = request.cookies.get('user_profile')?.value
  const path = request.nextUrl.pathname

  // *** ADMIN TEM ACESSO TOTAL E IRRESTRITO ***
  if (userRole === UserRole.ADMIN) {
    return NextResponse.next()
  }

  // Se for apenas /ksi (página principal), permite para qualquer usuário autenticado
  if (path === '/ksi') {
    return NextResponse.next()
  }

  // Verifica se o usuário tem perfil de KSI válido
  if (userProfile) {
    try {
      const profile = JSON.parse(userProfile)
      if (!profile.isKsi) {
        return NextResponse.redirect(new URL('/acesso-negado', request.url))
      }
    } catch {
      return NextResponse.redirect(new URL('/acesso-negado', request.url))
    }
  } else {
    return NextResponse.redirect(new URL('/acesso-negado', request.url))
  }

  // Verifica se a rota está protegida (só para usuários não-admin)
  const protectedRoute = Object.entries(KSI_PROTECTED_ROUTES).find(([route]) => 
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
    '/ksi/admin/:path*',
    '/ksi/dev/:path*',
    '/ksi/marketing/:path*',
    '/ksi/suporte/:path*',
    '/ksi/financeiro/:path*',
    '/ksi/teste/:path*',
    '/ksi/consultas/:path*',
    '/ksi/relatorios/:path*'
  ]
}