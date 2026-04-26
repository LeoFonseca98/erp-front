import { useEffect, useState } from "react";
import api from "../services/api";
import type { User } from "../types/auth";

function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get<User>("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch {
        alert("Não autorizado");
      }
    }

    loadUser();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  if (!user) {
    return (
      <div className="center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">

      {/* SIDEBAR */}
      <div className="sidebar color-white">
        <h2>🏗️ Admin</h2>

        <ul>
          <li>Dashboard</li>
          <li>Obras</li>
          <li>Tarefas</li>
          <li>Equipe</li>
          <li>Configurações</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* TOPBAR */}
        <div className="topbar">
          <h1>Olá, {user.name}</h1>

          <button onClick={handleLogout} className="logout-btn">
            Sair
          </button>
        </div>

        {/* CARDS */}
        <div className="cards">
          <div className="card">
            <h3>Obras</h3>
            <p>12</p>
          </div>

          <div className="card">
            <h3>Tarefas</h3>
            <p>8</p>
          </div>

          <div className="card">
            <h3>Equipe</h3>
            <p>5</p>
          </div>
        </div>

        {/* LISTA */}
        <div className="list">
          <h3>Atividades recentes</h3>

          <ul>
            <li>Nova obra criada</li>
            <li>Tarefa atualizada</li>
            <li>Usuário adicionado</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Profile;