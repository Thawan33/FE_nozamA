import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import api from "../api/api";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Chama o endpoint /auth/login do seu Spring Boot
      const response = await api.post("/auth/login", { username, password });

      // O backend retorna um objeto contendo o token JWT
      const { token } = response.data;

      // Armazena o token no contexto e localStorage
      login(token);

      // Redireciona para a home
      navigate("/");
    } catch (err: any) {
      setError("Falha no login. Verifique suas credenciais.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-lg bg-nozama-light px-8 py-10 shadow-nozama-soft"
      >
        <h2 className="text-center text-3xl font-bold text-nozama-deep">
          Entrar na Nozama
        </h2>

        {error && (
          <p className="rounded bg-nozama-danger/10 px-4 py-2 text-center text-sm text-nozama-danger">
            {error}
          </p>
        )}

        <div className="space-y-2">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-nozama-deep"
          >
            Usuário
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            className="w-full rounded border border-nozama-muted px-3 py-2 text-nozama-deep placeholder-gray-400 transition focus:border-nozama-accent focus:outline-none focus:ring-2 focus:ring-nozama-accent/20 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-nozama-deep"
          >
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="w-full rounded border border-nozama-muted px-3 py-2 text-nozama-deep placeholder-gray-400 transition focus:border-nozama-accent focus:outline-none focus:ring-2 focus:ring-nozama-accent/20 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-nozama-accent px-4 py-3 font-bold text-nozama-deep transition duration-200 hover:brightness-95 disabled:cursor-not-allowed disabled:brightness-75 disabled:opacity-60"
        >
          {loading ? "Carregando..." : "Entrar"}
        </button>

        <p className="text-center text-sm text-nozama-muted">
          Não tem conta?{" "}
          <Link
            to="/registro"
            className="font-bold text-nozama-accent no-underline transition duration-200 hover:brightness-90"
          >
            Registre-se aqui
          </Link>
        </p>
      </form>
    </div>
  );
}
