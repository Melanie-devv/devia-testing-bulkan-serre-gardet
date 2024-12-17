const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

// Define the Etablissement model
const Etablissement = sequelize.define('Etablissement', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Etablissement;