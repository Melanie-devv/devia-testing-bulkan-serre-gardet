const express = require('express');
const router = express.Router();
const etablissementController = require('../controllers/etablissementController');

router.get('/', etablissementController.getAllEtablissements);

module.exports = router;
