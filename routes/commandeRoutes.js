const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commandeController');

router.post('/', commandeController.ajouterCommande);
router.get('/', commandeController.recupererToutesCommandes);
router.get('/:id', commandeController.recupererCommandeParId);

module.exports = router;
