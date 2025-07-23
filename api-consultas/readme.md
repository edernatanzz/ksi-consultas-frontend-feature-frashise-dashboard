# Instalar dependências
npm install
```

## Configuração

1. Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```
PORT=3001
NODE_ENV=development
```


### Modo Desenvolvimento

```bash
npm run dev
```

## Endpoints Disponíveis

### Status da API
```
GET /api/consulta/status
```
Retorna o status atual da API.

### Consulta por CPF
```
GET /api/consulta/cpf/:cpf
```
Retorna informações detalhadas da pessoa física associada ao CPF.

**Exemplo**: `/api/consulta/cpf/18930258883`

### Consulta por CNPJ
```
GET /api/consulta/cnpj/:cnpj
```
Retorna informações detalhadas da empresa associada ao CNPJ.

**Exemplo**: `/api/consulta/cnpj/51738661000150`

## Exemplos de Uso

### Consulta por CPF

```bash
curl http://localhost:3000/api/consulta/cpf/18930258883
```

### Consulta por CNPJ

```bash
curl http://localhost:3000/api/consulta/cnpj/51738661000150
```

## Dados Simulados

- CPF de teste: `18930258883`
- CNPJ de teste: `51738661000150`


### Exemplo com Axios:

```javascript
import axios from 'axios';

// Consultar CPF
const consultarCPF = async (cpf) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/consulta/cpf/${cpf}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao consultar CPF:', error);
    return null;
  }
};

// Consultar CNPJ
const consultarCNPJ = async (cnpj) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/consulta/cnpj/${cnpj}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao consultar CNPJ:', error);
    return null;
  }
};
```