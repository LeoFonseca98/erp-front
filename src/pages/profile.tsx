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
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">
          Olá, {user.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-gray-500 text-sm mb-1">Obras</h3>
          <p className="text-3xl font-semibold text-gray-700">{obrasCount}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-gray-500 text-sm mb-1">Tarefas</h3>
          <p className="text-3xl font-semibold text-gray-700">8</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-gray-500 text-sm mb-1">Equipe</h3>
          <p className="text-3xl font-semibold text-gray-700">5</p>
        </div>

      </div>
    </>
  );
}

export default Profile;