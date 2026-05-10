import { useEffect, useState } from "react";
import api from "../services/api";
import type { User } from "../types/auth";
import { useNavigate, useLocation } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [obrasCount, setObrasCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function loadUser() {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const userResponse = await api.get<User>("/user/profile", { headers });
        const obrasResponse = await api.get("/obras/count", { headers });

        setUser(userResponse.data);
        setObrasCount(obrasResponse.data.count);
      } catch (error: any) {
        console.error("Erro:", error.response?.status, error.response?.config?.url);
        alert("Não autorizado");
        navigate("/login");
      }
    }

    loadUser();
  }, [navigate, location.pathname]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-700">
            Visão Geral
          </h1>
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Obras ativas</p>
          <h2 className="text-2xl font-bold">{obrasCount}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Tarefas pendentes</p>
          <h2 className="text-2xl font-bold">8</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Obras atrasadas</p>
          <h2 className="text-2xl font-bold">5</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Gasto mensal</p>
          <h2 className="text-2xl font-bold text-green-600">R$ 84k</h2>
        </div>

      </div>

      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ESQUERDA */}
        <div className="lg:col-span-2 space-y-6">

          {/* ANDAMENTO */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Andamento das obras</h3>

            <div className="space-y-4">

              <div>
                <p className="text-sm">Residencial Vila Nova</p>
                <div className="w-full bg-gray-200 h-2 rounded mt-1">
                  <div className="bg-green-500 h-2 rounded w-[72%]" />
                </div>
              </div>

              <div>
                <p className="text-sm">Galpão Industrial</p>
                <div className="w-full bg-gray-200 h-2 rounded mt-1">
                  <div className="bg-yellow-500 h-2 rounded w-[38%]" />
                </div>
              </div>

            </div>
          </div>

          {/* FINANCEIRO */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Resumo financeiro</h3>

            <div className="space-y-2 text-sm">
              <p>Orçamento: R$ 1.240.000</p>
              <p>Gasto: R$ 487.300</p>
              <p className="text-green-600 font-semibold">
                Saldo: R$ 752.700
              </p>
            </div>
          </div>

        </div>

        {/* DIREITA */}
        <div className="space-y-6">

          {/* TAREFAS */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Tarefas</h3>

            <ul className="space-y-2 text-sm">
              <li>Entrega de concreto</li>
              <li>Vistoria fundação</li>
              <li>Reunião cliente</li>
            </ul>
          </div>

          {/* EQUIPE */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Equipe</h3>

            <ul className="space-y-2 text-sm">
              <li>Carlos - Mestre de obras</li>
              <li>Marcos - Engenheiro</li>
              <li>João - Eletricista</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;