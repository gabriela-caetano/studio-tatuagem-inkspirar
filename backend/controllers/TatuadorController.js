// backend/controllers/TatuadorController.js
const db = require('../config/database');
const bcrypt = require('bcryptjs');

class TatuadorController {
  static async create(req, res) {
    try {
      const { nome, data_nascimento, data_admissao, celular, especialidades, instagram, cpf, email, valor_hora } = req.body;
      if (!nome || !data_nascimento || !cpf || !email) return res.status(400).json({ message: 'Dados obrigatórios faltando' });

      const [cpfExist] = await db.query('SELECT id FROM tatuadores WHERE cpf = ?', [cpf]);
      if (cpfExist.length) return res.status(409).json({ message: 'CPF já cadastrado' });

      const [emailExist] = await db.query('SELECT id FROM tatuadores WHERE email = ?', [email]);
      if (emailExist.length) return res.status(409).json({ message: 'Email já cadastrado' });

      const [result] = await db.query(
        `INSERT INTO tatuadores (nome, data_nascimento, data_admissao, especialidades, celular, instagram, cpf, email, valor_hora, disponibilidade)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [nome, data_nascimento, data_admissao || null, especialidades || null, celular || null, instagram || null, cpf, email, valor_hora || null, JSON.stringify({})]
      );

      const tatuadorId = result.insertId;
      // criar usuário automático
      const cpfDigits = (cpf || '').toString().replace(/\D/g, '');
      if (cpfDigits.length >= 4) {
        const senhaInicial = cpfDigits.substring(0,4);
        const hash = await bcrypt.hash(senhaInicial, 10);
        const [uExist] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email]);
        if (uExist.length === 0) {
          await db.query('INSERT INTO usuarios (nome, email, senha, tipo, tatuador_id, ativo, primeiro_acesso, data_cadastro) VALUES (?,?,?,?,?,1,1,NOW())',
            [nome, email, hash, 'tatuador', tatuadorId]);
        }
      }

      return res.status(201).json({ message: 'Tatuador cadastrado com sucesso', tatuadorId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro interno' });
    }
  }
}
module.exports = TatuadorController;
