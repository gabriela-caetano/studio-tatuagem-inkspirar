// backend/scripts/create_users_for_tatuadores.js
const db = require('../config/database');
const bcrypt = require('bcryptjs');

(async function run() {
  try {
    const [tatuadores] = await db.query('SELECT id, nome, email, cpf FROM tatuadores WHERE ativo = 1');
    for (const t of tatuadores) {
      if (!t.email) { console.log('pulando sem email id=', t.id); continue; }
      const cpfDigits = (t.cpf || '').toString().replace(/\D/g, '');
      if (cpfDigits.length < 4) { console.log('cpf inválido id=', t.id); continue; }
      const senhaInicial = cpfDigits.substring(0,4);
      const hash = await bcrypt.hash(senhaInicial, 10);
      const [exist] = await db.query('SELECT id FROM usuarios WHERE email = ?', [t.email]);
      if (exist.length) { console.log('usuario já existe', t.email); continue; }
      await db.query('INSERT INTO usuarios (nome,email,senha,tipo,tatuador_id,ativo,primeiro_acesso,data_cadastro) VALUES (?,?,?,?,?,1,1,NOW())', [t.nome, t.email, hash, 'tatuador', t.id]);
      console.log(`criado ${t.email} senha:${senhaInicial}`);
    }
    console.log('finalizado');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
