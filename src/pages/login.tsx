import { useState } from "react";
import api from "../services/api";
import type { LoginResponse } from "../types/auth";
import { useNavigate } from "react-router-dom"; 

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  async function handleLogin(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await api.post<LoginResponse>("/auth/login", {
        email,
        password
      });

      const { token } = response.data;

      localStorage.setItem("token", token);

      navigate("/profile");
      alert("Login feito!");
    } catch (err) {
      alert("Erro no login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-semibold mb-6 text-gray-700">
          Welcome Back!
        </h1>
      <input className="w-full mb-6 p-3 bg-gray-100 outline-none rounded-lg" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        className="w-full mb-6 p-3 bg-gray-100 outline-none rounded-lg"
        placeholder="Senha"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">Login</button>
    </form>
    </div>
  ); 
}

export default Login;




