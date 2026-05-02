import { useState } from "react";
import api from "../services/api";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void | Promise<void>;
};

export default function ObraModal({ open, onClose, onCreated }: Props) {
  const [form, setForm] = useState({
    name: "",
    status: "",
    state: "",
    city: "",
    address: "",
    startDate: "",
    expectedEndDate: "",
    actualEndDate: "",
    budget: "",
    totalSpent: "",
    clientId: "",
    code: "",
  });

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await api.post("/obras", {
      ...form,
      budget: Number(form.budget),
      totalSpent: Number(form.totalSpent),
      startDate: new Date(form.startDate),
      expectedEndDate: new Date(form.expectedEndDate),
      actualEndDate: form.actualEndDate ? new Date(form.actualEndDate) : undefined,
    });

    await onCreated();
    onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Nova Obra</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          {/* DESCRIÇÃO */}
          <input
            placeholder="Descrição"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="border p-2 rounded"
          />

          {/* STATUS */}
          <select
            className="border p-2 rounded"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="">Selecione o status</option>
            <option value="INICIADA">Iniciada</option>
            <option value="EM_ANDAMENTO">Em andamento</option>
            <option value="PARADA">Parada</option>
            <option value="FINALIZADA">Finalizada</option>
          </select>

          {/* LOCAL */}
          <input
            placeholder="Estado"
            value={form.state}
            onChange={(e) =>
              setForm({ ...form, state: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            placeholder="Cidade"
            value={form.city}
            onChange={(e) =>
              setForm({ ...form, city: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            placeholder="Endereço"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
            className="border p-2 rounded"
          />

          {/* DATAS */}
          <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">
                    Data de Início
                </label>
                <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                    setForm({ ...form, startDate: e.target.value })
                    }
                    className="border p-2 rounded"
                />
            </div>
          

            <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">
                    Data de Término Esperada
                </label>
                <input
                    type="date"
                    value={form.expectedEndDate}
                    onChange={(e) =>
                    setForm({ ...form, expectedEndDate: e.target.value })
                    }
                    className="border p-2 rounded"
                />
            </div>
          
            <div  className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">
                    Data de Término Real
                </label>
                <input
                    type="date"
                    value={form.actualEndDate}
                    onChange={(e) =>
                    setForm({ ...form, actualEndDate: e.target.value })
                    }
                    className="border p-2 rounded"
                />
            </div>

            <input
              placeholder="Código"
              value={form.code}
              onChange={(e) =>
              setForm({ ...form, code: e.target.value })
              }
              className="border p-2 rounded"
            />
          

          {/* VALORES */}
          <input
            type="number"
            placeholder="Orçamento"
            value={form.budget}
            onChange={(e) =>
              setForm({ ...form, budget: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Total Gasto"
            value={form.totalSpent}
            onChange={(e) =>
              setForm({ ...form, totalSpent: e.target.value })
            }
            className="border p-2 rounded"
          />

          {/* CLIENTE (por enquanto simples) */}
          <input
            placeholder="Cliente"
            value={form.clientId}
            onChange={(e) =>
              setForm({ ...form, clientId: e.target.value })
            }
            className="border p-2 rounded"
          />

          {/* BOTÃO */}
          <button className="bg-green-600 text-white py-2 rounded">
            Salvar
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-4 text-red-500"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}