// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Poppins } from 'next/font/google'
import "./globals.css";
import ThemeRegistry from "@/providers/registry";
import { AuthProvider } from "@/contexts/AuthContext";
import MainLayout from "@/components/template/MainLayout/layout";


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KSI Sistema',
  description: 'Sistema de Consultas KSI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Google Material Icons */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body id="__next" className={`${inter.variable} ${poppins.variable}`}>
        <ThemeRegistry>
          <AuthProvider>
            <MainLayout>
              {children}
            </MainLayout>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}