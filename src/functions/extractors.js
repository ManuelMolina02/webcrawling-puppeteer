//-----<< Extensões >>-----//
const puppeteer = require('puppeteer');

const digitoUnificado = "0731425822014"
const foroNumeroUnificado = "0001"


async function primaryDataExtraction(digitoUnificado, foroNumeroUnificado) {
  //Abrir Nagevador - ver processo -> { headless: false }
  const browser = await puppeteer.launch();

  //Abrir nova aba
  const page = await browser.newPage();

  //Acessar link
  await page.goto(`https://www2.tjal.jus.br/cpopg/open.do`);

  //Inserir dado no input
  await page.type('[name="numeroDigitoAnoUnificado"]', `${digitoUnificado}`);
  await page.type('[name="foroNumeroUnificado"]', `${foroNumeroUnificado}`);

  //Clicar em pesquisar
  await page.keyboard.press('Enter');

  //Esperar a página carregar
  await page.waitForNavigation()


  //Função evaluate: acessa a DOM do browser  
  const processDataList = await page.evaluate(() => {

    //Extrair dados do container principal
    const dadosPrincipaisProcesso = document.querySelectorAll('[id="containerDadosPrincipaisProcesso"] span')
    const maisDetalhesProcesso = document.querySelectorAll('[id="maisDetalhes"] span')
    const maisDetalhesValores = document.querySelectorAll('[id="maisDetalhes"] div > div')
    //Transformar objeto em array
    const arrayDadosPrincipais = [...dadosPrincipaisProcesso, ...maisDetalhesProcesso]

    const filterData = arrayDadosPrincipais.filter((el) => {
      return !el.id.includes('label') && el.id.includes('Processo')
    })


    //Para cada elemento desse array retorne o innerHTML formatado  
    const listaDadosPrincipais = filterData.map((el) =>
      el.innerHTML
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleUpperCase()
    )


    const cabecalhoDados = {
      numeroProcesso: listaDadosPrincipais[0].replace(/\D/g, ""),
      situacaoProcesso: listaDadosPrincipais[1],
      classeProcesso: listaDadosPrincipais[2],
      foroProcesso: listaDadosPrincipais[3],
      varaProcesso: listaDadosPrincipais[4],
      juizProcesso: listaDadosPrincipais[5],
    }

    //Mostrar no console
    console.log(cabecalhoDados)

    //Retornar lista fora da variavel
    return cabecalhoDados

  });

  //Fechar navegador
  await browser.close();

  //Retornar dados no console  
  console.log({ processDataList })

  //Retornar lista fora da função
  return processDataList
};

async function secondDataExtraction() {
  
  //------------------< Iniciando Puppeteer >-----------------
  //Abrir navegador
  const browser = await puppeteer.launch();

  //Abrir nova página
  const page = await browser.newPage();

  //Acessar página
  await page.goto('https://tjpi.pje.jus.br/1g/ConsultaPublica/DetalheProcessoConsultaPublica/listView.seam?ca=fcc12a4f2e8dbc17c3bea3e60aa7ed58880c63c23fbb9757');


  //------------------< Raspagem de dados >-----------------

  // evaluate: executa uma função no browser (acessa o html da página)
  const dataListPI = await page.evaluate(() => {


    //Construindo objeto de retorno
    const dataListPI = {
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

    //Retornar lista fora da função
    return dataListPI
  });

  //Fechar navegador
  await browser.close();

  //Retornar dados em json
  return dataListPI;
};


const dataProcessOne = primaryDataExtraction(digitoUnificado, foroNumeroUnificado)
const dataProcessTwo = secondDataExtraction()


//Exportar variaveis 
module.exports = { dataProcessOne, dataProcessTwo }