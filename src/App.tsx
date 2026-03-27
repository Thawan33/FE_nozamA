import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./routes/PrivateRoute";
import { Navbar } from "./components/Navbar"; // Importe aqui
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Registro } from "./pages/Registro";
import { Produtos } from "./pages/Produtos"
import { Carrinho } from "./pages/Carrinho";
import { AdminRoute } from "./routes/AdminRoute";
import { AdminProdutos } from "./pages/AdminProdutos";
import { ProdutoDetalhes } from "./pages/ProdutoDetalhes";

// Suas páginas...

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />

            <Route element={<PrivateRoute />}>
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/carrinho" element={<Carrinho />} />
              <Route path="/produto/:id" element={<ProdutoDetalhes />} />
            </Route>

            <Route element={<AdminRoute />}>
              <Route path="/admin/produtos" element={<AdminProdutos />} />
            </Route>
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}
