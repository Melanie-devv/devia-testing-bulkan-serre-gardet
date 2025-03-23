const Etablissement = require('../models/etablissementModel');

exports.getAllEtablissements = async (req, res) => {
    try {
        const etablissements = await Etablissement.findAll();
        res.json(etablissements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createEtablissement = async (req, res) => {
    try {
        const { nom, adresse, telephone } = req.body;
        if (!nom || !adresse || !telephone) {
            return res.status(400).json({ error: 'Nom, adresse et téléphone sont requis' });
        }
        const newEtablissement = await Etablissement.create({ nom, adresse, telephone });
        res.status(201).json(newEtablissement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
