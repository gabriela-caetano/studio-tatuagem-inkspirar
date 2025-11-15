// backend/controllers/AuthController.js
const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {
  static async login(req, res) {
    try {
      const { email, senha } = req.body;
      const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ? AND ativo = 1', [email]);
      if (rows.length === 0) return res.status(401).json({ message: 'Email ou senha inválidos' });

      const user = rows[0];
      const match = await bcrypt.compare(senha, user.senha);
      if (!match) return res.status(401).json({ message: 'Email ou senha inválidos' });

      const token = jwt.sign({ id: user.id, tipo: user.tipo, tatuador_id: user.tatuador_id }, process.env.JWT_SECRET, { expiresIn: '8h' });
      await db.query('UPDATE usuarios SET ultimo_login = NOW() WHERE id = ?', [user.id]);

      return res.json({
        message: 'Autenticado',
        token,
        usuario: { id: user.id, nome: user.nome, email: user.email, tipo: user.tipo, tatuador_id: user.tatuador_id },
        primeiro_acesso: user.primeiro_acesso
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro interno' });
    }
  }

  static async redefinirSenha(req, res) {
    try {
      const userId = req.usuario.id;
      const { novaSenha } = req.body;
      if (!novaSenha || novaSenha.length < 4) return res.status(400).json({ message: 'Senha muito curta' });

      const hash = await bcrypt.hash(novaSenha, 10);
      await db.query('UPDATE usuarios SET senha = ?, primeiro_acesso = 0 WHERE id = ?', [hash, userId]);
      res.json({ message: 'Senha atualizada' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro interno' });
    }
  }
}

module.exports = AuthController;
