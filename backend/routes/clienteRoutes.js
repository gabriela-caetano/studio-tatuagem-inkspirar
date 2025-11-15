// backend/routes/clienteRoutes.js
const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/ClienteController');
const auth = require('../middleware/auth');

router.post('/', auth, ClienteController.create);

module.exports = router;
