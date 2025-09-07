import { useState } from "react";

type EstadoFilterProps = {
  onFilter: (estadosSelecionados: string[]) => void;
  onClear: () => void;
};

const estadosNordeste = [
  { sigla: "AL", nome: "Alagoas" },
  { sigla: "BA", nome: "Bahia" },
  { sigla: "CE", nome: "Ceará" },
  { sigla: "MA", nome: "Maranhão" },
  { sigla: "PB", nome: "Paraíba" },
  { sigla: "PE", nome: "Pernambuco" },
  { sigla: "PI", nome: "Piauí" },
  { sigla: "RN", nome: "Rio Grande do Norte" },
  { sigla: "SE", nome: "Sergipe" },
];

export default function EstadoFilter({ onFilter, onClear }: EstadoFilterProps) {
  const [estadosSelecionados, setEstadosSelecionados] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (estado: string) => {
    setEstadosSelecionados((prev) =>
      prev.includes(estado)
        ? prev.filter((e) => e !== estado)
        : [...prev, estado]
    );
  };

  const aplicarFiltro = () => {
    onFilter(estadosSelecionados);
    setIsOpen(false);
  };

  const limparFiltro = () => {
    setEstadosSelecionados([]);
    onClear();
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
      >
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span className="text-sm font-medium text-gray-700">
          {estadosSelecionados.length > 0
            ? `${estadosSelecionados.length} estado${estadosSelecionados.length > 1 ? 's' : ''} selecionado${estadosSelecionados.length > 1 ? 's' : ''}`
            : 'Filtrar por Estado'
          }
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Estados do Nordeste</h3>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {estadosNordeste.map((estado) => (
                <label
                  key={estado.sigla}
                  className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={estadosSelecionados.includes(estado.sigla)}
                    onChange={() => handleCheckboxChange(estado.sigla)}
                    className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-gray-700">{estado.nome}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-2 p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={limparFiltro}
              className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Limpar
            </button>
            <button
              onClick={aplicarFiltro}
              className="flex-1 px-3 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md hover:bg-orange-700"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
