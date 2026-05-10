import ObraModal from "../components/ObraModal";
import { useEffect, useState } from "react";
import api from "../services/api";

type Obra = {
  id: string;
  name: string;
  city: string;
  state: string;
  status: string;
  progresso?: number;
  orcamento?: number;
  prazo?: string;
  responsavel?: string;
  resp2?: string;
  tarefas?: number;
  urgentes?: number;
};

const STATUS_CONFIG: Record<string, { label: string; accent: string; badge: string; text: string }> = {
  NAO_INICIADA:  { label: "Não iniciada",  accent: "bg-[#888780]", badge: "bg-[#F1EFE8] text-[#444441]", text: "#888780" },
  INICIADA:      { label: "Iniciada",      accent: "bg-[#EF9F27]", badge: "bg-amber-100 text-amber-800",  text: "#EF9F27" },
  EM_ANDAMENTO:  { label: "Em andamento",  accent: "bg-[#378ADD]", badge: "bg-blue-100 text-blue-800",    text: "#378ADD" },
  PAUSADA:       { label: "Pausada",       accent: "bg-[#E24B4A]", badge: "bg-red-100 text-red-800",      text: "#E24B4A" },
  CONCLUIDA:     { label: "Concluída",     accent: "bg-[#639922]", badge: "bg-green-100 text-green-800",  text: "#639922" },
};

function getStatusConfig(status: string) {
  return STATUS_CONFIG[status] ?? { label: status, accent: "bg-gray-400", badge: "bg-gray-100 text-gray-600", text: "#888" };
}

function AvatarCircle({ initials, colorClass }: { initials: string; colorClass: string }) {
  return (
    <div className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-medium -mr-1.5 ${colorClass}`}>
      {initials}
    </div>
  );
}

function ObraCard({ obra, onClick }: { obra: Obra; onClick: () => void }) {
  const cfg = getStatusConfig(obra.status);
  const progresso = obra.progresso ?? 0;

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-gray-400 transition-colors"
    >
      {/* Traço colorido de status */}
      <div className={`h-1 w-full ${cfg.accent}`} />

      <div className="p-4">
        {/* Topo: título + badge */}
        <div className="flex justify-between items-start gap-3 mb-1.5">
          <h3 className="font-medium text-[15px] text-gray-800 leading-snug flex-1">{obra.name}</h3>
          <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap ${cfg.badge}`}>
            {cfg.label}
          </span>
        </div>

        {/* Localização */}
        <p className="text-[12px] text-gray-400 mb-3 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {obra.city} — {obra.state}
        </p>

        {/* Barra de progresso */}
        <div className="mb-3">
          <div className="flex justify-between text-[11px] text-gray-400 mb-1">
            <span>Progresso</span>
            <span className="font-medium">{progresso}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${progresso}%`, background: cfg.text }}
            />
          </div>
        </div>

        {/* Meta: orçamento + prazo */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gray-50 rounded-lg px-3 py-2">
            <p className="text-[10px] text-gray-400 mb-0.5">Orçamento</p>
            <p className="text-[13px] font-medium text-gray-700">
              {obra.orcamento
                ? `R$ ${obra.orcamento.toLocaleString("pt-BR")}`
                : "—"}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg px-3 py-2">
            <p className="text-[10px] text-gray-400 mb-0.5">Previsão</p>
            <p className="text-[13px] font-medium text-gray-700">{obra.prazo ?? "—"}</p>
          </div>
        </div>

        {/* Rodapé: avatares + alertas */}
        <div className="flex justify-between items-center pt-2.5 border-t border-gray-100">
          <div className="flex items-center pl-1.5">
            {obra.responsavel && (
              <AvatarCircle initials={obra.responsavel} colorClass="bg-blue-100 text-blue-700" />
            )}
            {obra.resp2 && (
              <AvatarCircle initials={obra.resp2} colorClass="bg-teal-100 text-teal-700" />
            )}
          </div>

          <div className="flex gap-1.5">
            {(obra.urgentes ?? 0) > 0 && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700 flex items-center gap-1">
                ⚠ {obra.urgentes} urgente{(obra.urgentes ?? 0) > 1 ? "s" : ""}
              </span>
            )}
            {(obra.tarefas ?? 0) > 0 && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 flex items-center gap-1">
                ✓ {obra.tarefas} tarefa{(obra.tarefas ?? 0) > 1 ? "s" : ""}
              </span>
            )}
            {(obra.urgentes ?? 0) === 0 && (obra.tarefas ?? 0) === 0 && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                ✓ ok
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const FILTROS = ["Todas", "Não iniciada", "Iniciada", "Em andamento", "Pausada", "Concluída"];
const FILTRO_MAP: Record<string, string> = {
  "Não iniciada": "NAO_INICIADA",
  "Iniciada": "INICIADA",
  "Em andamento": "EM_ANDAMENTO",
  "Pausada": "PAUSADA",
  "Concluída": "CONCLUIDA",
};

function Obras() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [obras, setObras] = useState<Obra[]>([]);
  const [filtro, setFiltro] = useState("Todas");
  const [busca, setBusca] = useState("");
  const [ordem, setOrdem] = useState("recente");

  async function loadObras() {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/obras", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setObras(response.data);
    } catch (error) {
      console.error("Erro ao carregar obras:", error);
    }
  }

  useEffect(() => {
    loadObras();
  }, []);

  const obrasFiltradas = obras
    .filter((o) => {
      const matchFiltro = filtro === "Todas" || o.status === FILTRO_MAP[filtro];
      const matchBusca =
        !busca ||
        o.name.toLowerCase().includes(busca.toLowerCase()) ||
        o.city?.toLowerCase().includes(busca.toLowerCase());
      return matchFiltro && matchBusca;
    })
    .sort((a, b) => {
      if (ordem === "nome") return a.name.localeCompare(b.name);
      if (ordem === "progresso") return (b.progresso ?? 0) - (a.progresso ?? 0);
      return 0;
    });

  const counts = {
    total: obras.length,
    andamento: obras.filter((o) => o.status === "EM_ANDAMENTO").length,
    pausada: obras.filter((o) => o.status === "PAUSADA").length,
    concluida: obras.filter((o) => o.status === "CONCLUIDA").length,
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-medium text-gray-800">Obras</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          + Nova obra
        </button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Total de obras", val: counts.total, color: "text-gray-800" },
          { label: "Em andamento",   val: counts.andamento, color: "text-blue-600" },
          { label: "Pausadas",       val: counts.pausada,   color: "text-red-500" },
          { label: "Concluídas",     val: counts.concluida, color: "text-green-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl px-4 py-3">
            <p className="text-[11px] text-gray-400 mb-1">{s.label}</p>
            <p className={`text-2xl font-medium ${s.color}`}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Busca + ordenação */}
      <div className="flex gap-2 mb-3 flex-wrap">
        <div className="relative flex-1 min-w-[180px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar obra ou cidade..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400"
          />
        </div>
        <select
          value={ordem}
          onChange={(e) => setOrdem(e.target.value)}
          className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-500 cursor-pointer focus:outline-none"
        >
          <option value="recente">Mais recentes</option>
          <option value="nome">Nome A–Z</option>
          <option value="progresso">Maior progresso</option>
        </select>
      </div>

      {/* Pills de filtro */}
      <div className="flex gap-2 flex-wrap mb-5">
        {FILTROS.map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              filtro === f
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid de cards */}
      {obrasFiltradas.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🏗</p>
          <p className="text-base">Nenhuma obra encontrada.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {obrasFiltradas.map((obra) => (
            <ObraCard
              key={obra.id}
              obra={obra}
              onClick={() => console.log("abrir obra", obra.id)}
            />
          ))}
        </div>
      )}

      <ObraModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={loadObras}
      />
    </>
  );
}

export default Obras;