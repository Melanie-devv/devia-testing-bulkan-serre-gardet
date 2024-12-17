const { Etablissement } = require('../models/etablissementModel');

// Récupérer tous les établissements
exports.getAllEtablissements = async (req, res) => {
    try {
        const etablissements = await Etablissement.findAll();
        res.status(200).json(etablissements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un établissement par ID
exports.getEtablissementById = async (req, res) => {
    try {
        const etablissement = await Etablissement.findByPk(req.params.id);
        if (!etablissement) {
            return res.status(404).json({ error: 'Etablissement not found' });
        }
        res.status(200).json(etablissement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Créer un nouvel établissement
exports.createEtablissement = async (req, res) => {
    try {
        const { nom, adresse } = req.body;
        if (!nom || !adresse) {
            return res.status(400).json({ error: 'Nom and Adresse are required' });
        }
        const newEtablissement = await Etablissement.create(req.body);
        res.status(201).json(newEtablissement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour un établissement existant
exports.updateEtablissement = async (req, res) => {
    try {
        const { id } = req.params;
        const etablissement = await Etablissement.findByPk(id);
        if (!etablissement) {
            return res.status(404).json({ error: 'Etablissement not found' });
        }
        const updatedEtablissement = await etablissement.update(req.body);
        res.status(200).json(updatedEtablissement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un établissement
exports.deleteEtablissement = async (req, res) => {
    try {
        const { id } = req.params;
        const etablissement = await Etablissement.findByPk(id);
        if (!etablissement) {
            return res.status(404).json({ error: 'Etablissement not found' });
        }
        await etablissement.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
