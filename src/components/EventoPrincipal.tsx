"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { pegarTodosEventos } from "@/routes/api.routes";
import { Skeleton } from "@/components/ui/skeleton";
import { Evento } from "@/types";

export default function EventoPrincipal() {
  const [eventoEsperado, setEventoEsperado] = useState<Evento | null>(null);
  const [carregando, setCarregando] = useState(true);

  const fetchEvento = async () => {
    const response = await pegarTodosEventos();
    const todosOsEventos: Evento[] = response;
    const evento = todosOsEventos.find((event) => event.id === 2);
    setEventoEsperado(evento || null);
    setCarregando(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchEvento();
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full h-16 flex justify-start items-center">
        <p className="text-2xl text-slate-900 font-bold">Evento Principal</p>
      </div>

      {carregando ? (
        <Skeleton className="w-full md:max-w-7xl h-[400px] bg-[#e6e6e7] rounded-2xl" />
      ) : (
        eventoEsperado && (
          <div className="w-full md:max-w-7xl h-full md:h-[400px] flex flex-col md:flex-row justify-start items-center bg-[#e6e6e7] shadow rounded-2xl">
            <div className="w-full md:w-[65%] h-full flex justify-center items-center rounded-t-2xl md:rounded-l-2xl">
              <Image
                src={eventoEsperado.cover_photo_url}
                alt="imagem do evento"
                width={1000}
                height={1000}
                className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl"
              />
            </div>

            <div className="w-full md:w-[35%] h-full flex flex-col justify-between items-start rounded-b-2xl md:rounded-r-2xl gap-8 p-2">
              <div className="w-full h-auto flex flex-col justify-start items-center">
                <div className="w-full h-auto">
                  <p className="text-sm text-orange-500 font-semibold">
                    {eventoEsperado.data}
                  </p>
                </div>

                <div className="w-full h-auto">
                  <p className="text-2xl text-slate-900 font-semibold">
                    {eventoEsperado.titulo}
                  </p>
                </div>
              </div>

              <div className="w-full h-auto">
                <Button className="w-[200px] h-[60px] bg-[#ccc] text-slate-900 text-base hover:bg-slate-900 hover:text-white">
                  Mais Detalhes
                </Button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
