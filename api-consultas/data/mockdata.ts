// Dados simulados para a API de consultas
export const mockData = {
  "baseDisponivel": true,
  "logQuery": "c40442ba-141b-4935-ade7-0f65312f181a",
  "relatorioRatingBancario": {
    "classificacaoRisco": "C-",
    "comprometimentoRenda": "100%",
    "recuperacaoFalencia": "Não Consta",
    "cadastraispf": {
      "nome": "ARLISSON BEZERRA LINS",
      "documento": "189.302.588-83",
      "dataNascimento": "06/10/1975 - Segunda-feira",
      "qntEmails": 4,
      "emails": [
        "arlisson.adepom@hotmail.com",
        "alisson.adepon@hotmail.com",
        "red_lins@hotmail.com",
        "alison.bezerra@terra.com.br"
      ],
      "qntTelefones": 3,
      "telefones": [
        "(11) 967548957",
        "(11) 966011827",
        "(11) 939591051"
      ],
      "qntEnderecos": 3,
      "enderecos": [
        {
          "cep": "08062020",
          "uf": "SP",
          "cidade": "SAO PAULO",
          "bairro": "VILA MONTE SANTO",
          "logradouro": "RUA QUILOMBO DO AMBROSIO",
          "numero": "95",
          "complemento": "C"
        },
        {
          "cep": "12120000",
          "uf": "SP",
          "cidade": "TREMEMBE",
          "bairro": "AGUA QUENTE",
          "logradouro": "null AMADOR BUENO DA VEIGA",
          "numero": null,
          "complemento": "PENITENCIARIA"
        },
        {
          "cep": "08062020",
          "uf": "SP",
          "cidade": "SAO PAULO",
          "bairro": "VILA MONTE SANTO",
          "logradouro": "RUA QUILOMBO DO AMBROSIO",
          "numero": "95",
          "complemento": null
        }
      ],
      "score": 0,
      "pontualidadeDePagamento": 0.0,
      "limiteDeCredito": 0.0,
      "rendaEstimada": 2500.0,
      "nomeDaMae": "WALDELUCIA BEZERRA DO NASCIMENTO",
      "situacaoCpf": "REGULAR",
      "rg": "241229443",
      "clientePremium": "NÃO",
      "classeSocial": "C1",
      "qntPessoasContatos": 5,
      "pessoasContatos": [
        {
          "nome": "URLY BEZERRA LINS",
          "documento": "273.315.278-51",
          "descricaos": "IRMA(O)"
        },
        {
          "nome": "ANGELICA BEZERRA LINS",
          "documento": "174.327.348-79",
          "descricaos": "IRMA(O)"
        },
        {
          "nome": "ARLINDO LIRA LINS",
          "documento": "126.256.634-72",
          "descricaos": "PAI"
        },
        {
          "nome": "VANESSA BEZERRA LINS",
          "documento": "256.628.708-29",
          "descricaos": "IRMA(O)"
        },
        {
          "nome": "MONA LISA BEZERRA LINS",
          "documento": "284.668.828-12",
          "descricaos": "IRMA(O)"
        }
      ],
      "qntParticipacaoSocietaria": 3,
      "participacoesSocietaria": [
        {
          "cnpj": "51.738.661/0001-50",
          "razaoSocial": "ACL CONSULTORIA E SOLUCOES FINANCEIRAS LTDA",
          "posicao": null,
          "situacao": "100.00"
        },
        {
          "cnpj": "14.639.683/0001-36",
          "razaoSocial": "ARLISSON BEZERRA LINS 18930258883",
          "posicao": null,
          "situacao": "100.00"
        },
        {
          "cnpj": "30.641.917/0001-36",
          "razaoSocial": "ARB SOLUCOES LTDA",
          "posicao": null,
          "situacao": "100.00"
        }
      ]
    },
    "cadastraispj": null,
    "quantidadeChSemFundos": 0,
    "registrosChSemFundos": [],
    "quantidadeBoaVista": 0,
    "registrosBoaVista": [],
    "registroScr": {
      "databaseConsultada": "04/2025",
      "dataInicioRelacionamento": "24/05/2016",
      "quantidadeInstituicoes": "8",
      "quantidadeOperacoes": "19",
      "quantidadeOperacoesDiscordancia": "0",
      "quantidadeOperacoesSubjudice": "0",
      "score": null,
      "score1": {
        "pontuacao": "588",
        "faixa": "REGULAR"
      },
      "carteiraCredito": {
        "creditoAvencer": "11426,62",
        "creditoVencido": "5674,59",
        "prejuizo": "72716,79",
        "limiteCredito": "403,18"
      },
      "operacoes": null,
      "operacoes1": [
        {
          "modalidade": {
            "codigo": "01",
            "descricao": "ADIANTAMENTOS A DEPOSITANTES"
          },
          "subModalidade": {
            "codigo": "01",
            "descricao": "ADIANTAMENTOS A DEPOSITANTES"
          },
          "variacaoCambial": "0",
          "total": "1592,70",
          "percentual": "1,77",
          "vencimentos": [
            {
              "codigo": "V320",
              "descricao": "CREDITOS BAIXADOS COMO PREJUIZO HA MAIS DE 12M E ATE 48 MESES",
              "valor": "1592,7",
              "percentual": "1,77",
              "restritivo": "1",
              "qtdMeses": "48"
            }
          ]
        },
        {
          "modalidade": {
            "codigo": "02",
            "descricao": "EMPRESTIMOS"
          },
          "subModalidade": {
            "codigo": "03",
            "descricao": "CREDITO PESSOAL - SEM CONSIGNACAO EM FOLHA DE PAGAMENTO."
          },
          "variacaoCambial": "0",
          "total": "44999,94",
          "percentual": "49,88",
          "vencimentos": [
            {
              "codigo": "V110",
              "descricao": "CREDITOS A VENCER ATE 30 DIAS",
              "valor": "528,54",
              "percentual": "0,59",
              "restritivo": "0",
              "qtdMeses": "1"
            },
            {
              "codigo": "V120",
              "descricao": "CREDITOS A VENCER DE 31 A 60 DIAS",
              "valor": "213,75",
              "percentual": "0,24",
              "restritivo": "0",
              "qtdMeses": "2"
            },
            {
              "codigo": "V130",
              "descricao": "CREDITOS A VENCER DE 61 A 90 DIAS",
              "valor": "525,82",
              "percentual": "0,58",
              "restritivo": "0",
              "qtdMeses": "3"
            },
            {
              "codigo": "V140",
              "descricao": "CREDITOS A VENCER DE 91 A 180 DIAS",
              "valor": "912,09",
              "percentual": "1,01",
              "restritivo": "0",
              "qtdMeses": "6"
            },
            {
              "codigo": "V150",
              "descricao": "CREDITOS A VENCER DE 181 A 360 DIAS",
              "valor": "188,95",
              "percentual": "0,21",
              "restritivo": "0",
              "qtdMeses": "12"
            },
            {
              "codigo": "V210",
              "descricao": "CREDITOS VENCIDOS DE 15 A 30 DIAS",
              "valor": "222,18",
              "percentual": "0,25",
              "restritivo": "1",
              "qtdMeses": "1"
            },
            {
              "codigo": "V220",
              "descricao": "CREDITOS VENCIDOS DE 31 A 60 DIAS",
              "valor": "353,46",
              "percentual": "0,39",
              "restritivo": "1",
              "qtdMeses": "2"
            },
            {
              "codigo": "V230",
              "descricao": "CREDITOS VENCIDOS DE 61 A 90 DIAS",
              "valor": "145,48",
              "percentual": "0,16",
              "restritivo": "1",
              "qtdMeses": "3"
            },
            {
              "codigo": "V240",
              "descricao": "CREDITOS VENCIDOS DE 91 A 120 DIAS",
              "valor": "144,95",
              "percentual": "0,16",
              "restritivo": "1",
              "qtdMeses": "4"
            },
            {
              "codigo": "V245",
              "descricao": "CREDITOS VENCIDOS DE 121 A 150 DIAS",
              "valor": "141,25",
              "percentual": "0,16",
              "restritivo": "1",
              "qtdMeses": "5"
            },
            {
              "codigo": "V250",
              "descricao": "CREDITOS VENCIDOS DE 151 A 180 DIAS",
              "valor": "140,2",
              "percentual": "0,16",
              "restritivo": "1",
              "qtdMeses": "6"
            },
            {
              "codigo": "V255",
              "descricao": "CREDITOS VENCIDOS DE 181 A 240 DIAS",
              "valor": "275,92",
              "percentual": "0,31",
              "restritivo": "1",
              "qtdMeses": "8"
            },
            {
              "codigo": "V260",
              "descricao": "CREDITOS VENCIDOS DE 241 A 300 DIAS",
              "valor": "327,7",
              "percentual": "0,36",
              "restritivo": "1",
              "qtdMeses": "10"
            },
            {
              "codigo": "V270",
              "descricao": "CREDITOS VENCIDOS DE 301 A 360 DIAS",
              "valor": "170,17",
              "percentual": "0,19",
              "restritivo": "1",
              "qtdMeses": "12"
            },
            {
              "codigo": "V310",
              "descricao": "CREDITOS BAIXADOS COMO PREJUIZO ATE 12 MESES",
              "valor": "13598,36",
              "percentual": "15,07",
              "restritivo": "1",
              "qtdMeses": "12"
            },
            {
              "codigo": "V320",
              "descricao": "CREDITOS BAIXADOS COMO PREJUIZO HA MAIS DE 12M E ATE 48 MESES",
              "valor": "27111,12",
              "percentual": "30,05",
              "restritivo": "1",
              "qtdMeses": "48"
            }
          ]
        },
        {
          "modalidade": {
            "codigo": "02",
            "descricao": "EMPRESTIMOS"
          },
          "subModalidade": {
            "codigo": "04",
            "descricao": "CREDITO ROTATIVO VINCULADO A CARTAO DE CREDITO"
          },
          "variacaoCambial": "0",
          "total": "608,09",
          "percentual": "0,67",
          "vencimentos": [
            {
              "codigo": "V220",
              "descricao": "CREDITOS VENCIDOS DE 31 A 60 DIAS",
              "valor": "608,09",
              "percentual": "0,67",
              "restritivo": "1",
              "qtdMeses": "2"
            }
          ]
        },
        {
          "modalidade": {
            "codigo": "02",
            "descricao": "EMPRESTIMOS"
          },
          "subModalidade": {
            "codigo": "10",
            "descricao": "CARTAO DE CREDITO – COMPRA, FATURA PARCELADA OU SAQUE FINANCIADO PELA INSTITUICAO EMITENTE DO CARTAO"
          },
          "variacaoCambial": "0",
          "total": "243,70",
          "percentual": "0,27",
          "vencimentos": [
            {
              "codigo": "V110",
              "descricao": "CREDITOS A VENCER ATE 30 DIAS",
              "valor": "87,63",
              "percentual": "0,10",
              "restritivo": "0",
              "qtdMeses": "1"
            },
            {
              "codigo": "V120",
              "descricao": "CREDITOS A VENCER DE 31 A 60 DIAS",
              "valor": "81",
              "percentual": "0,09",
              "restritivo": "0",
              "qtdMeses": "2"
            },
            {
              "codigo": "V130",
              "descricao": "CREDITOS A VENCER DE 61 A 90 DIAS",
              "valor": "75,07",
              "percentual": "0,08",
              "restritivo": "0",
              "qtdMeses": "3"
            }
          ]
        },
        {
          "modalidade": {
            "codigo": "02",
            "descricao": "EMPRESTIMOS"
          },
          "subModalidade": {
            "codigo": "13",
            "descricao": "CHEQUE ESPECIAL"
          },
          "variacaoCambial": "0",
          "total": "1887,38",
          "percentual": "2,09",
          "vencimentos": [
            {
              "codigo": "V310",
              "descricao": "CREDITOS BAIXADOS COMO PREJUIZO ATE 12 MESES",
              "valor": "57",
              "percentual": "0,06",
              "restritivo": "1",
              "qtdMeses": "12"
            },
            {
              "codigo": "V320",
              "descricao": "CREDITOS BAIXADOS COMO PREJUIZO HA MAIS DE 12M E ATE 48 MESES",
              "valor": "1830,38",
              "percentual": "2,03",
              "restritivo": "1",
              "qtdMeses": "48"
            }
          ]
        },
        {
          "modalidade": {
            "codigo": "02",
            "descricao": "EMPRESTIMOS"
          },
          "subModalidade": {
            "codigo": "18",
            "descricao": "CARTAO DE CREDITO - NAO MIGRADO 50 RECEBIVEIS ADQUIRIDOS"
          },
          "variacaoCambial": "0",
          "total": "367,25",
          "percentual": "0,41",
          "vencimentos": [
            {
              "codigo": "V320",
              "descricao": "CREDITOS BAIXADOS COMO PREJUIZO HA MAIS DE 12M E ATE 48 MESES",
              "valor": "367,25",
              "percentual": "0,41",
              "restritivo": "1",
              "qtdMeses": "48"
            }
          ]
        },
        {
          "modalidade": {
            "codigo": "02",
            "descricao": "EMPRESTIMOS"
          },
          "subModalidade": {
            "codigo": "99",
            "descricao": "OUTROS EMPRESTIMOS"
          },
          "variacaoCambial": "0",
          "total": "23989,64",
          "percentual": "26,59",
          "vencimentos": [
            {
              "codigo": "V320",
              "descricao": "CREDITOS BAIXADOS COMO PREJUIZO HA MAIS DE 12M E ATE 48 MESES",
              "valor": "23989,64",
              "percentual": "26,59",
              "restritivo": "1",
              "qtdMeses": "48"
            }
          ]
        },
        {
          "modalidade": {
            "codigo": "04",
            "descricao": "FINANCIAMENTOS"
          },
          "subModalidade": {
            "codigo": "01",
            "descricao": "AQUISICAO DE BENS – VEICULOS AUTOMOTORES"
          },
          "variacaoCambial": "0",
          "total": "11942,06",
          "percentual": "13,24",
          "vencimentos": [
            {
              "codigo": "V110",
              "descricao": "CREDITOS A VENCER ATE 30 DIAS",
              "valor": "1501,59",
              "percentual": "1,66",
              "restritivo": "0",
              "qtdMeses": "1"
            },
            {
              "codigo": "V120",
              "descricao": "CREDITOS A VENCER DE 31 A 60 DIAS",
              "valor": "1487,08",
              "percentual": "1,65",
              "restritivo": "0",
              "qtdMeses": "2"
            },
            {
              "codigo": "V130",
              "descricao": "CREDITOS A VENCER DE 61 A 90 DIAS",
              "valor": "1473,16",
              "percentual": "1,63",
              "restritivo": "0",
              "qtdMeses": "3"
            },
            {
              "codigo": "V140",
              "descricao": "CREDITOS A VENCER DE 91 A 180 DIAS",
              "valor": "4335,04",
              "percentual": "4,80",
              "restritivo": "0",
              "qtdMeses": "6"
            },
            {
              "codigo": "V210",
              "descricao": "CREDITOS VENCIDOS DE 15 A 30 DIAS",
              "valor": "1557,25",
              "percentual": "1,73",
              "restritivo": "1",
              "qtdMeses": "1"
            },
            {
              "codigo": "V220",
              "descricao": "CREDITOS VENCIDOS DE 31 A 60 DIAS",
              "valor": "1587,94",
              "percentual": "1,76",
              "restritivo": "1",
              "qtdMeses": "2"
            }
          ]
        },
        {
          "modalidade": {
            "codigo": "13",
            "descricao": "OUTROS CREDITOS"
          },
          "subModalidade": {
            "codigo": "01",
            "descricao": "AVAIS E FIANCAS HONRADOS"
          },
          "variacaoCambial": "0",
          "total": "4170,34",
          "percentual": "4,62",
          "vencimentos": [
            {
              "codigo": "V320",
              "descricao": "CREDITOS BAIXADOS COMO PREJUIZO HA MAIS DE 12M E ATE 48 MESES",
              "valor": "4170,34",
              "percentual": "4,62",
              "restritivo": "1",
              "qtdMeses": "48"
            }
          ]
        },
        {
          "modalidade": {
            "codigo": "13",
            "descricao": "OUTROS CREDITOS"
          },
          "subModalidade": {
            "codigo": "04",
            "descricao": "CARTAO DE CREDITO - COMPRA A VISTA E PARCELADO LOJISTA"
          },
          "variacaoCambial": "0",
          "total": "16,90",
          "percentual": "0,02",
          "vencimentos": [
            {
              "codigo": "V110",
              "descricao": "CREDITOS A VENCER ATE 30 DIAS",
              "valor": "16,9",
              "percentual": "0,02",
              "restritivo": "0",
              "qtdMeses": "1"
            }
          ]
        },
        {
          "modalidade": {
            "codigo": "19",
            "descricao": "LIMITE"
          },
          "subModalidade": {
            "codigo": "04",
            "descricao": "CARTAO DE CREDITO"
          },
          "variacaoCambial": "0",
          "total": "403,18",
          "percentual": "0,45",
          "vencimentos": [
            {
              "codigo": "V20",
              "descricao": "LIMITE DE CREDITO COM VENCIMENTO ATE 360 DIAS",
              "valor": "403,18",
              "percentual": "0,45",
              "restritivo": "0",
              "qtdMeses": "12"
            }
          ]
        }
      ]
    },
    "contemProtesto": true,
    "qntProtesto": 4,
    "valorTotalProtesto": 39555.44,
    "registrosProtesto": [
      {
        "cartorio": "TABELIAO DE PROTESTO DE LETRAS E TITULOS",
        "endereco": "AV. ANDROMEDA , 433 JD .SATELITE, SAO JOSE DOS CAMPOS - SP - SP",
        "municipio": "SAO JOSE DOS CAMPOS",
        "data": "01/02/2022",
        "valor": 1375.0
      },
      {
        "cartorio": "7. TABELIAO DE PROTESTO DE LETRAS E TITULOS",
        "endereco": "RUA DA GLORIA, 152 LIBERDADE, SAO PAULO - SP - SP",
        "municipio": "SAO PAULO",
        "data": "23/11/2023",
        "valor": 29344.17
      },
      {
        "cartorio": "10. TABELIAO DE PROTESTO DE LETRAS E TITULOS",
        "endereco": "PRACA DR. JOAO MENDES, 48 CENTRO, SAO PAULO - SP - SP",
        "municipio": "SAO PAULO",
        "data": "26/11/2020",
        "valor": 1135.0
      },
      {
        "cartorio": "10. TABELIAO DE PROTESTO DE LETRAS E TITULOS",
        "endereco": "PRACA DR. JOAO MENDES, 48 CENTRO, SAO PAULO - SP - SP",
        "municipio": "SAO PAULO",
        "data": "21/06/2024",
        "valor": 7701.27
      }
    ],
    "informacoesAdicionais": {
      "informacoesAlertasRestricoes": {
        "statusRetorno": {
          "codigo": "1",
          "descricao": "CONSULTA CONCLUIDA COM SUCESSO"
        },
        "quantidadeOcorrencia": "14",
        "ocorrencias": [
          {
            "codigoTipoInformacao": "1",
            "descricaoTipoInformacao": "INFORMACAO",
            "titulo": "STATUS CADASTRO POSITIVO",
            "observacoes": "CLIENTE NOTIFICADO, PERIODO DE RESPOSTA ENCERRADO, DADOS PRONTOS PARA SEREM USADOS"
          },
          {
            "codigoTipoInformacao": "1",
            "descricaoTipoInformacao": "INFORMACAO",
            "titulo": "CONSULTAS 30 DIAS",
            "observacoes": "QUANTIDADE TOTAL: 2"
          },
          {
            "codigoTipoInformacao": "1",
            "descricaoTipoInformacao": "INFORMACAO",
            "titulo": "CONSULTAS 31 A 60 DIAS",
            "observacoes": "QUANTIDADE TOTAL: 2"
          },
          {
            "codigoTipoInformacao": "1",
            "descricaoTipoInformacao": "INFORMACAO",
            "titulo": "CONSULTAS 61 A 90 DIAS",
            "observacoes": "QUANTIDADE TOTAL: 0"
          },
          {
            "codigoTipoInformacao": "1",
            "descricaoTipoInformacao": "INFORMACAO",
            "titulo": "CONSULTAS 90+ DIAS",
            "observacoes": "QUANTIDADE TOTAL: 14"
          },
          {
            "codigoTipoInformacao": "1",
            "descricaoTipoInformacao": "INFORMACAO",
            "titulo": "ULTIMAS CONSULTAS",
            "observacoes": "DATA:29/05/2025/QUANTIDADE:1/SEGMENTO:0"
          },
          {
            "codigoTipoInformacao": "1",
            "descricaoTipoInformacao": "INFORMACAO",
            "titulo": "ULTIMAS CONSULTAS",
            "observacoes": "DATA:10/05/2025/QUANTIDADE:1/SEGMENTO:Instituições Financeiras"
          },
          {
            "codigoTipoInformacao": "1",
            "descricaoTipoInformacao": "INFORMACAO",
            "titulo": "ULTIMAS CONSULTAS",
            "observacoes": "DATA:21/04/2025/QUANTIDADE:2/SEGMENTO:Outros"
          },
          {
            "codigoTipoInformacao": "1",
            "descricaoTipoInformacao": "INFORMACAO",
            "titulo": "ULTIMAS CONSULTAS",
            "observacoes": "DATA:27/01/2025/QUANTIDADE:2/SEGMENTO:Instituições Financeiras"
          },
          {
            "codigoTipoInformacao": "1",
            "descricaoTipoInformacao": "INFORMACAO",
            "titulo": "ULTIMAS CONSULTAS",
            "observacoes": "DATA:27/12/2024/QUANTIDADE:5/SEGMENTO:Instituições Financeiras"
          },
          {
            "codigoTipoInformacao": "1",
            "descricaoTipoInformacao": "INFORMACAO",
            "titulo": "ULTIMAS CONSULTAS",
            "observacoes": "DATA:18/09/2024/QUANTIDADE:2/SEGMENTO:Outros"
          },
          {
            "codigoTipoInformacao": "1",
            "descricaoTipoInformacao": "INFORMACAO",
            "titulo": "ULTIMAS CONSULTAS",
            "observacoes": "DATA:30/08/2024/QUANTIDADE:1/SEGMENTO:Serviços"
          },
          {
            "codigoTipoInformacao": "1",
            "descricaoTipoInformacao": "INFORMACAO",
            "titulo": "ULTIMAS CONSULTAS",
            "observacoes": "DATA:29/08/2024/QUANTIDADE:1/SEGMENTO:Serviços"
          },
          {
            "codigoTipoInformacao": "1",
            "descricaoTipoInformacao": "INFORMACAO",
            "titulo": "ULTIMAS CONSULTAS",
            "observacoes": "DATA:20/08/2024/QUANTIDADE:3/SEGMENTO:Serviços"
          }
        ]
      },
      "passagensComerciais": {
        "statusRetorno": {
          "codigo": "1",
          "descricao": "CONSULTA CONCLUIDA COM SUCESSO"
        },
        "quantidadeOcorrencia": "3",
        "ocorrencias": [
          {
            "dataConsulta": "04/06/2025",
            "horaConsulta": "",
            "clienteConsulta": "SP-SCN/RENOVACAO DE CADASTRO",
            "telefoneCliente": "",
            "cidadeUfCliente": ""
          },
          {
            "dataConsulta": "29/05/2025",
            "horaConsulta": "",
            "clienteConsulta": "SP-SCN/RENOVACAO DE CADASTRO",
            "telefoneCliente": "",
            "cidadeUfCliente": ""
          },
          {
            "dataConsulta": "08/05/2025",
            "horaConsulta": "",
            "clienteConsulta": "JUVO BRASIL TECNOLOGIA LTDA",
            "telefoneCliente": "",
            "cidadeUfCliente": ""
          }
        ]
      },
      "acoesCiveis": {
        "quantidadeOcorrencia": "0",
        "ocorrencias": []
      }
    },
    "contemRestricoesSinteticas": false,
    "qntRestricoesSinteticas": 0,
    "valorTotalRestricoesSinteticas": 0.0
  }
};

// Dados de empresas (CNPJ)
export const mockDataPJ = {
  "baseDisponivel": true,
  "logQuery": "c4b872ba-141b-4935-bde7-0f65312f181b",
  "relatorioRatingBancario": {
    "classificacaoRisco": "B",
    "comprometimentoRenda": "45%",
    "recuperacaoFalencia": "Não Consta",
    "cadastraispf": null,
    "cadastraispj": {
      "razaoSocial": "ACL CONSULTORIA E SOLUCOES FINANCEIRAS LTDA",
      "nomeFantasia": "ACL CONSULTORIA",
      "cnpj": "51.738.661/0001-50",
      "dataFundacao": "15/08/2017",
      "telefones": ["(11) 3456-7890", "(11) 98765-4321"],
      "emails": ["contato@aclconsultoria.com.br", "financeiro@aclconsultoria.com.br"],
      "endereco": {
        "cep": "08062020",
        "uf": "SP",
        "cidade": "SAO PAULO",
        "bairro": "VILA MONTE SANTO",
        "logradouro": "RUA QUILOMBO DO AMBROSIO",
        "numero": "95",
        "complemento": "SALA 3"
      },
      "capitalSocial": 100000.00,
      "situacaoCadastral": "ATIVA",
      "naturezaJuridica": "SOCIEDADE EMPRESÁRIA LIMITADA",
      "cnaePrincipal": {
        "codigo": "6619-3/99",
        "descricao": "OUTRAS ATIVIDADES AUXILIARES DOS SERVIÇOS FINANCEIROS"
      },
      "cnaeSecundarios": [
        {
          "codigo": "6619-3/02",
          "descricao": "CORRESPONDENTES DE INSTITUIÇÕES FINANCEIRAS"
        },
        {
          "codigo": "6622-3/00",
          "descricao": "CORRETORES E AGENTES DE SEGUROS, DE PLANOS DE PREVIDÊNCIA COMPLEMENTAR E DE SAÚDE"
        }
      ],
      "sociosAdministradores": [
        {
          "nome": "ARLISSON BEZERRA LINS",
          "documento": "189.302.588-83",
          "participacao": "100.00%",
          "dataEntrada": "15/08/2017"
        }
      ],
      "faturamentoPresumido": 250000.00,
      "quantidadeFuncionarios": 3
    },
    "contemProtesto": false,
    "qntProtesto": 0,
    "valorTotalProtesto": 0.0,
    "registrosProtesto": [],
    "pendenciasFinanceiras": {
      "totalDividas": 0.0,
      "quantidadePendencias": 0,
      "pendencias": []
    },
    "informacoesAdicionais": {
      "informacoesAlertasRestricoes": {
        "statusRetorno": {
          "codigo": "1",
          "descricao": "CONSULTA CONCLUIDA COM SUCESSO"
        },
        "quantidadeOcorrencia": "3",
        "ocorrencias": [
          {
            "codigoTipoInformacao": "1",
            "descricaoTipoInformacao": "INFORMACAO",
            "titulo": "STATUS CADASTRO POSITIVO",
            "observacoes": "EMPRESA NOTIFICADA, PERIODO DE RESPOSTA ENCERRADO, DADOS PRONTOS PARA SEREM USADOS"
          },
          {
            "codigoTipoInformacao": "1",
            "descricaoTipoInformacao": "INFORMACAO",
            "titulo": "CONSULTAS 30 DIAS",
            "observacoes": "QUANTIDADE TOTAL: 1"
          },
          {
            "codigoTipoInformacao": "1",
            "descricaoTipoInformacao": "INFORMACAO",
            "titulo": "ULTIMAS CONSULTAS",
            "observacoes": "DATA:25/05/2025/QUANTIDADE:1/SEGMENTO:Instituições Financeiras"
          }
        ]
      }
    }
  }
};

// Função para buscar dados por CPF
export const findDataByCPF = (cpf: string) => {
  // Simulando uma busca real - retorna o mockData para o CPF exemplo
  if (cpf === "189.302.588-83" || cpf === "18930258883") {
    return {
      success: true,
      data: mockData
    };
  }
  
  return {
    success: false,
    message: "CPF não encontrado na base de dados"
  };
};

// Função para buscar dados por CNPJ
export const findDataByCNPJ = (cnpj: string) => {
  if (cnpj === "51.738.661/0001-50" || cnpj === "51738661000150") {
    return {
      success: true,
      data: mockDataPJ
    };
  }
  
  return {
    success: false,
    message: "CNPJ não encontrado na base de dados"
  };
};

export const formatarDocumento = (doc: string): string => {
  return doc.replace(/[^\d]/g, '');
};

export const mascaraCPF = (cpf: string): string => {
  const cpfLimpo = formatarDocumento(cpf);
  return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const mascaraCNPJ = (cnpj: string): string => {
  const cnpjLimpo = formatarDocumento(cnpj);
  return cnpjLimpo.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
};

export const getRandomSimulatedData = () => {
  const riscos = ["A", "B", "C", "D", "E"];
  const faixas = ["EXCELENTE", "BOM", "REGULAR", "RUIM", "PÉSSIMO"];
  
  return {
    classificacaoRisco: riscos[Math.floor(Math.random() * riscos.length)] + (Math.random() > 0.5 ? "+" : "-"),
    pontuacao: Math.floor(Math.random() * 1000),
    faixa: faixas[Math.floor(Math.random() * faixas.length)],
    comprometimentoRenda: `${Math.floor(Math.random() * 100)}%`
  };
};