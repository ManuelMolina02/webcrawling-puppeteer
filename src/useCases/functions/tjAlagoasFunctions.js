//--------------< FUNÇÕES EXTRATORAS DE DADOS >--------------

const extractDataHeaderTjAlagoas = () => {
//DADOS PRINCIPAIS
  //Selecionando tabelas dos dados principais do processo
  const dadosPrincipaisProcesso = document.querySelectorAll('div.row')
  const arrayDadosPrincipais = [...dadosPrincipaisProcesso].slice(1, 4)

  //Selecionando dados das tabelas
  const dataHeader = arrayDadosPrincipais.map(el => {
    const childs = el.children
    const arrayDataHeader = [...childs].map((el) => {

      return {
        title: el.children[0].textContent.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleUpperCase(),
        name: el.children[1].textContent.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleUpperCase()
      }

    })
    return arrayDataHeader
  })

//DADOS DAS PARTES
  //Selecionando tabela das partes defensoras do processo
  const selectPartesProcesso = document.querySelectorAll('#tableTodasPartes  tbody > tr > td')
  const arrayPartesProcesso = [...selectPartesProcesso]

  //Filtrando: Nome das partes do processo { AUTORES,  REUS,  TESTEMUNHAS }
  const partesProcesso = arrayPartesProcesso.map(el => {
    const tipo = el.innerText.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleUpperCase()
    const nome = el.parentNode.cells[1].childNodes[0].textContent.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleUpperCase()

    return {
      tipo,
      nome,
    }

  }).filter((el, index) => index % 2 === 0)
  //'%' retorna o valor restante da divisão os elementos
  // restante = 0 numeros pares, igual a 1 impares

  //Filtrando: Nome das defesas {ADVOGADOS, DEFENSORES PUBLICOS}
  const defesasProcesso = arrayPartesProcesso.map(el => {
    const dadosDefensores = el.querySelectorAll('.mensagemExibindo')
    const arrayDadosDefensores = [...dadosDefensores].map(el => {
      return {
        tipo: el.innerText.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleUpperCase(),
        nome: el.nextSibling.textContent.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleUpperCase()
      }
    })


    return arrayDadosDefensores

  }).filter((el, index) => index % 2 === 1)

  //Filtrando: Nome das TESTEMUN
  const testemunhas = partesProcesso.filter(el => el.tipo.includes('TESTEMUNHA'))


//CONSTRUINDO OBJETO DE DADOS
  const dataPartesProcess = {
    "uf": "",
    area: dataHeader[2][2].name,
    juiz: dataHeader[1][4].name,
    partes: [
      {
        nome: partesProcesso[0].nome,
        tipo: partesProcesso[0].tipo,
        advogados: defesasProcesso[0],
      },
      {
        nome: partesProcesso[1].nome,
        tipo: partesProcesso[1].tipo,
        advogados: defesasProcesso[1],
      },
      {
        testemunhas
      }
    ],
    "sistema": "",
    "segmento": "",
    "tribunal": "",
    "movimentos": [
      {
        "data": "",
        "indice": 0,
        "eMovimento": true,
        "nomeOriginal": [
          ""
        ]
      }
    ],
    "valorCausa": {
      "moeda": "",
      "valor": 0
    },
    "assuntosCNJ": [
      {
        "titulo": ""
      },
    ],
    "urlProcesso": document.URL,
    "grauProcesso": 0,
    "orgaoJulgador": dataHeader[1][3].name,
    "unidadeOrigem": dataHeader[1][2].name,
    "classeProcessual": {
      "nome": dataHeader[1][0].name
    },
    "dataDistribuicao": "",
    "eProcessoDigital": true,
    statusObservacao: dataHeader[0][0].name,
    numeroProcessoUnico: dataHeader[0][0].title
  }

  //Retornar lista fora da variavel 
  //ver dados da lista header inserir 'dataHeader' no return
  return { dataPartesProcess }
}


module.exports = { extractDataHeaderTjAlagoas }


