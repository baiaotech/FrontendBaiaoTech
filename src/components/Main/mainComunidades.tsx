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
        <div className="w-full h-auto sm:p-5 p-3 flex flex-col justify-center items-center mb-4">
          <h1 className="text-slate-900 md:text-3xl text-xl font-extrabold mb-2 text-center">Comunidades de Tecnologia</h1>
          <p className="text-slate-900 md:text-lg text-sm font-medium text-center max-w-2xl px-4 leading-relaxed">
            Esta é uma lista de comunidades de tecnologia do Nordeste que encontramos e reunimos para facilitar sua busca por networking, aprendizado e eventos. <br className="hidden sm:block" />
            <span className="font-semibold text-orange-600 block sm:inline mt-1 sm:mt-0">Nenhuma delas é parceira oficial do Baião Tech</span> — apenas listamos para ajudar a fortalecer o ecossistema regional!
          </p>
        </div>

        <div className="w-full h-full flex flex-row flex-wrap justify-center items-center sm:p-3 md:gap-10 gap-3">
          {carregando
            ? Array.from({ length: qtdComunidade }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : comunidade.map((com) => (
                <div
                  className="w-80 h-64 md:w-96 bg-[#e6e6e7] shadow rounded-2xl flex flex-col cursor-pointer transition ease-in-out duration-300 hover:scale-[1.03] hover:shadow-lg"
                  key={com.id}
                >
                  <Link href={`/comunidades/${com.id || ""}`} className="w-full h-36 rounded-t-2xl block">
                    <img
                      src={com.cover_photo_url || ""}
                      alt={com.nome}
                      className="w-full h-full object-contain rounded-t-2xl bg-white"
                    />
                  </Link>
                  <div className="w-full flex-1 flex flex-col justify-between items-center px-3 py-2">
                    <p className="md:text-lg text-base text-slate-900 font-bold text-center leading-tight mb-1 line-clamp-2">
                      {com.nome}
                    </p>
                    <p className="text-xs text-slate-700 text-center mb-2 line-clamp-3 min-h-[2.5em]">{com.descricao}</p>
                    <div className="flex flex-row gap-2 justify-center items-center">
                      {com.url_site && (
                        <a href={com.url_site} target="_blank" rel="noopener noreferrer" title="Site" className="text-blue-700 hover:underline text-xs font-semibold">Site</a>
                      )}
                      {com.url_insta && (
                        <a href={com.url_insta} target="_blank" rel="noopener noreferrer" title="Social" className="text-pink-600 hover:underline text-xs font-semibold">Social</a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </main>
  );
}
