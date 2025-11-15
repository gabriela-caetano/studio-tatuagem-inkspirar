import React from 'react';

export default function ModalResetSenha({ novaSenha, setNovaSenha, onSave }) {
  return (
    <div className="modal-reset">
      <div className="modal-card">
        <h3>Redefinir Senha</h3>
        <p>Defina sua nova senha (mínimo 4 caracteres).</p>
        <input type="password" value={novaSenha} onChange={e=>setNovaSenha(e.target.value)} />
        <div style={{display:'flex',gap:8, marginTop:12}}>
          <button onClick={onSave} className="btn-primary">Salvar</button>
        </div>
      </div>
    </div>
  );
}
