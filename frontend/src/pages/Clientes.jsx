import React, { useState } from 'react';
import api from '../services/api';

export default function Clientes() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  async function handleCreate(e) {
    e.preventDefault();
    try {
      await api.post('/clientes', { nome, data_nascimento: '2000-01-01', celular: '000', cpf });
      alert('Cliente criado');
    } catch (err) {
      alert(err.response?.data?.message || 'Erro');
    }
  }
  return (
    <div style={{padding:24}}>
      <h2>Clientes</h2>
      <form onSubmit={handleCreate}>
        <input placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)} />
        <input placeholder="CPF" value={cpf} onChange={e=>setCpf(e.target.value)} />
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}
