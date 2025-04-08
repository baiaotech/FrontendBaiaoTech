"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { pegarTodosEventos } from "@/routes/api.routes";
import ArrowLeftIcon from "@/assets/arrow-left.svg";
import ArrowRightIcon from "@/assets/arrow-right.svg";
import Link from "next/link";
import SkeletonCard from "@/components/skeletonCard";
import { Evento } from "@/types";

export default function ProximosEventos() {
  const [evento, setEvento] = useState<Evento[]>([]);
  const [eventoPorPagina, setEventoPorPagina] = useState(4);
  const [eventoAtualIndex, setEventoAtualIndex] = useState(0);
  const [carregando, setCarregando] = useState(true);

  const fetchEventos = async () => {
    try {
      const response = await pegarTodosEventos();
      setEvento(response);

      setCarregando(false);
    } catch (error) {
      console.error(error);
      setCarregando(false);
    }
  };

  const updateItemsPerPage = () => {
    if (window.innerWidth <= 768) {
      setEventoPorPagina(2);
    } else {
      setEventoPorPagina(4);
    }
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    setTimeout(() => {
      fetchEventos();
    }, 1000);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  const visibleEvents = evento.slice(
    eventoAtualIndex,
    eventoAtualIndex + eventoPorPagina
  );

  const handleNextEvents = () => {
    if (eventoAtualIndex + eventoPorPagina < evento.length) {
      setEventoAtualIndex(eventoAtualIndex + eventoPorPagina);
    }
  };

  const handlePrevEvents = () => {
    if (eventoAtualIndex > 0) {
      setEventoAtualIndex(eventoAtualIndex - eventoPorPagina);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center my-10">
      <div className="w-full h-16 flex justify-between items-center">
        <p className="text-2xl text-slate-900 font-bold">Próximos Eventos</p>

        <div className="w-auto flex flex-row gap-4">
          <button
            className="size-7 p-1.5 rounded-2xl bg-[#e6e6e7] disabled:bg-[rgba(0,0,0,.3)]"
            onClick={handlePrevEvents}
            disabled={eventoAtualIndex === 0}
          >
            <Image src={ArrowLeftIcon} alt="Anterior" className="size-full" />
          </button>
          <button
            className="size-7 p-1.5 rounded-2xl bg-[#e6e6e7] disabled:bg-[rgba(0,0,0,.3)]"
            onClick={handleNextEvents}
            disabled={eventoAtualIndex + eventoPorPagina >= evento.length}
          >
            <Image src={ArrowRightIcon} alt="Próximo" className="size-full" />
          </button>
        </div>
      </div>

      <div className="w-full h-full flex flex-row justify-start items-start gap-10">
        {carregando
          ? Array.from({ length: eventoPorPagina }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : visibleEvents.map((evento) => (
              <Link
                href={`/eventos/${evento.id}`}
                className="w-72 min-h-64 shadow flex flex-col rounded-2xl"
                key={evento.id}
              >
                <div className="w-full h-[150px] bg-orange-500 rounded-t-2xl">
                  <Image
                    className="size-full object-cover rounded-t-2xl"
                    src={evento.cover_photo_url}
                    alt={evento.titulo}
                    width={100}
                    height={100}
                  />
                </div>

                <div className="w-full flex flex-col justify-between items-start p-4 rounded-b-2xl">
                  <div className="w-full h-auto mb-2">
                    <h3 className="text-xs text-orange-500 text-left font-semibold capitalize mb-2">
                      {evento.data}
                    </h3>

                    <h3 className="text-sm text-slate-900 text-left font-semibold capitalize mb-2">
                      {evento.titulo}
                    </h3>
                  </div>

                  <div className="w-full max-h-8">
                    <h3 className="text-xs text-slate-900 text-left font-semibold capitalize">
                      {evento.local}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}

        {carregando
          ? Array.from({ length: eventoPorPagina }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : eventoAtualIndex + eventoPorPagina >= evento.length && (
              <Link
                href="/eventos"
                className="w-72 min-h-64 flex flex-col justify-center items-center rounded-2xl"
              >
                <div className="size-20 rounded-full border-1 border-slate-700">
                  <Image
                    className="w-full h-full object-cover rounded-full p-2"
                    src={ArrowRightIcon}
                    alt="icone para pagina dos eventos"
                  />
                </div>

                <div className="w-full h-auto">
                  <p className="w-full h-auto flex justify-center items-center">
                    Ver Mais
                  </p>
                </div>
              </Link>
            )}
      </div>
    </div>
  );
}
