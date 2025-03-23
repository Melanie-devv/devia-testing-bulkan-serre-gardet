const Commande = require('../models/commandeModel');

exports.ajouterCommande = async (req, res) => {
    const { produit, quantite, prix } = req.body;
    try {
        const nouvelleCommande = await Commande.creer({ produit, quantite, prix });
        res.status(201).json(nouvelleCommande);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
