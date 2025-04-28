"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { pegarEventoDestaque } from "@/routes/api.routes";
import { Evento } from "@/types";
import { useRouter } from "next/navigation";
import SkeletonCard from "./skeletonCard";
import imageTemplate from "@/assets/imgTemplate.png"

export default function EventoPrincipal() {
  const [eventoEsperado, setEventoEsperado] = useState<Evento | null>(null);
  const [carregando, setCarregando] = useState(true);

  const router = useRouter();

  const fetchEvento = async () => {
    const response = await pegarEventoDestaque();
    console.log("Resposta da API:", response);
    setEventoEsperado(response);
    setCarregando(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchEvento();
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const renderSkeleton = () => carregando && <SkeletonCard />;

  const renderEventoPrincipal = () =>
    eventoEsperado && (
      <div className="w-full md:max-w-7xl h-full md:h-[400px] flex flex-col md:flex-row justify-start items-center bg-[#e6e6e7] shadow rounded-2xl">
        <div className="w-full md:w-[65%] h-full flex justify-center items-center rounded-t-2xl md:rounded-t-none md:rounded-l-2xl">
          {eventoEsperado?.cover_photo_url ? (
            <img
              src={!eventoEsperado.cover_photo_url ? imageTemplate : eventoEsperado.cover_photo_url}
              alt="imagem do evento"
              width={1000}
              height={1000}
              className="w-full h-full object-cover rounded-t-2xl md:rounded-t-none md:rounded-l-2xl"
            />
          ) : (
            <div className="w-full h-46 md:h-full bg-slate-900 rounded-t-2xl md:rounded-l-2xl md:rounded-t-none"></div>
          )}
        </div>

        <div className="w-full md:w-[35%] h-full flex flex-col justify-between items-start rounded-b-2xl md:rounded-r-2xl gap-8 p-2">
          <div className="w-full h-auto flex flex-col justify-start items-center gap-3">
            <div className="w-full h-auto">
              <p className="text-sm text-orange-500 font-semibold">
                {eventoEsperado.data}
              </p>
            </div>

            <div className="w-full h-auto">
              <p className="xl:text-xl lg:text-lg md:text-sm text-slate-900 font-semibold capitalize">
                {eventoEsperado.titulo}
              </p>
            </div>

            <div className="w-full h-auto">
              <p className="xl:text-base md:text-sm text-slate-900 font-medium">
                {eventoEsperado.descricao ? eventoEsperado.descricao.substring(0, 150) + "..." : eventoEsperado.descricao}
              </p>
            </div>
          </div>

          <div className="w-full h-auto">
            <Button
              onClick={() => router.push(`/eventos/${eventoEsperado.id}`)}
              className="lg:w-[200px] lg:h-[60px] w-[150px] h-[40px] bg-[#ccc] text-slate-900 text-base hover:bg-slate-900 hover:text-white"
            >
              Mais Detalhes
            </Button>
          </div>
        </div>
      </div>
    );

  const renderNenhumEvento = () =>
    !carregando &&
    !eventoEsperado && (
      <div className="w-full md:max-w-7xl h-full md:h-[100px] flex flex-row justify-start items-start gap-10">
        <div className="flex justify-center items-center">
          <p className="text-base font-bold">Nenhum evento destacado</p>
        </div>
      </div>
    );

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full h-16 flex justify-start items-center">
        <p className="md:text-2xl text-slate-900 font-bold">Evento Principal</p>
      </div>

      {carregando ? renderSkeleton() : renderEventoPrincipal()}
      {carregando ? renderEventoPrincipal() : renderNenhumEvento()}
    </div>
  );
}
