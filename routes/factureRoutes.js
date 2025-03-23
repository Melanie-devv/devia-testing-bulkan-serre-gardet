const express = require('express');
const router = express.Router();
const factureController = require('../controllers/factureController');

router.get('/', factureController.getAllFactures);

module.exports = router;