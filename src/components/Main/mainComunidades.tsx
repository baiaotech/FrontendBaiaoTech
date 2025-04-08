import { pegarTodasAsComunidades } from "@/routes/api.routes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Comunidade } from "@/types";
import SkeletonCard from "@/components/skeletonCard";

export default function MainComunidades() {
  const [comunidade, setComunidade] = useState<Comunidade[]>([]);
  const [carregando, setCarregando] = useState(true);

  const qtdComunidade = comunidade.length || 3;

  const fetchComunidade = async () => {
    try {
      const response = await pegarTodasAsComunidades();
      setComunidade(response);
      console.log(response);
      setCarregando(false);
    } catch (error) {
      console.error(error);
      setCarregando(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchComunidade();
    }, 1000);
  }, []);

  return (
    <main className="w-full flex justify-center items-start p-5 z-0">
      <div className="container max-w-7xl h-full flex flex-col justify-start items-start">
        <div className="w-full h-48 p-5 flex flex-col justify-center items-center">
          <p className="text-slate-900 md:text-2xl text-base font-bold">
            Comunidades
          </p>
          <p className="text-slate-900 md:text-lg text-sm  font-semibold">
            Conheça nossas comunidades parceiras
          </p>
        </div>

        <div className="w-full h-auto flex flex-row flex-wrap justify-center items-center p-3 md:gap-10 gap-3">
          {carregando
            ? Array.from({ length: qtdComunidade }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : comunidade.map((com) => (
                <Link
                  href={`/comunidades/${com.id}`}
                  className="md:w-48 h-48 sm:w-34 min-w-30 bg-[#e6e6e7] shadow rounded-2xl cursor-pointer transition ease-in-out duration-300 hover:-translate-1"
                  key={com.id}
                >
                  <div className="w-full h-36 bg-slate-900 rounded-t-2xl"></div>

                  <div className="w-full h-12 rounded-b-2xl flex justify-center items-center">
                    <p className="md:text-base text-sm text-slate-900 font-bold">
                      {com.nome}
                    </p>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </main>
  );
}
