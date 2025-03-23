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

describe('GET /commandes/:id', () => {
    it('doit récupérer une commande par ID', async () => {
        // On crée d'abord une commande pour avoir un ID à tester
        const commande = await request(app)
            .post('/commandes')
            .send({ produit: 'Stylo', quantite: 10, prix: 1 });

        const res = await request(app).get(`/commandes/${commande.body.id}`);

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('id', commande.body.id);
        expect(res.body.produit).to.equal('Stylo');
    });

    it("renvoie une erreur 404 si l'ID n'existe pas", async () => {
        const res = await request(app).get('/commandes/999');

        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property('message');
    });
});

describe('PUT /commandes/:id', () => {
    it('doit modifier une commande existante', async () => {
        const commande = await request(app)
            .post('/commandes')
            .send({ produit: 'Cahier', quantite: 3, prix: 5 });

        const res = await request(app)
            .put(`/commandes/${commande.body.id}`)
            .send({ produit: 'Cahier Modifié', quantite: 4 });

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('id', commande.body.id);
        expect(res.body.produit).to.equal('Cahier Modifié');
        expect(res.body.quantite).to.equal(4);
        expect(res.body.prix).to.equal(5);
    });

    it("renvoie une erreur 404 si l'ID n'existe pas", async () => {
        const res = await request(app)
            .put('/commandes/999')
            .send({ produit: 'Inexistant' });

        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property('message');
    });
});
