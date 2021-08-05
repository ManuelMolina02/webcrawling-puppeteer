const express = require('express');
const { dataProcessTjAlagoas } = require('./useCases/extractors/tjAlagoasExtractor')
const { dataProcessTjPiaui } = require('./useCases/extractors/tjPiauiExtractor')

const app = express();

//Rota -->> root
app.get('/', (request, response) => {
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


//Rota 1 -->> Tribunal de Justiça do Estado de Alagoas - TJAL
app.get('/arqTJAL', async (request, response) => {
  //Aguarde o armazenamento dos dados no objeto 
  const processTjAlagoas = await dataProcessTjAlagoas
  //Retorne os dados em json
  return response.json({ processTjAlagoas });
});


//Rota 2 -->> Tribunal de Justiça do Estado de Piauí - TJPI
app.get('/arqTJPI', async (request, response) => {
  const processTjPiaui = await dataProcessTjPiaui
  return response.json({ processTjPiaui });
});


module.exports = app;
