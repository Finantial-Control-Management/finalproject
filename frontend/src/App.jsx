import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Root from "./utils/Root.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Categorias from "./components/Categorias.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoutes requireRole={["admin"]}>
              <Dashboard />
            </ProtectedRoutes>
          }
        >
          <Route index element={<h1>Summary of dashboard</h1>} />
          <Route path="recebimentos" element={<h1>Recebimentos</h1>} />
          <Route path="pagamentos" element={<h1>Pagamentos</h1>} />
          <Route path="relatorios" element={<h1>Relatórios</h1>} />
          <Route path="categorias" element={<Categorias />} />
          <Route path="users" element={<h1>Users</h1>} />

          <Route path="profile" element={<h1>Profile</h1>} />

          <Route path="logout" element={<h1>Logout</h1>} />
        </Route>
        <Route
          path="/customer/dashboard"
          element={<h1>Customer dashboard</h1>}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/unauthorized"
          element={
            <p className="font-bold text-3xl mt-20 ml-20">Unauthorized</p>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
