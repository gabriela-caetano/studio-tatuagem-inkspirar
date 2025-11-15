// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const auth = require('../middleware/auth');

router.post('/login', AuthController.login);
router.put('/redefinir-senha', auth, AuthController.redefinirSenha);

module.exports = router;
