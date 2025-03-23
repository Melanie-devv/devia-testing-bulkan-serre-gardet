const chai = require('chai');
const chaiHttp = require('chai-http');
const supertest = require('supertest');
const app = require('../app'); // Import the app
const sequelize = require('../config/db'); // Import the database
const Etablissement = require('../models/etablissementModel');

const { expect } = chai;
const request = supertest(app);

chai.use(chaiHttp);

describe('Etablissement Routes', () => {
    before(async () => {
        await sequelize.sync({ force: true }); // Reset the database
    });

    it('should create a new etablissement', async () => {
        const res = await request.post('/etablissements').send({
            nom: 'Établissement A',
            adresse: '123 Rue A',
            telephone: '0123456789'
        });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body.nom).to.equal('Établissement A');
    });

    it('should retrieve all etablissements', async () => {
        const res = await request.get('/etablissements');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.at.least(1); // Should have at least one etablissement
    });

});
