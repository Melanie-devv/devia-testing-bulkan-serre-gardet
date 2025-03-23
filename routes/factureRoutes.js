const express = require('express');
const router = express.Router();
const factureController = require('../controllers/factureController');

router.get('/', factureController.getAllFactures);
router.get('/:id', factureController.getFactureById);
router.post('/', factureController.createFacture);

module.exports = router;