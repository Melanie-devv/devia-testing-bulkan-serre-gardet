const Facture = require('../models/factureModel');

// Récupérer toutes les factures
exports.getAllFactures = async (req, res) => {
    try {
        const factures = await Facture.findAll();
        res.json(factures);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};