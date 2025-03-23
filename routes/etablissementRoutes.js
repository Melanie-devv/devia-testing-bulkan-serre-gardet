const express = require('express');
const router = express.Router();
const etablissementController = require('../controllers/etablissementController');

router.get('/', etablissementController.getAllEtablissements);
router.get('/:id', etablissementController.getEtablissementById);
router.post('/', etablissementController.createEtablissement);
router.put('/:id', etablissementController.updateEtablissement);
router.delete('/:id', etablissementController.deleteEtablissement);

module.exports = router;
