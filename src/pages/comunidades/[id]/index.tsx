"use client";
import "@/app/globals.css";
import { pegarTodasAsComunidades } from "@/routes/api.routes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import instagramIcon from "@/assets/instagram.svg";
import siteIcon from "@/assets/site.svg";
import Image from "next/image";
import { Comunidade } from "@/types";

export default function ComunidadeCardDialog() {
  const [comunidade, setComunidade] = useState<Comunidade | null>(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchComunidade = async () => {
      try {
        const response = await pegarTodasAsComunidades();
        const comunidadeSelecionada = response.find(
          (com: Comunidade) => com.id === Number(id)
        );
        setComunidade(comunidadeSelecionada || null);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) fetchComunidade();
  }, [id]);

  if (!comunidade) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <Header />
      <main className="w-full flex justify-center items-start p-5">
        <div className="w-full max-w-96 h-full flex flex-col justify-center items-center rounded-2xl">
          <div className="w-full h-56 bg-slate-900 rounded-t-2xl">
            {comunidade.cover_photo_url ? (
              <Image
                src={comunidade.cover_photo_url}
                alt={comunidade.nome}
                width={400}
                height={224}
                className="w-full h-full object-cover rounded-t-2xl"
              />
            ) : (
              <div className="w-full h-full bg-slate-900 rounded-t-2xl flex items-center justify-center">
                <p className="text-white text-sm">Imagem não disponível</p>
              </div>
            )}
          </div>

          <div className="w-full h-auto bg-[#e6e6e7] flex flex-col p-3 rounded-b-2xl gap-5">
            <div className="flex flex-row justify-between items-start">
              <div className="flex flex-row justify-start items-center">
                <p className="md:text-xl text-sm text-slate-900 font-semibold">
                  {comunidade.nome}
                </p>
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <Link
                  className="md:text-base text-xs text-slate-900 font-semibold flex flex-row justify-start items-center gap-1"
                  href={comunidade.url_insta || "#"}
                  target="_blank"
                >
                  <Image
                    src={instagramIcon}
                    alt="Instagram icon"
                    className="size-4"
                  />
                  Instagram
                </Link>
                <Link
                  className="md:text-base text-xs text-slate-900 font-semibold flex flex-row justify-start items-center gap-1"
                  href={comunidade.url_site || "#"}
                  target="_blank"
                >
                  <Image src={siteIcon} alt="Site icon" className="size-4" />
                  Site
                </Link>
              </div>
            </div>

            <div className="w-full h-auto">
              <p className="md:text-base text-xs text-slate-900 font-medium">
                {comunidade.descricao}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
