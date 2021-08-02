const { dataProcessOne } = require('../functions/extractors')

const data = dataProcessOne

const primaryDataProcess = {
  "uf": "AL",
  "area": "CIVEL",
  "juiz": data.juizProcesso,
  "partes": [
    {
      "nome": "MARIA EDITE DOS SANTOS",
      "polo": "ATIVO",
      "tipo": "AUTORA",
      "advogados": [
        {
          "nome": "DEFENSORIA PUBLICA DO ESTADO DE ALAGOAS",
          "tipo": "DEFENSOR PUBLICO"
        }
      ]
    },
    {
      "nome": "HIPERCARD BANCO MULTIPLO S/A",
      "polo": "PASSIVO",
      "tipo": "REU",
      "advogados": [
        {
          "nome": "RAONI SOUZA DRUMMOND",
          "tipo": "ADVOGADO"
        },
        {
          "nome": "EDUARDO FRAGA",
          "tipo": "ADVOGADO"
        },
        {
          "nome": "ANDREA FREIRE TYNAN",
          "tipo": "ADVOGADA"
        }
      ]
    },
    {
      "nome": "W. DOS S. F.",
      "tipo": "TESTEMUNHA"
    },
    {
      "nome": "P. V. R. DE L.",
      "tipo": "TESTEMUNHA"
    }
  ],
  "sistema": "ESAJ-TJAL",
  "segmento": "JUSTICA ESTADUAL",
  "tribunal": "TJ-AL",
  "movimentos": [
    {
      "data": "2020-02-19T00:00:00",
      "indice": 88,
      "eMovimento": true,
      "nomeOriginal": [
        "REMETIDO RECURSO ELETRONICO AO TRIBUNAL DE JUSTICA/TURMA DE RECURSO"
      ]
    }
  ],
  "valorCausa": {
    "moeda": "R$",
    "valor": 15000.0
  },
  "assuntosCNJ": [
    {
      "titulo": "CARTAO DE CREDITO"
    },
    {
      "titulo": "DANO MORAL"
    },
    {
      "titulo": "INCLUSAO INDEVIDA EM CADASTRO DE INADIMPLENTES"
    }
  ],
  "urlProcesso": "https://www2.tjal.jus.br/cpopg/search.do?conversationId=&dadosConsulta.localPesquisa.cdLocal=-1&cbPesquisa=NUMPROC&dadosConsulta.tipoNuProcesso=UNIFICADO&numeroDigitoAnoUnificado=0731425-82.2014&foroNumeroUnificado=0001&dadosConsulta.valorConsultaNuUnificado=0731425-82.2014.8.02.0001&dadosConsulta.valorConsulta=&uuidCaptcha=sajcaptcha_995fe2bc65714448b39e23360bdfa4e5&g-recaptcha-response=",
  "grauProcesso": 1,
  "orgaoJulgador": data.varaProcesso,
  "unidadeOrigem": data.foroProcesso,
  "classeProcessual": {
    "nome": data.classeProcesso
  },
  "dataDistribuicao": "2016-03-09T14:40:00",
  "eProcessoDigital": true,
  "statusObservacao": data.situacaoProcesso,
  "numeroProcessoUnico": data.numeroProcesso
}

module.exports = { primaryDataProcess }