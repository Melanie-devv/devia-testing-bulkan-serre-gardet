const request = require('supertest');
const app = require('../app'); // Point d'entrée principal de l'API
const { Facture } = require('../models/factureModel');

jest.mock('../models/factureModel'); // Mock Sequelize

describe('Facture Controller Tests', () => {
    describe('GET /factures', () => {
        it('should return a list of all factures', async () => {
            const mockFactures = [
                { id: 1, montant: 100.0, date: '2024-12-01', client: 'Client A' },
                { id: 2, montant: 200.0, date: '2024-12-02', client: 'Client B' },
            ];
            Facture.findAll.mockResolvedValue(mockFactures);

            const response = await request(app).get('/factures');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockFactures);
        });

        it('should return an empty list if no factures exist', async () => {
            Facture.findAll.mockResolvedValue([]);
            const response = await request(app).get('/factures');
            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });
    });

    describe('GET /factures/:id', () => {
        it('should return the facture details if found', async () => {
            const mockFacture = { id: 1, montant: 100.0, date: '2024-12-01', client: 'Client A' };
            Facture.findByPk.mockResolvedValue(mockFacture);

            const response = await request(app).get('/factures/1');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockFacture);
        });

        it('should return 404 if the facture is not found', async () => {
            Facture.findByPk.mockResolvedValue(null);

            const response = await request(app).get('/factures/999');
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Facture not found' });
        });
    });

    describe('POST /factures', () => {
        it('should create a new facture if data is valid', async () => {
            const newFacture = { montant: 150.0, date: '2024-12-03', client: 'Client C' };
            const createdFacture = { id: 3, ...newFacture };

            Facture.create.mockResolvedValue(createdFacture);

            const response = await request(app).post('/factures').send(newFacture);
            expect(response.status).toBe(201);
            expect(response.body).toEqual(createdFacture);
        });

        it('should return 400 if required fields are missing', async () => {
            const response = await request(app).post('/factures').send({});
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'All fields are required' });
        });
    });

    describe('DELETE /factures/:id', () => {
        it('should delete the facture if it exists', async () => {
            const mockFacture = { id: 1, destroy: jest.fn().mockResolvedValue() };

            Facture.findByPk.mockResolvedValue(mockFacture);

            const response = await request(app).delete('/factures/1');
            expect(response.status).toBe(204);
            expect(mockFacture.destroy).toHaveBeenCalled();
        });

        it('should return 404 if the facture is not found', async () => {
            Facture.findByPk.mockResolvedValue(null);

            const response = await request(app).delete('/factures/999');
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Facture not found' });
        });
    });
});
