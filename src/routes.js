
const express = require('express');
const puppeteer = require('puppeteer');
const {dataProcessOne} = require('../functions/extractors')

const app = express();

//Rota -->> root
app.get('/', async (request, response) => {

  //Retornar rotas acessíveis
  return response.json([{
    "Fonte de dados 1 >": "Tribunal de Justiça do Estado de Alagoas - TJAL",
    "Rota >": 'http://localhost:3000/arqTJAL'
  },
  {
    "Fonte de dados 2 >": "Tribunal de Justiça do Estado de Piauí - TJPI",
    "Rota >": 'http://localhost:3000/arqTJPI'
  }]);
});


//Rota -->> Tribunal de Justiça do Estado de Alagoas - TJAL
app.get('/arqTJAL', async (request, response) => {
  //Aguarde o armazenamento dos dados no objeto 
  const processOneFont = await dataProcessOne
  //Retorne os dados em json
  return response.json({ processOneFont });
});



//Rota -->> Tribunal de Justiça do Estado de Piauí - TJPI
app.get('/arqTJPI', async (request, response) => {

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

    //Raspagem/ modelação/ tratamento de dados

    //Primeira tabela
    const primaryTable = document.querySelectorAll(' div > div.value.col-sm-12')
    const primaryArray = [...primaryTable]

    //Segunda tabela
    const secondTable = document.querySelectorAll('tr.rich-table-row > td.rich-table-cell > span > div > span')
    const secondArray = [...secondTable]

    const dadosProcesso = {
      numeroProcessoUnico: primaryArray[0].innerText,
      dataDistribuicao: primaryArray[1].innerText,
      CNJClasseProcessual: primaryArray[2].innerText.replace(/\D/g, ""),
      nomeClasseProcessual: primaryArray[2].innerText.replace(/\d?\(?\)?/g, "").trim(),
      unidadeOrigem: primaryArray[4].innerText.toUpperCase(),
      orgaoJulgador: primaryArray[6].innerText.toUpperCase(),
      urlProcesso: window.location.href,

    }

    const poloAtivo = {
      nomeParticipante: secondArray[0].textContent.slice(0, 27).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase(),
      cnpjParticipante: secondArray[0].textContent.replace(/\D/g, ''),
      tipoParticipante: secondArray[0].textContent.slice(56, 61),
      poloParticipante: document.getElementById('j_id130:processoPartesPoloAtivoResumidoList:0:j_id313').childNodes[1].innerText.toUpperCase(),
    }


    //Construindo objeto de retorno
    const dataListPI = {
      "uf": "PI",
      "partes": [
        {
          "cnpj": poloAtivo.cnpjParticipante,
          "nome": poloAtivo.nomeParticipante,
          "polo": poloAtivo.poloParticipante,
          "tipo": poloAtivo.tipoParticipante
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
      "urlProcesso": dadosProcesso.urlProcesso,
      "grauProcesso": 1,
      "orgaoJulgador": dadosProcesso.orgaoJulgador,
      "unidadeOrigem": dadosProcesso.unidadeOrigem,
      "classeProcessual": {
        "nome": dadosProcesso.nomeClasseProcessual,
        "codigoCNJ": dadosProcesso.CNJClasseProcessual
      },
      "dataDistribuicao": dadosProcesso.dataDistribuicao,
      "eProcessoDigital": true,
      "numeroProcessoUnico": dadosProcesso.numeroProcessoUnico
    }

    //Retornar lista fora da função
    return dataListPI
  });

  //Fechar navegador
  await browser.close();

  //Retornar dados em json
  return response.json({ dataListPI });
});


module.exports = app;
