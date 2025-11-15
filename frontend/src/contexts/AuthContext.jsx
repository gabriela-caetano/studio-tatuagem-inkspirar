import React, { createContext, useState } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  async function login(email, senha) {
    const res = await api.post('/auth/login', { email, senha });
    const { token, usuario, primeiro_acesso } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(usuario));
    setUser(usuario);
    return { usuario, primeiro_acesso };
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, setUser, login, logout }}>{children}</AuthContext.Provider>;
}
