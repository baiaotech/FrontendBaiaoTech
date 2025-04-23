import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { categorias } from "@/components/categorias";
import { useState } from "react";

type FilterButtonProps = {
  onFilter: (generosSelecionados: string[]) => void;
};

export default function FilterButton({ onFilter }: FilterButtonProps) {
  const [generosSelecionados, setGenerosSelecionados] = useState<string[]>([]);

  const handleCheckboxChange = (genero: string) => {
    setGenerosSelecionados((prev) =>
      prev.includes(genero)
        ? prev.filter((g) => g !== genero)
        : [...prev, genero]
    );
  };

  const aplicarFiltro = () => {
    onFilter(generosSelecionados);
  };

  return (
    <div className="min-w-54 h-auto absolute top-66 bg-[#e6e6e7] rounded-2xl p-3 shadow z-10">
      <Accordion className="w-full min-h-auto" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-base font-semibold">
            Categorias
          </AccordionTrigger>
          <AccordionContent>
            <ul className="w-full h-full">
              {categorias.map((i) => (
                <li
                  className="w-full flex flex-row justify-start items-center gap-2 text-sm"
                  key={i.id}
                >
                  <input
                    className="w-4 h-4 accent-slate-900"
                    type="checkbox"
                    checked={generosSelecionados.includes(i.genero)}
                    onChange={() => handleCheckboxChange(i.genero)}
                  />
                  {i.genero}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <button
        className="mt-3 px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold"
        onClick={aplicarFiltro}
      >
        Aplicar
      </button>
    </div>
  );
}
