# Sistema de Consultas Empresariais

Sistema de consultas empresariais desenvolvido em Next.js 14 com TypeScript, seguindo arquitetura atômica e design system personalizado. O projeto oferece uma interface moderna para acesso a diversos serviços de consulta organizados por categorias.

## 🚀 Tecnologias

- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS
- **Componentes:** Arquitetura Atômica + Material UI (seletivo)
- **Estilização:** Design System KSI + SCSS Modules
- **Ícones:** Material Icons

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── atoms/          # Componentes básicos reutilizáveis
│   ├── molecules/      # Combinações de átomos
│   ├── organisms/      # Componentes complexos
│   └── template/       # Layouts de página
├── data/              # Dados estáticos e configurações
└── utils/             # Funções utilitárias
```

## 🎨 Design System

### Paleta de Cores
- **Primary:** #E02725 (Vermelho KSI)
- **Secondary:** #112331 (Azul Corporativo)
- **Background:** #FDF6EF (Bege KSI)
- **Neutros:** Escala de grays para texto e bordas

### Tipografia
- **Sans:** Inter (texto corpo)
- **Display:** Poppins (títulos e destaques)

## 🔧 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm, yarn, pnpm ou bun

### Instalação das Dependências

```bash
# Dependências principais
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install @mui/x-data-grid
npm install @mui/x-date-pickers
npm install @mui/lab
```

### Executando o Projeto

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 🧭 Funcionalidades

### Sistema de Navegação
- **Categorias principais:** 5 seções (Bancário, Veicular, Localização, Jurídico, Comercial)
- **Breadcrumb dinâmico** baseado no contexto
- **Estados visuais** para navegação ativa

### Busca Inteligente
- **Busca global:** Pesquisa em todos os serviços
- **Busca por categoria:** Filtro dentro da seção atual
- **Normalização de texto:** Remove acentos, case-insensitive
- **Feedback visual:** Contador de resultados em tempo real

## 📊 Dados e Estrutura

### Categorias de Serviço

| Categoria | Quantidade | Exemplos |
|-----------|------------|----------|
| **Bancário** | 6 serviços | Relatórios de crédito, SCR, Rating |
| **Veicular** | 8 serviços | ATPV, Histórico, DENATRAN |
| **Localização** | 5 serviços | Localizador de bens e pessoas |
| **Jurídico** | 4 serviços | Antecedentes, Ações judiciais |
| **Comercial** | 3 serviços | Negativação, Comunicados |

**Total:** 26 serviços organizados em 5 categorias

## 🏗️ Arquitetura

O projeto segue os princípios da **Arquitetura Atômica**, organizando componentes em:

- **Atoms:** Elementos básicos (botões, inputs, ícones)
- **Molecules:** Combinações de átomos (card de serviço, barra de busca)
- **Organisms:** Componentes complexos (header, sidebar, grid de serviços)
- **Templates:** Estruturas de página reutilizáveis

## 🔐 Autenticação

### Interface de Login
Sistema de autenticação com design moderno e responsivo, apresentando layout dividido em duas seções:
- **Lateral esquerda:** Área de boas-vindas com branding KSI (desktop)
- **Lateral direita:** Formulário de login centralizado

### Recursos de Segurança
- **Validação em tempo real** com feedback visual
- **Campos tipados** (email, password) com ícones contextuais
- **Toggle de visibilidade** para senhas
- **Estados de loading** durante autenticação
- **Persistência de sessão** via localStorage

### Credenciais de Demonstração
```
Administrador: admin@ksiconsultas.com / 123456
Usuário Padrão: user@ksi.com / 123456
```

### Arquitetura do Login
- **Atoms:** `InputField` (campo reutilizável com validação)
- **Molecules:** `LoginForm` + `LoginWelcome`
- **Template:** `LoginPage` (lógica de autenticação)
- **Context:** `AuthContext` (gerenciamento de estado global)

### Responsividade
- **Desktop (≥768px):** Layout completo com lateral de boas-vindas
- **Mobile (<768px):** Apenas formulário centralizado
- **Transições suaves** entre breakpoints