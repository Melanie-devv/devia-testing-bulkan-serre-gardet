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

exports.recupererToutesCommandes = async (req, res) => {
    try {
        const commandes = await Commande.recupererToutes();
        res.status(200).json(commandes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.recupererCommandeParId = async (req, res) => {
    try {
        const commande = await Commande.recupererParId(req.params.id);
        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée." });
        }
        res.status(200).json(commande);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.modifierCommande = async (req, res) => {
    const { produit, quantite, prix } = req.body;
    try {
        const commandeModifiee = await Commande.modifier(req.params.id, { produit, quantite, prix });
        if (!commandeModifiee) {
            return res.status(404).json({ message: "Commande non trouvée." });
        }
        res.status(200).json(commandeModifiee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.supprimerCommande = async (req, res) => {
    try {
        const resultat = await Commande.supprimer(req.params.id);
        if (!resultat) {
            return res.status(404).json({ message: "Commande non trouvée." });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
