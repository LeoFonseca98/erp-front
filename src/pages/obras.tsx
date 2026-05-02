import ObraModal from "../components/ObraModal";
import { useEffect, useState } from "react";
import api from "../services/api";

function Obras() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [obras, setObras] = useState([]);

  async function loadObras() {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/obras", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setObras(response.data);
    } catch (error) {
      console.error("Erro ao carregar obras:", error);
    }
  }

    useEffect(() => {
    loadObras();
    }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">
          Obras
        </h1>

        <button  onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white font-bold px-8 py-4 rounded hover:bg-blue-700 shadow-black/50 shadow-lg">
          + Nova Obra
        </button>
      </div>

      {obras.length === 0 ? (
              <p className="text-gray-500 text-2xl">Nenhuma obra cadastrada.</p>
            ) : (
              <div className="flex flex-col gap-3 shadow-black/50 shadow-2xl p-4 rounded ">
                {obras.map((obra: any) => (
                  <div
                    key={obra.id}
                    className="border-2 border-gray-300 p-4 rounded-lg flex justify-between items-center hover:shadow hover:bg-gray-200 transition-shadow"
                  >
                    <div>
                      <button className="flex flex-col items-start gap-1 hover:bg-gray-100 p-2 rounded">
                        <h3 className="font-semibold text-2xl">{obra.name}</h3>
                        <p className="text-sm text-gray-500">
                          {obra.city} - {obra.state}
                        </p>
                      </button>
                    </div>

                    <span className="text-sm bg-gray-200 px-2 py-1 rounded">
                      {obra.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

      <ObraModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreated={loadObras}
        />
    </>
  )
}

export default Obras;