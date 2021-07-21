
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
  //Retornar dados em json
  return response.json({ message: "TJAL" });
});



//Rota -->> Tribunal de Justiça do Estado de Piauí - TJPI
app.get('/arqTJPI', async (request, response) => {

  //Retornar dados em json
  return response.json({ message: "TJPI" });
});


module.exports = app;
