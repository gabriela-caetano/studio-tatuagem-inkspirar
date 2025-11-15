import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import ModalResetSenha from '../components/ModalResetSenha';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [novaSenha, setNovaSenha] = useState('');
  const { setUser, login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { usuario, primeiro_acesso } = await login(email, senha);
      setUser(usuario);
      if (primeiro_acesso === 1) {
        setShowReset(true);
      } else {
        navigate('/');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Erro no login');
    }
  }

  async function handleReset() {
    try {
      await api.put('/auth/redefinir-senha', { novaSenha });
      alert('Senha alterada. Faça login novamente.');
      setShowReset(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (err) {
      alert('Erro ao redefinir senha');
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="brand"><h1>Ink<span>(</span>spirar<span>)</span></h1></div>
        <h2>LOGIN</h2>
        <form onSubmit={handleLogin}>
          <label>USERNAME</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} />
          <label>SENHA</label>
          <input type="password" value={senha} onChange={e=>setSenha(e.target.value)} />
          <button type="submit" className="btn-primary">ENTRAR</button>
        </form>
      </div>

      {showReset && (
        <ModalResetSenha novaSenha={novaSenha} setNovaSenha={setNovaSenha} onSave={handleReset} />
      )}
    </div>
  );
}
