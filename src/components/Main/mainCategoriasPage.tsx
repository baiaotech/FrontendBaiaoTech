import Link from "next/link";
import { categorias } from "@/components/categorias";

export default function MainCategoriasPage() {
  return (
    <main className="w-full flex justify-center items-start p-5">
      <div className="container max-w-7xl h-full flex flex-col justify-start items-start">
        <div className="w-full h-48 p-5 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-center mt-4">Categorias</h1>
          <p className="text-center mt-2">
            Explore as categorias de eventos.
          </p>
        </div>

        <div className="w-full h-auto flex flex-row flex-wrap justify-center items-center p-3 ">
          <div className="flex flex-wrap justify-center md:gap-5 gap-3">
            {categorias.map((categoria) => (
              <Link
                href={`/categorias/${categoria.genero}`}
                className="md:w-[180px] w-[120px] h-[80px] md:h-[150px] flex items-center justify-center rounded-2xl"
                key={categoria.id}
              >
                <div className="w-full h-full flex justify-center items-center bg-[#e6e6e7] shadow rounded-2xl hover:bg-orange-500 transition">
                  <h3 className="md:text-sm text-xs text-slate-900 font-bold">
                    {categoria.genero}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
