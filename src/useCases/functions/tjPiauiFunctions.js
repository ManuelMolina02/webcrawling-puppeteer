const extractDataHeaderTjPiaui = () => {
  //CONSTRUIR EXTRAÇÃO DE DADOS NA PÁGINA

  //Modelo de retorno
  const exampleDataTjPiaui = {
    "uf": "PI",
    "partes": [
      {
        "cnpj": "cnpjParticipante",
        "nome": "nomeParticipante",
        "polo": "poloParticipante",
        "tipo": "tipoParticipante"
      },
      {
        "cpf": "62270427300",
        "nome": "ALCENOR LOPES MARTINS",
        "polo": "PASSIVO",
        "tipo": "REU",
        "advogados": [
          {
            "cpf": "01517075378",
            "oab": {
              "uf": "PI",
              "numero": 7946
            },
            "nome": "FRANCISCO FELIPE SOUSA SANTOS",
            "tipo": "ADVOGADO"
          }
        ]
      }
    ],
    "sistema": "PJE-TJPI",
    "segmento": "JUSTICA ESTADUAL",
    "tribunal": "TJ-PI",
    "movimentos": [],
    "assuntosCNJ": [
      {
        "titulo": "DIREITO ADMINISTRATIVO E OUTRAS MATERIAS DE DIREITO PUBLICO",
        "codigoCNJ": "9985"
      }
    ],
    "urlProcesso": "urlProcesso",
    "grauProcesso": 1,
    "orgaoJulgador": "orgaoJulgador",
    "unidadeOrigem": "unidadeOrigem",
    "classeProcessual": {
      "nome": "nome",
      "codigoCNJ": "codigoCNJ"
    },
    "dataDistribuicao": "dataDistribuicao",
    "eProcessoDigital": true,
    "numeroProcessoUnico": "numeroProcessoUnico"
  }

  //Retornar lista fora da variavel
  return exampleDataTjPiaui
}

module.exports = { extractDataHeaderTjPiaui }
