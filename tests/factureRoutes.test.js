const chai = require('chai');
const chaiHttp = require('chai-http');
const supertest = require('supertest');
const app = require('../app'); // Import the app
const sequelize = require('../config/db'); // Import the database

const { expect } = chai;
const request = supertest(app);

chai.use(chaiHttp);

describe('Facture Routes', () => {
    // Before running tests, sync the database
    before(async () => {
        await sequelize.sync({ force: true }); // Reset the database
    });

    it('should create a new facture', async () => {
        const res = await request.post('/factures').send({
            montant: 100.50,
            date: new Date(),
            client: 'Client A',
        });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body.montant).to.equal(100.50);
        expect(res.body.client).to.equal('Client A');
    });

    it('should retrieve all factures', async () => {
        const res = await request.get('/factures');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.at.least(1); // Should have at least one facture
    });
});
