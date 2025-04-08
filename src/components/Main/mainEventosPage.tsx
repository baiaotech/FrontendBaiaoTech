"use client";
import { Evento } from "@/types";
import { useEffect, useState } from "react";
import filterIcon from "@/assets/filter.svg";
import lupaIcon from "@/assets/lupa.svg";
import SkeletonCard from "@/components/skeletonCard";
import Image from "next/image";
import { pegarTodosEventos } from "@/routes/api.routes";
import Link from "next/link";

export default function MainEventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [carregando, setCarregando] = useState(true);

  const buscarEventos = async () => {
    setCarregando(true);
    try {
      const response = await pegarTodosEventos();
      setEventos(response);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
      setEventos([]);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarEventos();
  }, []);

  return (
    <main className="w-full flex justify-center items-start p-5">
      <div className="container max-w-7xl h-full flex flex-col justify-start items-start">
        <div className="w-full min-h-48 p-5 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <p className="text-slate-900 md:text-2xl text-base font-bold">
              Eventos
            </p>
            <p className="text-slate-900 md:text-lg text-sm  font-semibold">
              Conheça nossos próximos eventos
            </p>
          </div>

          {eventos.length > 0 && (
            <div className="w-full flex flex-row justify-between mt-5">
              <div className="min-w-56 h-10 flex justify-start items-center">
                <input
                  className="w-96 h-10 text-base font-medium bg-[#e6e6e7] border-r-1 border-slate-400 placeholder:font-bold rounded-l-lg p-2"
                  type="text"
                  placeholder="Buscar"
                />
                <button className="w-13 h-10 rounded-r-lg bg-[#e6e6e7] flex justify-center items-center">
                  <Image src={lupaIcon} alt="Ícone da lupa" className="w-5" />
                </button>
              </div>

              <div className="min-w-20 h-10 flex justify-center items-center">
                <button className="w-32 h-10 text-base font-semibold bg-[#e6e6e7] hover:bg-orange-500 transition rounded-2xl shadow flex justify-center items-center gap-2">
                  <Image
                    src={filterIcon}
                    alt="Ícone do filtro"
                    className="w-5"
                  />
                  Filtro
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-full h-auto flex flex-row flex-wrap justify-center items-start p-3 md:gap-10 gap-3">
          {carregando ? (
            Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : eventos.length === 0 ? (
            <div className="w-full h-40 flex justify-center items-center">
              <h1 className="text-2xl font-bold text-slate-900">
                Nenhum evento encontrado
              </h1>
            </div>
          ) : (
            eventos.map((evento) => (
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
                    width={300}
                    height={300}
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
            ))
          )}
        </div>
      </div>
    </main>
  );
}
