import { useState } from "react";
import api from "../services/api";
import type { LoginResponse } from "../types/auth";
import { useNavigate } from "react-router-dom"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await api.post<LoginResponse>("/auth/login", {
        email,
        password
      });

      const { token } = response.data;

      localStorage.setItem("token", token);

      navigate("/profile");
    } catch {
      alert("Erro no login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-semibold mb-6 text-gray-700">
          Welcome Back!
        </h1>

        <input
          className="w-full mb-4 p-3 bg-gray-100 rounded-lg"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-6 p-3 bg-gray-100 rounded-lg"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">
          Login
        </button>

        {/* 🔥 BOTÃO REGISTER */}
        <p className="mt-4 text-sm text-gray-500">
          Não tem conta?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Criar conta
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;




