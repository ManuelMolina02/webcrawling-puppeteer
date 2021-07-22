const { expect } = require('@jest/globals')
const request = require('supertest')
const app = require('../routes')


//Descrição do teste
describe('Testing route connection', () => {
    //Iniciar teste
    it('Connection root', async () => {
        //Fazer requisição na rota '/exemplo'
        const root = await request(app).get('/')
        //validar se status da rota é 200
        expect(root.statusCode).toEqual(200)
    });

    it('First route - Tribunal de Justiça de Alagoas - TJAL', async () => {
        const firstRoute = await request(app).get('/arqTJAL')
        console.log(firstRoute.body)
        expect(firstRoute.statusCode).toEqual(200)
    });

    it('Second route - Tribunal de Justiça do Piauí', async () => {
        const secondRoute = await request(app).get('/arqTJPI')
        console.log(secondRoute.body)
        expect(secondRoute.statusCode).toEqual(200)
    });
})


