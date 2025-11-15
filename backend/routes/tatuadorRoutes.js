// backend/routes/tatuadorRoutes.js
const express = require('express');
const router = express.Router();
const TatuadorController = require('../controllers/TatuadorController');
const auth = require('../middleware/auth');

router.post('/', auth, TatuadorController.create);

module.exports = router;
