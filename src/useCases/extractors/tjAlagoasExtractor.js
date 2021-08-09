//------------------------< EXTRAÇÃO DE DADOS >------------------------

//TJAL - Tribunal de Justiça do Estado de Alagoas 

//Importando extensões
const puppeteer = require('puppeteer');
//(puppeteer): realiza prints, extração de imagens, pdfs e dados de uma página web

const { extractDataHeaderTjAlagoas } = require('../Functions/tjAlagoasFunctions')
//função extratora


//Recebendo variáveis de pesquisa
const digitoUnificado = "0731425822014"
const foroNumeroUnificado = "0001"


//------------------< Iniciando Puppeteer >-----------------

/* 
  Estrutura da macro na pesquisa:

    A macro é uma função assíncrona, ou seja, sempre aguarda um retorno para realizar uma nova ação.
      (cada 'await' é uma etapa)  

    - Abrir Nagevador
    - Abrir nova aba
    - Acessar link
    - Inserir informação no 'input' (campo pesquisar)
    - Teclar 'enter' (executar pesquisa)
    - Esperar a página carregar
    - Função evaluate (função extratora, que permite acesso a DOM do browser)
    - Fechar navegador
    - Retornar lista fora da função

    (chormium): navegador de código aberto que serve de base para o Google Chrome
    
*/

//------------------< Macro Extratora >-----------------

//Função assincrona para extrair dados do processo
async function extractProcessTjAlagoas(digitoUnificado, foroNumeroUnificado) {
  //Passo 1: Abrir Nagevador
  const browser = await puppeteer.launch();

  //Passo 2: Abrir nova aba
  const page = await browser.newPage();

  //Passo 3: Acessar link
  await page.goto(`https://www2.tjal.jus.br/cpopg/open.do`);

  //Passo 4: Inserir informação no 'input'
  await page.type('[name="numeroDigitoAnoUnificado"]', `${digitoUnificado}`);
  await page.type('[name="foroNumeroUnificado"]', `${foroNumeroUnificado}`);

  //Passo 5: Teclar 'enter'
  await page.keyboard.press('Enter');

  //Passo 6: Esperar a página carregar
  await page.waitForNavigation()

  //Passo 7: Função evaluate
  const processDataTjAlagoas = await page.evaluate(extractDataHeaderTjAlagoas)

  //Passo 8: Fechar navegador 
  await browser.close();

  //Passo 9: Retornar dados 

  //No console  
  //console.log(processDataList)

  //Retornar variável fora da função
  return processDataTjAlagoas
};

//Armazenando função em variável
const dataProcessTjAlagoas = extractProcessTjAlagoas(digitoUnificado, foroNumeroUnificado)

module.exports = { dataProcessTjAlagoas }