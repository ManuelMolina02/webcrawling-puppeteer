//--------------< FUNÇÕES EXTRATORAS DE DADOS >--------------


//Dados coletados do processo
/*

{
  numeroProcesso: 'String',
  situacaoProcesso: 'String',
  classeProcesso: 'String',
  foroProcesso: 'String'',
  varaProcesso: 'String',
  juizProcesso: 'String'
}

*/

const extractDataHeaderTjAlagoas = () => {
  //Selecionar dados do container principal
  const dadosPrincipaisProcesso = document.querySelectorAll('[id="containerDadosPrincipaisProcesso"] span')
  const maisDetalhesProcesso = document.querySelectorAll('[id="maisDetalhes"] span')
  const maisDetalhesValores = document.querySelectorAll('[id="maisDetalhes"] div > div')

  //Transformar objeto em array
  const arrayDadosPrincipais = [...dadosPrincipaisProcesso, ...maisDetalhesProcesso]

  //Para cada elemento no no array retorne filtrado:
  const filterData = arrayDadosPrincipais.filter((el) => {
    //Elementos que NÃO INCLUAM ID com sequecia de caracteres 'label'
    //Elementos que INCLUAM ID com sequecia de caracteres 'Processo' 
    return !el.id.includes('label') && el.id.includes('Processo')
  })

  //Para cada elemento no array retorne o innerHTML transformado:
  const listaDadosPrincipais = filterData.map((el) =>
    el.innerHTML
      //Remover caracteres especiais
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      //Deixar texto em caixa alta      
      .toLocaleUpperCase()
  )

  //Objeto de dados
  const dataHeader = {
    numeroProcesso: listaDadosPrincipais[0].replace(/\D/g, ""),
    situacaoProcesso: listaDadosPrincipais[1],
    classeProcesso: listaDadosPrincipais[2],
    foroProcesso: listaDadosPrincipais[3],
    varaProcesso: listaDadosPrincipais[4],
    juizProcesso: listaDadosPrincipais[5],
  }

  //Mostrar no console
  console.log(dataHeader)

  //Retornar lista fora da variavel
  return dataHeader
}

module.exports = { extractDataHeaderTjAlagoas }

