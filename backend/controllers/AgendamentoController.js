// backend/controllers/AgendamentoController.js
const db = require('../config/database');

class AgendamentoController {
  static async create(req, res) {
    try {
      const { data_agendamento, hora_inicio, hora_fim, tatuador_id, cliente_id, ideia, valor } = req.body;
      if (!data_agendamento || !hora_inicio || !hora_fim || !tatuador_id || !cliente_id) return res.status(400).json({ message: 'Campos obrigatórios faltando' });
      if (hora_fim <= hora_inicio) return res.status(400).json({ message: 'Hora fim deve ser maior que hora início' });

      const [confTat] = await db.query(`
        SELECT id FROM agendamentos
        WHERE tatuador_id = ? AND data_agendamento = ? AND status != 'cancelada'
        AND NOT (hora_fim <= ? OR hora_inicio >= ?)
      `, [tatuador_id, data_agendamento, hora_inicio, hora_fim]);
      if (confTat.length) return res.status(400).json({ message: 'Tatuador indisponível neste horário' });

      const [confCli] = await db.query(`
        SELECT id FROM agendamentos
        WHERE cliente_id = ? AND data_agendamento = ?
        AND NOT (hora_fim <= ? OR hora_inicio >= ?)
      `, [cliente_id, data_agendamento, hora_inicio, hora_fim]);
      if (confCli.length) return res.status(400).json({ message: 'Cliente possui agendamento conflitante' });

      const [result] = await db.query('INSERT INTO agendamentos (data_agendamento, hora_inicio, hora_fim, tatuador_id, cliente_id, ideia, valor, status) VALUES (?, ?, ?, ?, ?, ?, ?, "aguardando")', [data_agendamento, hora_inicio, hora_fim, tatuador_id, cliente_id, ideia || null, valor || 0]);
      return res.status(201).json({ message: 'Agendamento criado', agendamentoId: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro interno' });
    }
  }
}
module.exports = AgendamentoController;
