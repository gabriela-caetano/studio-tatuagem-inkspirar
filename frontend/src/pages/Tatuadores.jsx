import React, { useState } from 'react';
import api from '../services/api';

export default function Tatuadores() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  async function handleCreate(e) {
    e.preventDefault();
    try {
      await api.post('/tatuadores', { nome, data_nascimento: '1990-01-01', cpf, email });
      alert('Tatuador criado (usuário automático criado).');
    } catch (err) {
      alert(err.response?.data?.message || 'Erro');
    }
  }
  return (
    <div style={{padding:24}}>
      <h2>Tatuadores</h2>
      <form onSubmit={handleCreate}>
        <input placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)} />
        <input placeholder="CPF" value={cpf} onChange={e=>setCpf(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}
