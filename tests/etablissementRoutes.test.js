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

    it('should retrieve all etablissements', async () => {
        const res = await request.get('/etablissements');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.at.least(0); // Should have 0 etablissement
    });
});
