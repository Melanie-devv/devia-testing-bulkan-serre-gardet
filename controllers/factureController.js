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

// Récupérer une facture par ID
exports.getFactureById = async (req, res) => {
    try {
        const facture = await Facture.findByPk(req.params.id);
        if (!facture) {
            return res.status(404).json({ error: 'Facture non trouvée' });
        }
        res.json(facture);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Créer une nouvelle facture
exports.createFacture = async (req, res) => {
    try {
        const { montant, date, client } = req.body;
        if (!montant || !date || !client) {
            return res.status(400).json({ error: 'Montant, date et client sont requis' });
        }
        const newFacture = await Facture.create({ montant, date, client });
        res.status(201).json(newFacture);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};