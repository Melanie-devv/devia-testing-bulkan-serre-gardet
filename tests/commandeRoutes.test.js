const request = require('supertest');
const app = require('../app');

describe('POST /commandes', () => {
    it('doit créer une nouvelle commande', async () => {
        const nouvelleCommande = {
            produit: 'Livre',
            quantite: 2,
            prix: 25
        };

        const res = await request(app)
            .post('/commandes')
            .send(nouvelleCommande);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.produit).toEqual('Livre');
    });
});
