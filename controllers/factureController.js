const { Facture } = require('../models/factureModel');

// Récupérer toutes les factures
exports.getAllFactures = async (req, res) => {
    try {
        const factures = await Facture.findAll();
        res.status(200).json(factures);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer une facture par ID
exports.getFactureById = async (req, res) => {
    try {
        const facture = await Facture.findByPk(req.params.id);
        if (!facture) {
            return res.status(404).json({ error: 'Facture not found' });
        }
        res.status(200).json(facture);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Créer une nouvelle facture
exports.createFacture = async (req, res) => {
    try {
        const { montant, date, client } = req.body;
        if (!montant || !date || !client) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newFacture = await Facture.create(req.body);
        res.status(201).json(newFacture);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer une facture
exports.deleteFacture = async (req, res) => {
    try {
        const { id } = req.params;
        const facture = await Facture.findByPk(id);
        if (!facture) {
            return res.status(404).json({ error: 'Facture not found' });
        }
        await facture.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
