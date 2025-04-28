"use client";
import "@/app/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { pegarTodosEventos } from "@/routes/api.routes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Evento } from "@/types";
import Link from "next/link";
import imageTemplate from "@/assets/imgTemplate.png";

export default function EventoPage() {
  const [evento, setEvento] = useState<Evento | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const response = await pegarTodosEventos();
        const eventoPorId = response.find(
          (idEvento: Evento) => idEvento.id === Number(id)
        );
        setEvento(eventoPorId || null);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) fetchEvento();
  }, [id]);

  if (!evento) return <p>Carregando...</p>;

  return (
    <>
      <Header />
      <main className="w-full flex justify-center items-start p-5">
        <div className="container max-w-7xl h-full flex flex-col justify-start items-start">
          <div className="w-full flex justify-center items-center ">
            {evento.cover_photo_url ? (
              <img
                className="w-full max-h-[400px] rounded-2xl object-contain bg-slate-900"
                src={evento.cover_photo_url || imageTemplate}
                alt="imagem do evento"
                width={500}
                height={500}
              />
            ) : (
              <div className="w-full h-[400px] bg-slate-900 rounded-2xl"></div>
            )}
          </div>

          <div className="w-full h-auto flex flex-col mt-5">
            <div className="w-full h-auto flex flex-row justify-between items-start gap-3">
              <div className="flex flex-col">
                <h1 className="text-base md:text-lg lg:text-2xl font-bold capitalize">
                  {evento.titulo}
                </h1>
                <Link
                  href={`/categorias/${evento.genero}`}
                  className="text-lg font-semibold capitalize"
                >
                  {evento.genero}
                </Link>
              </div>

              <div className="flex flex-col justify-center items-start p-1.5">
                <p className="text-xs md:text-sm lg:text-base font-semibold text-orange-500 capitalize">
                  {evento.data}
                </p>
                <p className="text-xs md:text-sm lg:text-base font-semibold capitalize">
                  {evento.local}
                </p>
                <p className="text-xs md:text-sm lg:text-base font-semibold capitalize">
                  {evento.organizacao}
                </p>
              </div>
            </div>

            <div className="w-full h-auto flex flex-col">
              <div className="w-full min-h-15 flex flex-col justify-start items-start">
                <p className="text-lg text-orange-500 font-bold my-5">
                  R${evento.valor}
                </p>

                <Link
                  className="p-2.5 bg-slate-900 text-white text-base rounded-lg capitalize"
                  href={evento.link_compra}
                  target="_blank"
                >
                  Comprar ingresso
                </Link>
              </div>

              <div className="w-full mt-5">
                <div
                  className="w-full min-h-108 text-gray-600 whitespace-pre-line text-base"
                  dangerouslySetInnerHTML={{ __html: evento.descricao }}
                />  
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
