const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

// Define the Facture model
const Facture = sequelize.define('Facture', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  montant: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  client: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true // Pour que ça ajoute automatiquement les champs createdAt et updatedAt
});

module.exports = Facture;
