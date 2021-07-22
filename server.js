//Importando módulo das rotas
const app = require('./routes')

//Inicializando servidor
app.listen(3000, () => {
  console.log('server is runnig! ACCESS >   http://localhost:3000/')
});
