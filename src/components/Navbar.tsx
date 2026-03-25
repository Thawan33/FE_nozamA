import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import nozamaLogo from "../assets/nozama.svg";

export function Navbar() {
  const { user, signed, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-nozama text-nozama-light shadow-nozama-soft">
      <div className="nozama-container flex flex-wrap py-6 items-center justify-between gap-2">
        <div className="text-2xl font-bold">
          <Link
            to="/"
            className="text-nozama-light no-underline transition-opacity duration-200 hover:opacity-90"
          >
            <img
              src={nozamaLogo}
              alt="Nozama"
              className="h-9 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-[0.95rem] text-nozama-light no-underline transition-opacity duration-200 hover:opacity-90"
          >
            Home
          </Link>

          {/* Links Visíveis apenas para Logados */}
          {signed && (
            <Link
              to="/carrinho"
              className="text-[0.95rem] text-nozama-light no-underline transition-opacity duration-200 hover:opacity-90"
            >
              Carrinho
            </Link>
          )}

          {/* Link Visível apenas para ADMIN */}
          {user?.role === "ADMIN" && (
            <Link
              to="/admin/produtos"
              className="rounded border border-nozama-accent px-2 py-1 text-[0.95rem] font-bold text-nozama-accent no-underline transition-colors duration-200 hover:bg-nozama-accent hover:text-nozama-deep"
            >
              Painel Admin
            </Link>
          )}

          {/* Seção de Autenticação */}
          {signed ? (
            <div className="flex items-center gap-4 border-l border-nozama-muted pl-4">
              <span className="text-[0.9rem]">
                Olá, <strong>{user?.sub}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="cursor-pointer rounded border border-nozama-danger bg-transparent px-3 py-[5px] text-nozama-danger transition duration-200 hover:bg-nozama-danger hover:text-nozama-light"
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-[0.95rem] text-nozama-light no-underline transition-opacity duration-200 hover:opacity-90"
              >
                Entrar
              </Link>
              <Link
                to="/registro"
                className="rounded bg-nozama-accent px-3 py-1.5 font-bold text-nozama-deep no-underline transition-all duration-200 hover:brightness-95"
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
