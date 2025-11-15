// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const tatuadorRoutes = require('./routes/tatuadorRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/tatuadores', tatuadorRoutes);
app.use('/api/agendamentos', agendamentoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Backend rodando em http://localhost:${PORT}`));
