"use client";
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Evento } from "@/types";
import { useState, useEffect } from "react";
import SkeletonCard from "@/components/skeletonCard";
import Link from "next/link";
import { useParams } from "next/navigation";
import { filtrarEventoPorGenero } from "@/routes/api.routes";
import imageTemplate from "@/assets/imgTemplate.png";
import Image from "next/image";

export default function CategoriaPorGenero() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [carregando, setCarregando] = useState(true);

  const params = useParams<{ genero: string }>();
  const genero = params?.genero || "";
  const generoEvento = genero?.toLowerCase() || "";

  const eventosPorGenero = async (genero: string) => {
    setCarregando(true);
    try {
      const response = await filtrarEventoPorGenero(genero);
      setEventos(response);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
      setEventos([]);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (generoEvento) {
      eventosPorGenero(generoEvento);
    }
  }, [generoEvento]);

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
          {evento?.cover_photo_url ? (
            <img
              src={evento.cover_photo_url || imageTemplate.src }
              alt="imagem do evento"
              width={1000}
              height={1000}
              className="w-full h-full object-cover rounded-t-2xl"
            />
          ) : (
            <div className="w-full h-full bg-slate-900 flex items-center justify-center rounded-t-2xl"></div>
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

  const renderNenhumEvento = () =>
    eventos.length === 0 && (
      <div className="w-full h-40 flex justify-center items-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Nenhum evento encontrado
        </h1>
      </div>
    );

  return (
    <>
      <Header />
      <main className="w-full flex justify-center items-start p-5">
        <div className="container max-w-7xl h-full flex flex-col justify-start items-start">
          <div className="w-full min-h-48 p-5 flex flex-col justify-center items-center">
            <p className="text-slate-900 md:text-2xl text-base font-bold">
              Eventos {generoEvento}
            </p>
          </div>

          <div className="w-full h-auto flex flex-row flex-wrap justify-center items-start md:p-3 md:gap-10 gap-3">
            {carregando ? renderSkeleton() : renderEventos()}
            {carregando ? renderEventos() : renderNenhumEvento()}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
