const request = require('supertest');
const app = require('../app'); // Point d'entrée principal de l'API
const { Etablissement } = require('../models/etablissementModel');

jest.mock('../models/etablissementModel'); // Mock Sequelize

describe('Etablissement Controller Tests', () => {
    describe('GET /etablissements', () => {
        it('should return a list of all etablissements', async () => {
            // Arrange
            const mockEtablissements = [
                { id: 1, nom: 'Etab 1', adresse: 'Adresse 1' },
                { id: 2, nom: 'Etab 2', adresse: 'Adresse 2' },
            ];
            Etablissement.findAll.mockResolvedValue(mockEtablissements);

            // Act
            const response = await request(app).get('/etablissements');

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockEtablissements);
        });

        it('should return an empty list if no etablissements exist', async () => {
            Etablissement.findAll.mockResolvedValue([]);
            const response = await request(app).get('/etablissements');
            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });
    });

    describe('GET /etablissements/:id', () => {
        it('should return the etablissement details if found', async () => {
            const mockEtablissement = { id: 1, nom: 'Etab 1', adresse: 'Adresse 1' };
            Etablissement.findByPk.mockResolvedValue(mockEtablissement);

            const response = await request(app).get('/etablissements/1');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockEtablissement);
        });

        it('should return 404 if the etablissement is not found', async () => {
            Etablissement.findByPk.mockResolvedValue(null);

            const response = await request(app).get('/etablissements/999');
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Etablissement not found' });
        });
    });

    describe('POST /etablissements', () => {
        it('should create a new etablissement if data is valid', async () => {
            const newEtablissement = { nom: 'Etab Test', adresse: 'Adresse Test' };
            const createdEtablissement = { id: 1, ...newEtablissement };

            Etablissement.create.mockResolvedValue(createdEtablissement);

            const response = await request(app).post('/etablissements').send(newEtablissement);
            expect(response.status).toBe(201);
            expect(response.body).toEqual(createdEtablissement);
        });

        it('should return 400 if required fields are missing', async () => {
            const response = await request(app).post('/etablissements').send({});
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Nom and Adresse are required' });
        });
    });

    describe('PUT /etablissements/:id', () => {
        it('should update the etablissement if it exists', async () => {
            const updatedData = { nom: 'Updated Etab', adresse: 'Updated Adresse' };
            const mockEtablissement = { id: 1, update: jest.fn().mockResolvedValue(updatedData) };

            Etablissement.findByPk.mockResolvedValue(mockEtablissement);

            const response = await request(app).put('/etablissements/1').send(updatedData);
            expect(response.status).toBe(200);
            expect(mockEtablissement.update).toHaveBeenCalledWith(updatedData);
            expect(response.body).toEqual(updatedData);
        });

        it('should return 404 if the etablissement is not found', async () => {
            Etablissement.findByPk.mockResolvedValue(null);

            const response = await request(app).put('/etablissements/999').send({ nom: 'Test' });
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Etablissement not found' });
        });
    });

    describe('DELETE /etablissements/:id', () => {
        it('should delete the etablissement if it exists', async () => {
            const mockEtablissement = { id: 1, destroy: jest.fn().mockResolvedValue() };

            Etablissement.findByPk.mockResolvedValue(mockEtablissement);

            const response = await request(app).delete('/etablissements/1');
            expect(response.status).toBe(204);
            expect(mockEtablissement.destroy).toHaveBeenCalled();
        });

        it('should return 404 if the etablissement is not found', async () => {
            Etablissement.findByPk.mockResolvedValue(null);

            const response = await request(app).delete('/etablissements/999');
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Etablissement not found' });
        });
    });
});
