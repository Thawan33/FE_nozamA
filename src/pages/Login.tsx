import React, {useState} from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import api from '../api/api';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setError('');

    try {
      // Chama o endpoint /auth/login do seu Spring Boot
      const response = await api.post('/auth/login', { username, password });
      
      // O backend retorna um objeto contendo o token JWT
      const { token } = response.data;
      
      // Armazena o token no contexto e localStorage
      login(token);
      
      // Redireciona para a home
      navigate('/');
    } catch (err: any) {
      setError('Falha no login. Verifique suas credenciais.');
      console.error(err);
    }
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Entrar no Nozama</h2>
        
        {error && <p className="error-message">{error}</p>}

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

        <button type="submit">Entrar</button>

        <p className="auth-switch">
          Não tem conta? <Link to="/registro">Registre-se aqui</Link>
        </p>
      </form>
    </div>
  );
}