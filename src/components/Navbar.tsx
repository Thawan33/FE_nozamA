import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export function Navbar() {
  const { user, signed, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>NOZAMA</Link>
      </div>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        
        {/* Links Visíveis apenas para Logados */}
        {signed && (
          <Link to="/carrinho" style={styles.link}>Carrinho</Link>
        )}

        {/* Link Visível apenas para ADMIN */}
        {user?.role === 'ADMIN' && (
          <Link to="/admin/produtos" style={styles.adminLink}>
            Painel Admin
          </Link>
        )}

        {/* Seção de Autenticação */}
        {signed ? (
          <div style={styles.userSection}>
            <span style={styles.userName}>
              Olá, <strong>{user?.sub}</strong>
            </span>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Sair
            </button>
          </div>
        ) : (
          <div style={styles.authLinks}>
            <Link to="/login" style={styles.link}>Entrar</Link>
            <Link to="/registro" style={styles.registerBtn}>Criar Conta</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

// Tipagem para evitar erros de "Property does not exist"
const styles: Record<string, React.CSSProperties> = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 2rem',
    height: '70px',
    background: '#232f3e',
    color: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  logo: { 
    fontSize: '1.5rem', 
    fontWeight: 'bold' 
  },
  links: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '25px' 
  },
  link: { 
    color: 'white', 
    textDecoration: 'none',
    fontSize: '0.95rem'
  },
  adminLink: {
    color: '#febd69',
    fontWeight: 'bold',
    textDecoration: 'none',
    fontSize: '0.95rem',
    border: '1px solid #febd69',
    padding: '4px 8px',
    borderRadius: '4px'
  },
  userSection: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '15px',
    borderLeft: '1px solid #555',
    paddingLeft: '15px'
  },
  authLinks: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '15px' 
  },
  userName: { 
    fontSize: '0.9rem' 
  },
  logoutBtn: {
    background: 'transparent',
    color: '#ff4d4d',
    border: '1px solid #ff4d4d',
    padding: '5px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: '0.2s'
  },
  registerBtn: {
    background: '#febd69',
    padding: '6px 12px',
    borderRadius: '4px',
    color: '#131921',
    fontWeight: 'bold',
    textDecoration: 'none'
  }
};