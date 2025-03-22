"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { pegarTodosEventos } from "@/routes/api.routes";
import ArrowLeftIcon from "@/assets/arrow-left.svg";
import ArrowRightIcon from "@/assets/arrow-right.svg";
import Link from "next/link";
import SkeletonCard from "@/components/skeletonCard"; 

interface Evento {
  id: number;
  titulo: string;
  data: string;
  local: string;
  organizacao: string;
  valor: number;
  link_compra: string;
  descricao: string;
  genero: string;
  cover_photo_url?: string;
}

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

      <div className="w-full h-full flex flex-row justify-between items-start gap-3">
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
                    src={evento.cover_photo_url || "/placeholder-image.jpg"}
                    alt={evento.titulo}
                    width={300}
                    height={300}
                  />
                </div>

                <div className="w-full lg:h-40 md:h-48 sm:h-52 flex flex-col justify-between items-start p-4 rounded-b-2xl">
                  <div className="w-full h-auto mb-2">
                    <h3 className="text-xs text-orange-500 text-left font-semibold capitalize mb-2">
                      {evento.data}
                    </h3>

                    <h3 className="text-sm text-slate-900 text-left font-semibold capitalize mb-2">
                      {evento.titulo}
                    </h3>
                  </div>

                  <div className="w-full h-auto">
                    <h3 className="text-xs text-slate-900 text-left font-semibold capitalize">
                      {evento.local}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
