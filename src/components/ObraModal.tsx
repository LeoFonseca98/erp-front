import { useState } from "react";
import api from "../services/api";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void | Promise<void>;
};

const STATUS_OPTS = [
  { value: "NAO_INICIADA", label: "Não iniciada", dot: "bg-[#888780]", sel: "border-[#888780] bg-[#F1EFE8]", text: "text-[#444441]" },
  { value: "EM_ANDAMENTO", label: "Em andamento", dot: "bg-[#378ADD]", sel: "border-[#378ADD] bg-blue-50",   text: "text-blue-800" },
  { value: "PARADA",       label: "Pausada",       dot: "bg-[#E24B4A]", sel: "border-[#E24B4A] bg-red-50",   text: "text-red-800" },
  { value: "FINALIZADA",   label: "Concluída",     dot: "bg-[#639922]", sel: "border-[#639922] bg-green-50", text: "text-green-800" },
];

const ESTADOS = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

const FIELD = "w-full text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200";
const LABEL = "block text-xs text-gray-500 mb-1";
const SECTION_TITLE = "text-[11px] font-medium text-gray-400 uppercase tracking-wide flex items-center gap-1.5 mb-3";

export default function ObraModal({ open, onClose, onCreated }: Props) {
  const [form, setForm] = useState({
    name: "",
    status: "NAO_INICIADA",
    state: "",
    city: "",
    address: "",
    startDate: "",
    expectedEndDate: "",
    actualEndDate: "",
    budget: "",
    contractValue: "",
    clientId: "",
    code: "",
    type: "",
    area: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/obras", {
        name:            form.name,
        status:          form.status,
        state:           form.state,
        city:            form.city,
        address:         form.address,
        code:            form.code,
        type:            form.type,
        area:            form.area ? Number(form.area) : undefined,
        description:     form.description,
        budget:          form.budget ? Number(form.budget) : undefined,
        contractValue:   form.contractValue ? Number(form.contractValue) : undefined,
        clientId:        form.clientId,
        startDate:       form.startDate ? new Date(form.startDate) : undefined,
        expectedEndDate: form.expectedEndDate ? new Date(form.expectedEndDate) : undefined,
        actualEndDate:   form.actualEndDate ? new Date(form.actualEndDate) : undefined,
      });
      await onCreated();
      onClose();
    } catch (err) {
      console.error("Erro ao criar obra:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 overflow-y-auto py-8 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl border border-gray-200 w-full max-w-[560px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-base">
              🏗
            </div>
            <span className="text-[17px] font-medium text-gray-800">Nova obra</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 flex flex-col gap-5 max-h-[70vh] overflow-y-auto">

            {/* ── Identificação ── */}
            <div>
              <p className={SECTION_TITLE}>
                <span>🪪</span> Identificação
              </p>
              <div className="flex flex-col gap-3">
                <div>
                  <label className={LABEL}>Nome da obra <span className="text-red-400">*</span></label>
                  <input
                    required
                    className={FIELD}
                    placeholder="Ex: Construção da casa de João Silva"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={LABEL}>Tipo de obra</label>
                    <select className={FIELD} value={form.type} onChange={(e) => set("type", e.target.value)}>
                      <option value="">Selecionar</option>
                      <option value="RESIDENCIAL">Residencial</option>
                      <option value="COMERCIAL">Comercial</option>
                      <option value="INDUSTRIAL">Industrial</option>
                      <option value="REFORMA">Reforma</option>
                      <option value="OUTRO">Outro</option>
                    </select>
                  </div>
                  <div>
                    <label className={LABEL}>Área (m²)</label>
                    <input
                      type="number"
                      className={FIELD}
                      placeholder="Ex: 120"
                      value={form.area}
                      onChange={(e) => set("area", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={LABEL}>Cliente <span className="text-red-400">*</span></label>
                    <input
                      required
                      className={FIELD}
                      placeholder="ID ou nome do cliente"
                      value={form.clientId}
                      onChange={(e) => set("clientId", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={LABEL}>Código da obra</label>
                    <input
                      className={FIELD}
                      placeholder="Ex: OBR-2026-001"
                      value={form.code}
                      onChange={(e) => set("code", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* ── Status inicial ── */}
            <div>
              <p className={SECTION_TITLE}>
                <span>📊</span> Status inicial
              </p>
              <div className="grid grid-cols-4 gap-2">
                {STATUS_OPTS.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => set("status", s.value)}
                    className={`border rounded-lg py-2 px-1 text-center transition-all ${
                      form.status === s.value
                        ? `border-[1.5px] ${s.sel}`
                        : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full mx-auto mb-1.5 ${s.dot}`} />
                    <span className={`text-[11px] font-medium block leading-tight ${form.status === s.value ? s.text : "text-gray-500"}`}>
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* ── Localização ── */}
            <div>
              <p className={SECTION_TITLE}>
                <span>📍</span> Localização
              </p>
              <div className="flex flex-col gap-3">
                <div>
                  <label className={LABEL}>Endereço</label>
                  <input
                    className={FIELD}
                    placeholder="Rua, número, bairro"
                    value={form.address}
                    onChange={(e) => set("address", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className={LABEL}>Cidade <span className="text-red-400">*</span></label>
                    <input
                      required
                      className={FIELD}
                      placeholder="Ex: Recife"
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={LABEL}>Estado</label>
                    <select className={FIELD} value={form.state} onChange={(e) => set("state", e.target.value)}>
                      <option value="">UF</option>
                      {ESTADOS.map((uf) => (
                        <option key={uf} value={uf}>{uf}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* ── Datas e orçamento ── */}
            <div>
              <p className={SECTION_TITLE}>
                <span>📅</span> Datas e orçamento
              </p>
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={LABEL}>Data de início</label>
                    <input
                      type="date"
                      className={FIELD}
                      value={form.startDate}
                      onChange={(e) => set("startDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={LABEL}>Previsão de término</label>
                    <input
                      type="date"
                      className={FIELD}
                      value={form.expectedEndDate}
                      onChange={(e) => set("expectedEndDate", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className={LABEL}>Data de término real</label>
                  <input
                    type="date"
                    className={FIELD}
                    value={form.actualEndDate}
                    onChange={(e) => set("actualEndDate", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={LABEL}>Orçamento total (R$)</label>
                    <input
                      type="number"
                      className={FIELD}
                      placeholder="Ex: 85000"
                      value={form.budget}
                      onChange={(e) => set("budget", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={LABEL}>Valor do contrato (R$)</label>
                    <input
                      type="number"
                      className={FIELD}
                      placeholder="Ex: 90000"
                      value={form.contractValue}
                      onChange={(e) => set("contractValue", e.target.value)}
                    />
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 flex items-center gap-1">
                  ℹ️ O total gasto é calculado automaticamente conforme os gastos forem lançados.
                </p>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* ── Descrição ── */}
            <div>
              <p className={SECTION_TITLE}>
                <span>📝</span> Descrição
              </p>
              <textarea
                className={`${FIELD} resize-none min-h-[80px]`}
                placeholder="Descreva a obra, escopo, observações iniciais..."
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </div>

          </div>

          {/* Footer */}
          <div className="flex gap-2 justify-end px-6 py-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="text-sm font-medium px-5 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? "Salvando..." : "✓ Salvar obra"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}