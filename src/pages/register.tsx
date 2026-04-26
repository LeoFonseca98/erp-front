import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        email,
        password,
      });

      alert("Conta criada!");
      navigate("/login");
    } catch {
      alert("Erro no registro");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-semibold mb-6 text-gray-700">
          Criar Conta
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

        <button className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600">
          Registrar
        </button>
      </form>
    </div>
  );
}

export default Register;