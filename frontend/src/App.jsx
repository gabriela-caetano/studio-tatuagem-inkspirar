import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Tatuadores from './pages/Tatuadores';
import Agendamentos from './pages/Agendamentos';
import { AuthContext } from './contexts/AuthContext';

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
      <Route path="/clientes" element={<PrivateRoute><Clientes/></PrivateRoute>} />
      <Route path="/tatuadores" element={<PrivateRoute><Tatuadores/></PrivateRoute>} />
      <Route path="/agendamentos" element={<PrivateRoute><Agendamentos/></PrivateRoute>} />
    </Routes>
  );
}
