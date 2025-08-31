"use client";
import { useEffect, useState } from "react";
import { pegarTodosEventos } from "@/routes/api.routes";
import { sortByDateProximity } from "@/lib/utils";import ArrowLeftIcon from "@/assets/arrow-left.svg";
import ArrowRightIcon from "@/assets/arrow-right.svg";
import Link from "next/link";
import SkeletonCard from "@/components/skeletonCard";
import { Evento } from "@/types";
import imageTemplate from "@/assets/imgTemplate.png";
import Image from "next/image";

export default function ProximosEventos() {
  const [evento, setEvento] = useState<Evento[]>([]);
  const [eventoPorPagina, setEventoPorPagina] = useState(4);
  const [eventoAtualIndex, setEventoAtualIndex] = useState(0);
  const [carregando, setCarregando] = useState(true);

  const fetchEventos = async () => {
    try {
      const response = await pegarTodosEventos();
      setEvento(sortByDateProximity(response || []));
      setCarregando(false);
    } catch (error) {
      console.error(error);
      setCarregando(false);
    }
  };

  const updateItemsPerPage = () => {
    const largura = window.innerWidth;

    if (largura <= 425) setEventoPorPagina(1);
    else if (largura <= 768) setEventoPorPagina(2);
    else if (largura <= 1024) setEventoPorPagina(3);
    else if (largura <= 1200) setEventoPorPagina(4);
    else setEventoPorPagina(4);
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

  const renderSkeleton = () =>
    Array.from({ length: eventoPorPagina }).map((_, index) => (
      <SkeletonCard key={index} />
    ));

  const renderEventos = () =>
    visibleEvents.map((evento) => (
      <Link
        href={`/eventos/${evento.id}`}
        className="w-72 min-h-64 shadow flex flex-col rounded-2xl"
        key={evento.id}
      >
        <div className="w-full h-[150px] bg-slate-900 rounded-t-2xl">
          {evento?.cover_photo_url ? (
            <img
              src={evento.cover_photo_url || imageTemplate.src}
              alt="imagem do evento"
              width={1000}
              height={1000}
              className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl"
            />
          ) : (
            <div className="w-full h-full bg-slate-900 flex items-center justify-center rounded-t-2xl md:rounded-l-2xl"></div>
          )}
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

          <div className="w-full min-h-4">
            <h3 className="text-xs text-slate-900 text-left font-semibold capitalize">
              {evento.local}
            </h3>
          </div>
        </div>
      </Link>
    ));

  const renderVerMais = () =>
    visibleEvents.length > 0 &&
    eventoAtualIndex + eventoPorPagina >= evento.length && (
      <Link
        href="/eventos"
        className="w-32 md:w-72 h-64 flex flex-col justify-center items-center rounded-2xl"
      >
        <div className="lg:size-15 size-8 rounded-full border-1 border-slate-700">
          <Image
            className="w-full h-full object-cover rounded-full p-2"
            src={ArrowRightIcon.src ?? ArrowRightIcon}
            alt="icone para pagina dos eventos"
            width={32}
            height={32}
          />
        </div>
        <div className="w-full h-auto flex justify-center items-center">
          <p className="md:text-sm text-xs text-slate-900 font-bold">
            Ver Mais
          </p>
        </div>
      </Link>
    );

  const renderNenhumEvento = () =>
    !carregando &&
    visibleEvents.length === 0 && (
      <div className="w-full h-full flex flex-row justify-start items-start gap-10">
        <div className="flex justify-center items-center">
          <p className="text-base font-bold">Nenhum evento encontrado</p>
        </div>
      </div>
    );

  return (
    <div className="w-full flex flex-col justify-center items-center my-10">
      <div className="w-full h-16 flex justify-between items-center">
        <p className="md:text-2xl text-slate-900 font-bold">Próximos Eventos</p>

        <div className="w-auto flex flex-row gap-4">
          <button
            className="size-7 p-1.5 rounded-2xl bg-[#e6e6e7] disabled:bg-[rgba(0,0,0,.3)]"
            onClick={handlePrevEvents}
            disabled={eventoAtualIndex === 0}
          >
            <Image
              src={ArrowLeftIcon.src ?? ArrowLeftIcon}
              alt="Anterior"
              className="size-full"
              width={24}
              height={24}
            />
          </button>
          <button
            className="size-7 p-1.5 rounded-2xl bg-[#e6e6e7] disabled:bg-[rgba(0,0,0,.3)]"
            onClick={handleNextEvents}
            disabled={eventoAtualIndex + eventoPorPagina >= evento.length}
          >
            <Image
              src={ArrowRightIcon.src ?? ArrowRightIcon}
              alt="Próximo"
              className="size-full"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>

      <div className="w-full h-full flex flex-row justify-start items-start gap-10">
        {carregando ? renderSkeleton() : renderEventos()}
        {!carregando && renderVerMais()}
        {renderNenhumEvento()}
      </div>
    </div>
  );
}
