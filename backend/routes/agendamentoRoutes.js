// backend/routes/agendamentoRoutes.js
const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controllers/AgendamentoController');
const auth = require('../middleware/auth');

router.post('/', auth, AgendamentoController.create);

module.exports = router;
