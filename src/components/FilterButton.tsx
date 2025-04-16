import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { categorias } from "@/components/categorias";

export default function FilterButton() {
  return (
    <div className="min-w-54 h-auto absolute top-66 bg-[#e6e6e7] rounded-2xl p-3 shadow">
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
                  />
                  {i.genero}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
