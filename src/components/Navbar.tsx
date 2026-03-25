import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export function Navbar() {
  const { user, signed, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="bg-[var(--nozama-brand-navy)] text-[var(--nozama-text-on-dark)] shadow-[var(--nozama-shadow-soft)]">
      <div className="nozama-container flex h-[70px] items-center justify-between gap-4">
        <div className="text-2xl font-bold">
          <Link
            to="/"
            className="text-[var(--nozama-text-on-dark)] no-underline transition-opacity duration-200 hover:opacity-90"
          >
            NOZAMA
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-[0.95rem] text-[var(--nozama-text-on-dark)] no-underline transition-opacity duration-200 hover:opacity-90"
          >
            Home
          </Link>

          {/* Links Visíveis apenas para Logados */}
          {signed && (
            <Link
              to="/carrinho"
              className="text-[0.95rem] text-[var(--nozama-text-on-dark)] no-underline transition-opacity duration-200 hover:opacity-90"
            >
              Carrinho
            </Link>
          )}

          {/* Link Visível apenas para ADMIN */}
          {user?.role === "ADMIN" && (
            <Link
              to="/admin/produtos"
              className="rounded border border-[var(--nozama-brand-accent)] px-2 py-1 text-[0.95rem] font-bold text-[var(--nozama-brand-accent)] no-underline transition-colors duration-200 hover:bg-[var(--nozama-brand-accent)] hover:text-[var(--nozama-brand-deep)]"
            >
              Painel Admin
            </Link>
          )}

          {/* Seção de Autenticação */}
          {signed ? (
            <div className="flex items-center gap-4 border-l border-[var(--nozama-border-muted)] pl-4">
              <span className="text-[0.9rem]">
                Olá, <strong>{user?.sub}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="cursor-pointer rounded border border-[var(--nozama-danger)] bg-transparent px-3 py-[5px] text-[var(--nozama-danger)] transition duration-200 hover:bg-[var(--nozama-danger)] hover:text-[var(--nozama-text-on-dark)]"
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-[0.95rem] text-[var(--nozama-text-on-dark)] no-underline transition-opacity duration-200 hover:opacity-90"
              >
                Entrar
              </Link>
              <Link
                to="/registro"
                className="rounded bg-[var(--nozama-brand-accent)] px-3 py-1.5 font-bold text-[var(--nozama-brand-deep)] no-underline transition-all duration-200 hover:brightness-95"
              >
                Criar Conta
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
