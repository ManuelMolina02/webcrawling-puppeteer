const express = require('express');
const { primaryDataProcess } = require('./models/form-data-one')
const { dataProcessTwo } = require('./functions/extractors')

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


//Rota 1 -->> Tribunal de Justiça do Estado de Alagoas - TJAL
app.get('/arqTJAL', async (request, response) => {
  //Aguarde o armazenamento dos dados no objeto 
  const processOneFont = await primaryDataProcess
  //Retorne os dados em json
  return response.json({ processOneFont });
});



//Rota 2 -->> Tribunal de Justiça do Estado de Piauí - TJPI
app.get('/arqTJPI', async (request, response) => {
    //Aguarde o armazenamento dos dados no objeto 
    const processTwoFont = await dataProcessTwo
    //Retorne os dados em json
    return response.json({ processTwoFont });
});


module.exports = app;
