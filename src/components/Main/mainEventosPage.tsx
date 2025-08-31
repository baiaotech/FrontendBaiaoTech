"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { Evento } from "@/types";
import { filtrarEventos, filtrarEventoPorPesquisa } from "@/routes/api.routes";
import { sortByDateProximity } from "@/lib/utils";
import FilterButton from "@/components/FilterButton";
import SkeletonCard from "@/components/skeletonCard";
import { categorias } from "@/components/categorias";
import filterIcon from "@/assets/filter.svg";
import imageTemplate from "@/assets/imgTemplate.png";
import Image from "next/image";

/** Sheet estático para mobile (sem absolute) */
function MobileFilterSheet({
  selected,
  onToggle,
  onApply,
  onClose,
}: {
  selected: string[];
  onToggle: (g: string) => void;
  onApply: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className="w-[min(92vw,420px)] max-h-[70vh] overflow-auto rounded-2xl bg-white shadow-xl p-3"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-slate-900">Categorias</h3>
        <button
          className="text-sm text-slate-600 hover:text-slate-800"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>

      <ul className="space-y-2 pb-3">
        {categorias.map((c) => {
          const ativo = selected.includes(c.genero);
          return (
            <li key={c.id}>
              <label className="flex items-center gap-2 text-[14px] text-slate-800">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300"
                  checked={ativo}
                  onChange={() => onToggle(c.genero)}
                />
                {c.genero}
              </label>
            </li>
          );
        })}
      </ul>

      <div className="flex justify-end">
        <button
          onClick={onApply}
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg"
        >
          Aplicar
        </button>
      </div>
    </div>
  );
}

export default function MainEventosPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = (searchParams?.get("search") || "").trim();

  const [eventos, setEventos] = useState<Evento[]>([]);
  const [carregando, setCarregando] = useState<boolean>(false);
  const [filterBtnOpen, setFilterBtnOpen] = useState<boolean>(false);

  // estado dos filtros (usado pelo sheet mobile)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      setCarregando(true);
      try {
        const res =
          query.length >= 2
            ? await filtrarEventoPorPesquisa(query)
            : await filtrarEventos();
        setEventos(sortByDateProximity(res));
      } catch (e) {
        console.error("Erro ao carregar eventos:", e);
        setEventos([]);
      } finally {
        setCarregando(false);
      }
    })();
  }, [query]);

  const handleFilterButton = () => setFilterBtnOpen((v) => !v);
  const closeFilter = () => setFilterBtnOpen(false);

  // fecha modal no ESC
  useEffect(() => {
    if (!filterBtnOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeFilter();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filterBtnOpen]);

  const toggleGenre = (g: string) =>
    setSelectedGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );

  const aplicarFiltros = async (generosSelecionados?: string[]) => {
    setCarregando(true);
    try {
      const response = await filtrarEventos(
        undefined,
        undefined,
        undefined,
        undefined,
        (generosSelecionados ?? selectedGenres).join(","),
        undefined
      );
      setEventos(sortByDateProximity(response));
    } catch (error) {
      console.error("Erro ao aplicar filtros:", error);
      setEventos([]);
    } finally {
      setCarregando(false);
      closeFilter();
    }
  };

  const renderSkeleton = () =>
    Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />);

  const cards = useMemo(
    () =>
      eventos.map((evento) => (
        <Link
          key={evento.id}
          href={`/eventos/${evento.id}`}
          className="w-72 min-h-64 shadow flex flex-col rounded-2xl"
        >
          <div className="w-full h-[150px] rounded-t-2xl overflow-hidden bg-slate-200">
            <img
              src={evento.cover_photo_url || imageTemplate.src}
              alt={evento.titulo}
              width={320}
              height={150}
              className="h-[150px] w-full object-cover"
            />
          </div>

          <div className="w-full flex flex-col justify-between items-start p-4 rounded-b-2xl">
            <div className="w-full mb-2">
              <h3 className="text-xs text-orange-500 font-semibold mb-2">
                {evento.data}
              </h3>
              <h3 className="text-sm text-slate-900 font-semibold mb-2">
                {evento.titulo}
              </h3>
            </div>
            <h4 className="text-xs text-slate-900 font-semibold">
              {evento.local}
            </h4>
          </div>
        </Link>
      )),
    [eventos]
  );

  return (
    <main className="w-full flex justify-center items-start p-5">
      <div className="container max-w-7xl h-full flex flex-col items-start">
        {/* Cabeçalho */}
        <section className="relative w-full pt-6 pb-2">
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-slate-900 md:text-2xl text-base font-bold">
              Eventos
            </h1>
            {query ? (
              <>
                <p className="text-slate-700 md:text-base text-sm">
                  Resultados para “{query}”
                </p>
                <button
                  onClick={() => router.replace("/eventos")}
                  className="text-blue-600 hover:text-blue-700 text-xs md:text-sm underline"
                >
                  Limpar busca
                </button>
              </>
            ) : (
              <p className="text-slate-900 md:text-lg text-sm font-semibold">
                Conheça nossos próximos eventos
              </p>
            )}
          </div>

          {/* DESKTOP: popover preso ao botão */}
          <div className="hidden md:block absolute right-0 top-0">
            <div className="relative z-10">
              <button
                className="h-10 px-4 text-sm font-semibold bg-white border border-slate-300 hover:border-slate-400 rounded-xl shadow-sm flex items-center gap-2"
                onClick={handleFilterButton}
              >
                <Image
                  src={filterIcon.src ?? filterIcon}
                  alt="Filtro"
                  className="w-4 h-4"
                  width={16}
                  height={16}
                />
                Filtro
              </button>
              {filterBtnOpen && (
                <div className="absolute right-0 mt-2 z-20">
                  {/* FilterButton continua como dropdown absoluto no desktop */}
                  <FilterButton onFilter={(g) => aplicarFiltros(g)} />
                </div>
              )}
            </div>
          </div>

          {/* MOBILE: botão + sheet estático */}
          <div className="md:hidden w-full mt-3 flex justify-center">
            <button
              className="h-10 px-4 text-sm font-semibold bg-white border border-slate-300 hover:border-slate-400 rounded-xl shadow-sm flex items-center gap-2"
              onClick={handleFilterButton}
            >
              <Image
                src={filterIcon.src ?? filterIcon}
                alt="Filtro"
                className="w-4 h-4"
                width={16}
                height={16}
              />
              Filtro
            </button>
          </div>

          {/* Overlay + sheet mobile */}
          {filterBtnOpen && (
            <div
              className="md:hidden fixed inset-0 z-50 bg-black/35 flex items-start justify-center"
              onClick={closeFilter}
              aria-modal="true"
              role="dialog"
            >
              <MobileFilterSheet
                selected={selectedGenres}
                onToggle={toggleGenre}
                onApply={() => aplicarFiltros()}
                onClose={closeFilter}
              />
            </div>
          )}
        </section>

        {/* Grade */}
        <section className="w-full flex flex-wrap justify-center items-start p-3 md:gap-10 gap-3">
          {carregando ? renderSkeleton() : cards}
          {!carregando && eventos.length === 0 && (
            <div className="w-full h-40 flex justify-center items-center">
              <h2 className="text-2xl font-bold text-slate-900">
                Nenhum evento encontrado
              </h2>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
