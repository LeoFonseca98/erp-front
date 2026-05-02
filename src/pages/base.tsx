import { Outlet, NavLink, useNavigate } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/profile" },
  { name: "Obras", path: "/obras" },
  { name: "Financeiro", path: "/financeiro" },
  { name: "Materiais", path: "/materiais" },
  { name: "Fornecedores", path: "/fornecedores" },
  { name: "Relatórios", path: "/relatorios" },
];

export default function Base() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  return (
    <div className="w-full min-h-screen flex ">
      
      {/* Sidebar */}
      <aside className="w-96 bg-slate-800 text-white flex flex-col p-8 shrink-0">
        <h2 className="text-4xl font-bold mb-12">🏗️ Construtora Premium</h2>

        <nav className="flex flex-col gap-6 font-bold">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `py-3 px-4 rounded text-2xl text-center transition-colors ${
                  isActive
                    ? "bg-green-700 text-white font-semibold"
                    : "text-slate-300 hover:bg-slate-700"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 text-white py-2 rounded hover:bg-red-600 w-24"
        >
          Sair
        </button>
      </aside>

      <div className="flex-1 bg-slate-100 p-6">
        <Outlet />
      </div>
    </div>
  );
}