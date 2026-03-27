import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

export function Registro() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [role, setRole] = useState<"USER" | "ADMIN">("USER");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setError("");
    setSuccess("");

    // Validação básica de senha
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/register", {
        username,
        password,
        role,
      });

      setSuccess(
        "Usuário registrado com sucesso! Redirecionando para o login...",
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("Ocorreu um erro ao registrar o usuário.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 rounded-lg bg-nozama-light px-8 py-10 shadow-nozama-soft"
      >
        <h2 className="text-center text-3xl font-bold text-nozama-deep">
          Criar Conta Nozama
        </h2>

        {error && (
          <p className="rounded bg-nozama-danger/10 px-4 py-2 text-center text-sm text-nozama-danger">
            {error}
          </p>
        )}
        {success && (
          <p className="rounded bg-green-100 px-4 py-2 text-center text-sm text-green-700">
            {success}
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

        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-nozama-deep"
          >
            Confirmar Senha
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            className="w-full rounded border border-nozama-muted px-3 py-2 text-nozama-deep placeholder-gray-400 transition focus:border-nozama-accent focus:outline-none focus:ring-2 focus:ring-nozama-accent/20 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-nozama-deep">
            Tipo de Conta
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "USER" | "ADMIN")}
            disabled={loading}
            className="w-full rounded border border-nozama-muted px-3 py-2 text-nozama-deep transition focus:border-nozama-accent focus:outline-none focus:ring-2 focus:ring-nozama-accent/20 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
          >
            <option value="USER">Cliente (User)</option>
            <option value="ADMIN">Administrador (Admin)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-nozama-accent px-4 py-3 font-bold text-nozama-deep transition duration-200 hover:brightness-95 disabled:cursor-not-allowed disabled:brightness-75 disabled:opacity-60"
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>

        <p className="text-center text-sm text-nozama-muted">
          Já tem conta?{" "}
          <Link
            to="/login"
            className="font-bold text-nozama-accent no-underline transition duration-200 hover:brightness-90"
          >
            Entrar aqui
          </Link>
        </p>
      </form>
    </div>
  );
}
