
const express = require('express');
const puppeteer = require('puppeteer');

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

  //------------------< Iniciando Puppeteer >-----------------
  //Abrir navegador
  /*abrirá um browser do chormium (para visualizar o processo inserir {headless: false} dentro de launch)*/
  const browser = await puppeteer.launch();

  //Abrir nova página
  const page = await browser.newPage();

  //Acessar página
  await page.goto('https://www2.tjal.jus.br/cpopg/show.do?processo.codigo=01000I1FT0000&processo.foro=1&processo.numero=0731425-82.2014.8.02.0001&uuidCaptcha=sajcaptcha_2a47933e74d14cf7982a0a1a1469cd26');


  //------------------< Raspagem de dados >-----------------

  // evaluate: executa uma função no browser (acessa o html da página)
  const dataListAL = await page.evaluate(() => {

    //Raspagem/ modelação/ tratamento de dados

    const dadosProcesso = {
      area: String(document.querySelector('#areaProcesso > span').innerText.toUpperCase()),
      juiz: String(document.querySelector('#juizProcesso').innerText.toUpperCase()),
      numeroProcessoUnico: String(document.querySelector('#numeroProcesso').innerText.toUpperCase()),
      dataDistribuicao: String(document.querySelector('#dataHoraDistribuicaoProcesso').innerText.toUpperCase()),
      orgaoJulgador: String(document.querySelector('#varaProcesso').innerText.toUpperCase()),
      unidadeOrigem: String(document.querySelector('#foroProcesso').innerText.toUpperCase()),
      classeProcessualNome: String(document.querySelector('#classeProcesso').innerText.toUpperCase()),
      statusObservacao: String(document.querySelector('#labelSituacaoProcesso').innerText.toUpperCase()),
     
      moeda: String(document.querySelector('#valorAcaoProcesso').innerText.replace(/[0-9]?\,?\.?/g, "").trim()),
      valor: (Number(valorProcesso) / 100),
      valorProcesso: Number(document.querySelector('#valorAcaoProcesso').innerText.replace(/\D/g, "")),
 
      urlProcesso: window.location.href,
    }
    
    const partesProcesso = {
      nomeAutora: document.querySelectorAll('tbody > tr > td.nomeParteEAdvogado')[0].childNodes[0].textContent.trim(),
      tipoAutora: String(document.querySelector('.mensagemExibindo').innerText.toUpperCase().trim()),
      nomeAdvogadoAutora: document.querySelectorAll('tbody > tr > td.nomeParteEAdvogado')[0].childNodes[4].textContent.trim(),
      tipoAdvogadoAutora: document.querySelectorAll('tbody > tr > td.nomeParteEAdvogado')[0].childNodes[3].textContent.trim(),

      nomeReu: document.querySelectorAll('tbody > tr > td.nomeParteEAdvogado')[1].childNodes[0].textContent.trim()
    }
    

    //Construindo objeto de retorno
    const dataListAL = {
      "uf": "AL",
      "area": dadosProcesso.area,
      "juiz": dadosProcesso.juiz,
      "partes": [
        {
          "nome": partesProcesso.nomeAutora,
          "polo": "ATIVO",
          "tipo": partesProcesso.tipoAutora,
          "advogados": [
            {
              "nome": partesProcesso.nomeAdvogadoAutora,
              "tipo": partesProcesso.tipoAdvogadoAutora
            }
          ]
        },
        {
          "nome": partesProcesso.nomeReu,
          "polo": "PASSIVO",
          "tipo": "REU",
          "advogados": []
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
      "movimentos": [],

      "valorCausa": {
        "moeda": dadosProcesso.moeda,
        "valor": dadosProcesso.valor
      },
      "assuntosCNJ": [],
      "urlProcesso": dadosProcesso.urlProcesso,
      "grauProcesso": 1,
      "orgaoJulgador": dadosProcesso.orgaoJulgador,
      "unidadeOrigem": dadosProcesso.unidadeOrigem,
      "classeProcessual": {
        "nome": dadosProcesso.classeProcessualNome,
      },
      "dataDistribuicao": dadosProcesso.dataDistribuicao,
      "eProcessoDigital": true,
      "statusObservacao": dadosProcesso.statusObservacao,
      "numeroProcessoUnico": dadosProcesso.numeroProcessoUnico,
    }

    //Retornar lista fora da função
    return dataListAL
  });

  //Fechar navegador
  await browser.close();

  //Retornar dados em json
  return response.json({ dataListAL });
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
      numeroProcessoUnico: String(primaryArray[0].innerText),
      dataDistribuicao: String(primaryArray[1].innerText),
      CNJClasseProcessual: String(primaryArray[2].innerText.replace(/\D/g, "")),
      nomeClasseProcessual: String(primaryArray[2].innerText.replace(/\d?\(?\)?/g, "").trim()),
      unidadeOrigem: String(primaryArray[4].innerText.toUpperCase()),
      orgaoJulgador: String(primaryArray[6].innerText.toUpperCase()),
      urlProcesso: window.location.href,

    }

    const poloAtivo = {
      nomeParticipante: secondArray[0].textContent.slice(0, 27).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase(),
      cnpjParticipante: secondArray[0].textContent.replace(/\D/g, ''),
      tipoParticipante: secondArray[0].textContent.slice(56, 61),
      poloParticipante: String(document.getElementById('j_id130:processoPartesPoloAtivoResumidoList:0:j_id313').childNodes[1].innerText.toUpperCase()),


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
          "cpf": "83204377334",
          "nome": "GETULIO GOMES MACIEL",
          "polo": "PASSIVO",
          "tipo": "REU",
          "advogados": []
        },
        {
          "cnpj": "18519123000107",
          "nome": "ALCENOR LOPES MARTINS ME - ME",
          "polo": "PASSIVO",
          "tipo": "REU",
          "advogados": []
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
