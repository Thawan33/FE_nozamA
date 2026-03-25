import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./routes/PrivateRoute";
import { Navbar } from "./components/Navbar"; // Importe aqui
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Registro } from "./pages/Registro";
import { Carrinho } from "./pages/Carrinho";
import { AdminRoute } from "./routes/AdminRoute";
import { AdminProdutos } from "./pages/AdminProdutos";

// Suas páginas...

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar /> {/* A Navbar fica fixa no topo */}
        <main className="pt-20">
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />

            {/* Rotas de Usuário Comum */}
            <Route element={<PrivateRoute />}>
              <Route path="/carrinho" element={<Carrinho />} />
            </Route>

            {/* Rotas de Administrador */}
            <Route element={<AdminRoute />}>
              <Route path="/admin/produtos" element={<AdminProdutos />} />
            </Route>
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}
