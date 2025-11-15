// backend/controllers/ClienteController.js
const db = require('../config/database');

class ClienteController {
  static async create(req, res) {
    try {
      const { nome, data_nascimento, celular, cpf, instagram } = req.body;
      if (!nome || !data_nascimento || !cpf || !celular) return res.status(400).json({ message: 'Campos obrigatórios faltando' });

      const idade = new Date().getFullYear() - new Date(data_nascimento).getFullYear();
      if (idade < 18) return res.status(400).json({ message: 'Cliente deve ser maior de idade' });

      const [cpfExist] = await db.query('SELECT id FROM clientes WHERE cpf = ?', [cpf]);
      if (cpfExist.length) return res.status(409).json({ message: 'CPF já cadastrado' });

      const [result] = await db.query('INSERT INTO clientes (nome, data_nascimento, celular, cpf, instagram) VALUES (?,?,?,?,?)', [nome, data_nascimento, celular, cpf, instagram || null]);
      return res.status(201).json({ message: 'Cliente cadastrado com sucesso', clienteId: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro interno' });
    }
  }
}
module.exports = ClienteController;
