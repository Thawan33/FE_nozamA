import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';

export function Registro() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [role, setRole] = useState<'USER' | 'ADMIN'>('USER');
  
  const navigate = useNavigate();

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setError('');
    setSuccess('');

    // Validação básica de senha
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      // Chama o endpoint /auth/register do seu Spring Boot
      // Por padrão, definimos o role como "USER"
      await api.post('/auth/register', { 
        username, 
        password, 
        role
      });
      
      setSuccess('Usuário registrado com sucesso! Redirecionando para o login...');
      
      // Redireciona após 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err: any) {
      if (err.response && err.response.data) {
        // Exibe mensagem de erro retornada pela API (ex: "Usuário já existe")
        setError(err.response.data);
      } else {
        setError('Ocorreu um erro ao registrar o usuário.');
      }
      console.error(err);
    }
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Criar Conta Nozama</h2>
        
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className="input-group">
          <label htmlFor="username">Usuário</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
            <label>Tipo de Conta</label>
            <select value={role} onChange={(e) => setRole(e.target.value as 'USER' | 'ADMIN')}>
                <option value="USER">Cliente (User)</option>
                <option value="ADMIN">Administrador (Admin)</option>
            </select>
        </div>

        <button type="submit">Registrar</button>

        <p className="auth-switch">
          Já tem conta? <Link to="/login">Entrar aqui</Link>
        </p>
      </form>
    </div>
  );
}