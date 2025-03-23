const commandes = [];

exports.creer = ({ produit, quantite, prix }) => {
    return new Promise((resolve, reject) => {
        const nouvelleCommande = {
            id: commandes.length + 1,
            produit,
            quantite,
            prix
        };
        commandes.push(nouvelleCommande);
        resolve(nouvelleCommande);
    });
};

exports.recupererToutes = () => {
    return new Promise((resolve, reject) => {
        resolve(commandes);
    });
};

exports.recupererParId = (id) => {
    return new Promise((resolve, reject) => {
        const commande = commandes.find(c => c.id === parseInt(id));
        resolve(commande);
    });
};

exports.modifier = (id, { produit, quantite, prix }) => {
    return new Promise((resolve, reject) => {
        const commande = commandes.find(c => c.id === parseInt(id));
        if (!commande) {
            resolve(null);
        } else {
            if (produit !== undefined) commande.produit = produit;
            if (quantite !== undefined) commande.quantite = quantite;
            if (prix !== undefined) commande.prix = prix;
            resolve(commande);
        }
    });
};

exports.supprimer = (id) => {
    return new Promise((resolve, reject) => {
        const index = commandes.findIndex(c => c.id === parseInt(id));
        if (index === -1) {
            resolve(false);
        } else {
            commandes.splice(index, 1);
            resolve(true);
        }
    });
};
