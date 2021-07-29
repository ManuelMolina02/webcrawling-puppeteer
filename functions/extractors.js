//-----<< Extensões >>-----//
const puppeteer = require('puppeteer');

const digitoUnificado = "0731425822014" 
const foroNumeroUnificado = "0001"


async function processDataExtraction(digitoUnificado, foroNumeroUnificado) {
  //Abrir Nagevador
  const browser = await puppeteer.launch({ headless: false });

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
    const dadosPrincipaisProcesso =  document.querySelectorAll('[id="containerDadosPrincipaisProcesso"] span')
    
    //Transformar objeto em array
    const arrayDadosPrincipais = [...dadosPrincipaisProcesso]

    //Para cada elemento desse array retorne o innerHTML sem espaços  
    const listaDadosPrincipais =  arrayDadosPrincipais.map(el => el.innerHTML.trim())

    const cabecalhoDados = {
        numeroProcesso: listaDadosPrincipais[0],
        situacaoProcesso: listaDadosPrincipais[1],
        nivelTramitacao: listaDadosPrincipais[2],

        classeProcesso :listaDadosPrincipais[4],
        assuntoProcesso:listaDadosPrincipais[6],
        foroProcesso:listaDadosPrincipais[8],
        varaProcesso:listaDadosPrincipais[10],
        juizProcesso:listaDadosPrincipais[12],
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

const dataProcessOne = processDataExtraction(digitoUnificado, foroNumeroUnificado)


//Exportar variaveis 
module.exports = { dataProcessOne}