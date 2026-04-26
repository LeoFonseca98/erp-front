import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from "./pages/login";
import Profile from "./pages/profile";
import ProtectedRouter from "./routes/ProtectedRouter";
import Register from "./pages/register";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> 

        <Route path="/login" element={<Login />} />
        
        <Route path="/profile" element={
          <ProtectedRouter>
            <Profile />
          </ProtectedRouter>} />

          <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>

  );
}
export default App
