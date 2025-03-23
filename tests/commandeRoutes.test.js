const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');

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

        expect(res.statusCode).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body.produit).to.equal('Livre');
    });
});

describe('GET /commandes', () => {
    it('doit récupérer toutes les commandes', async () => {
        const res = await request(app).get('/commandes');

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
    });
});
