import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface User {
  name: string;
  role?: string;
}

const menuSections = [
  {
    title: "GESTÃO",
    items: [
      { name: "Dashboard", path: "/profile", icon: "🏠" },
      { name: "Obras", path: "/obras", icon: "🚧" },
      { name: "Tarefas", path: "/tarefas", icon: "✅" },
      { name: "Equipe", path: "/equipe", icon: "👥" },
    ],
  },
  {
    title: "FINANCEIRO",
    items: [
      { name: "Financeiro", path: "/financeiro", icon: "💰" },
      { name: "Materiais", path: "/materiais", icon: "📦" },
      { name: "Fornecedores", path: "/fornecedores", icon: "🏭" },
    ],
  },
  {
    title: "ANÁLISE",
    items: [
      { name: "Relatórios", path: "/relatorios", icon: "📊" },
    ],
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Base() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  // Lê o usuário do localStorage uma única vez na montagem
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (!raw) return;
    try {
      setUser(JSON.parse(raw) as User);
    } catch {
      console.warn("Dados de usuário inválidos no localStorage");
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  return (
    <div className="w-full min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-800 text-white flex flex-col p-6 shrink-0">

        {/* Logo */}
        <h2 className="text-2xl font-bold">🏗️ Construtora Premium</h2>
        <p className="text-slate-400 text-sm mt-1 mb-4">Gestão de obras</p>
        <hr className="border-slate-600 mb-6" />

        {/* Nav */}
        <nav className="flex flex-col gap-6 flex-1">
          {menuSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-1">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 py-2 px-4 rounded transition ${
                          isActive
                            ? "bg-blue-500 text-white"
                            : "text-slate-300 hover:bg-slate-600"
                        }`
                      }
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Rodapé: perfil + logout */}
        <div className="mt-auto pt-4 border-t border-slate-600 flex flex-col gap-3">

          {/* Avatar com iniciais */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center font-semibold text-white shrink-0">
              {user?.name ? getInitials(user.name) : "?"}
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name ?? "Usuário"}</p>
              <p className="text-xs text-slate-400">{user?.role ?? "Administrador"}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-2 rounded bg-red-500 hover:bg-red-600 transition text-white text-sm"
          >
            Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 bg-slate-100 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}