//------------------------< EXTRAÇÃO DE DADOS >------------------------

//TJPI - Tribunal de Justiça do Estado de Piauí

//Importando extensões
const puppeteer = require('puppeteer');
const { extractDataHeaderTjPiaui } = require('../functions/tjPiauiFunctions')

//------------------< Macro Extratora >-----------------

async function extractProcessTjPiaui() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://tjpi.pje.jus.br/1g/ConsultaPublica/DetalheProcessoConsultaPublica/listView.seam?ca=fcc12a4f2e8dbc17c3bea3e60aa7ed58880c63c23fbb9757');
  const processDataTjPiaui = await page.evaluate(extractDataHeaderTjPiaui)
  await browser.close();

  //console.log(processDataList)

  return processDataTjPiaui
};

const dataProcessTjPiaui = extractProcessTjPiaui()
//console.log(dataProcessTwo)

module.exports = { dataProcessTjPiaui }