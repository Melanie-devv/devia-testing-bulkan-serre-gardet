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
