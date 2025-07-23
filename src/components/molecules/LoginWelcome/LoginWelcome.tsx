'use client'
import Image from 'next/image'
import React from 'react'

export const LoginWelcome: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-white p-8">

      <div className="w-24 h-24 flex items-center justify-center mb-8">
        <Image
                      src="/favicon.ico"
                      alt="Logo"
                      width={48}
                      height={48}
                      className="w-auto h-12 object-contain"
                      quality={100}
                      priority
                      unoptimized
                    />
      </div>

      <h1 className="text-3xl font-bold mb-4">
        Bem-vindo à KSI Consultas
      </h1>
      
      <p className="text-lg text-gray-300 max-w-md leading-relaxed">
        Sua plataforma completa para consultas e informações.
      </p>

      <div className="mt-12 flex space-x-2">
        <div className="w-2 h-2 bg-white/30 rounded-full"></div>
        <div className="w-2 h-2 bg-white/50 rounded-full"></div>
        <div className="w-2 h-2 bg-white/70 rounded-full"></div>
      </div>
    </div>
  )
}

export default LoginWelcome