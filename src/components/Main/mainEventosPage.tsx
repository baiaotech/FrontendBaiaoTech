"use client";
import { Evento } from "@/types";
import { useEffect, useState } from "react";
import filterIcon from "@/assets/filter.svg";
import SkeletonCard from "@/components/skeletonCard";
import Link from "next/link";
import { filtrarEventoPorPesquisa, filtrarEventos } from "@/routes/api.routes"; // já deve estar importando
import FilterButton from "@/components/FilterButton";
import Image from "next/image";
import imageTemplate from "@/assets/imgTemplate.png";

export default function MainEventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [filterBtnOpen, setFilterBtnOpen] = useState(false);
  const [search, setSearch] = useState("");

  const buscarEventos = async (termo: string) => {
    setCarregando(true);
    try {
      const response = await filtrarEventoPorPesquisa(termo);
      setEventos(response);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
      setEventos([]);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarEventos(search);
  }, [search]);

  const handleFilterButton = () => {
    setFilterBtnOpen(!filterBtnOpen);
  };

  const aplicarFiltros = async (generosSelecionados: string[]) => {
    setCarregando(true);
    try {
      // Você pode estender isso para aceitar outros filtros depois
      const response = await filtrarEventos(
        undefined,
        undefined,
        undefined,
        undefined,
        generosSelecionados.join(","),
        undefined
      );
      setEventos(response);
    } catch (error) {
      console.error("Erro ao aplicar filtros:", error);
      setEventos([]);
    } finally {
      setCarregando(false);
      setFilterBtnOpen(false);
    }
  };

  const renderSkeleton = () =>
    Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />);

  const renderEventos = () =>
    eventos.map((evento) => (
      <Link
        href={`/eventos/${evento.id}`}
        className="w-72 min-h-64 shadow flex flex-col rounded-2xl"
        key={evento.id}
      >
        <div className="w-full h-[150px] bg-slate-900 rounded-t-2xl">
          {evento.cover_photo_url ? (
            <img
            className="size-full object-cover rounded-t-2xl"
            src={!evento.cover_photo_url ? imageTemplate : evento.cover_photo_url}
            alt={evento.titulo}
            width={300}
            height={300}
          />
          ) : (
            <div className="w-full h-[150px] bg-slate-900 rounded-t-2xl"></div>
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

          <div className="w-full max-h-8">
            <h3 className="text-xs text-slate-900 text-left font-semibold capitalize">
              {evento.local}
            </h3>
          </div>
        </div>
      </Link>
    ));

  const renderNenhumEvento = () =>
    eventos.length === 0 && (
      <div className="w-full h-40 flex justify-center items-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Nenhum evento encontrado
        </h1>
      </div>
    );

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
          <div className="w-full flex flex-row justify-between items-center mt-5">
            <div className="min-w-auto max-w-96 h-10 flex justify-start items-center">
              <input
                className="w-44 sm:w-96 h-10 p-1 md:p-2 text-base font-medium bg-[#e6e6e7] placeholder:font-bold rounded-lg"
                type="text"
                placeholder="Buscar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    buscarEventos(search);
                  }
                }}
              />
            </div>

            <div className="min-w-20 h-10 flex justify-center items-center relative">
              <button
                className="w-16 md:w-32 h-10 text-base font-semibold bg-[#e6e6e7] hover:bg-orange-500 transition rounded-2xl shadow flex justify-center items-center gap-2"
                onClick={handleFilterButton}
              >
                <Image src={filterIcon} alt="Ícone do filtro" className="w-5" />
                <span className="hidden md:block">Filtro</span>
              </button>

              {/* Dropdown */}

              {filterBtnOpen && <FilterButton onFilter={aplicarFiltros} />}
            </div>
          </div>
        </div>

        <div className="w-full h-auto flex flex-row flex-wrap justify-center items-start p-3 md:gap-10 gap-3">
          {carregando ? renderSkeleton() : renderEventos()}
          {carregando ? renderEventos() : renderNenhumEvento()}
        </div>
      </div>
    </main>
  );
}
