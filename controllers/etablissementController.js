const Etablissement = require('../models/etablissementModel');

exports.getAllEtablissements = async (req, res) => {
    try {
        const etablissements = await Etablissement.findAll();
        res.json(etablissements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
