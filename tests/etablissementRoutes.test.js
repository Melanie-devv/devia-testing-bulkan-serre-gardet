const Etablissement = require('../models/etablissementModel');

// Get all etablissements
exports.getAllEtablissements = async (req, res) => {
    try {
        const etablissements = await Etablissement.findAll();
        res.json(etablissements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get etablissement by ID
exports.getEtablissementById = async (req, res) => {
    try {
        const etablissement = await Etablissement.findByPk(req.params.id);
        if (!etablissement) {
            return res.status(404).json({ error: 'Etablissement not found' });
        }
        res.json(etablissement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new etablissement
exports.createEtablissement = async (req, res) => {
    try {
        const newEtablissement = await Etablissement.create(req.body);
        res.status(201).json(newEtablissement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an etablissement
exports.updateEtablissement = async (req, res) => {
    try {
        const etablissement = await Etablissement.findByPk(req.params.id);
        if (!etablissement) {
            return res.status(404).json({ error: 'Etablissement not found' });
        }
        await etablissement.update(req.body);
        res.json(etablissement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an etablissement
exports.deleteEtablissement = async (req, res) => {
    try {
        const etablissement = await Etablissement.findByPk(req.params.id);
        if (!etablissement) {
            return res.status(404).json({ error: 'Etablissement not found' });
        }
        await etablissement.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};