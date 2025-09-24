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
import { formatEventPeriod, generateCalendarUrl } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes, faLocationDot, faCalendarDays, faBuilding, faCalendarPlus, faBars } from "@fortawesome/free-solid-svg-icons";
import useIsMobile from "@/components/hook";
import ShareModal from "@/components/ShareModal";

export default function EventoPage() {
  const [evento, setEvento] = useState<Evento | null>(null);
  const router = useRouter();
  const { id } = router.query;
  const isMobile = useIsMobile(); 
  const [shareOpen, setShareOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const response = await pegarTodosEventos();
        const eventoPorId = (response as Evento[]).find(
          (idEvento: Evento) => idEvento.id === Number(id)
        );
        setEvento(eventoPorId || null);
      } catch (error) {
        console.error(error);
        setEvento(null);
      }
    };

    if (id) fetchEvento();
  }, [id]);

  const handleAddToCalendar = () => {
    if (!evento) return;

    const calendarUrl = generateCalendarUrl({
      titulo: evento.titulo,
      data_inicio: evento.data_inicio,
      data_fim: evento.data_fim,
      local: evento.local,
      descricao: evento.descricao,
      link_compra: evento.link_compra
    });

    // Abrir o calendário em uma nova aba
    window.open(calendarUrl, '_blank');
  };

  if (!evento) {
    return (
      <>
        <Header />
        <main className="w-full flex justify-center items-center p-5 min-h-screen">
          <div className="text-center">
            <p className="text-lg text-gray-600">Carregando evento...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const isFree = evento.valor === "0.00" || evento.valor === 0;
  const isComingSoon = evento.valor === "1.00" || evento.valor === 1;
  const priceLabel = isFree ? "Grátis" : isComingSoon ? "Em breve" : `R$${evento.valor}`;
  const ctaText = isFree ? "Inscreva-se" : isComingSoon ? "Em breve" : "Comprar agora";
  const ctaLink = evento.link_compra && evento.link_compra.trim() !== "" ? evento.link_compra : "#";

  return (
    <>
      <Header />
      <main
        className={`w-full flex justify-center items-start p-5 ${isMobile ? "pb-32" : ""}`}
      >
        <div className="container max-w-7xl h-full flex flex-col justify-start items-start">
          <div className="w-full flex justify-center items-center relative ">
            {evento.cover_photo_url ? (
              <img
                className="w-full max-h-[400px] rounded-2xl object-contain bg-slate-900"
                src={evento.cover_photo_url || imageTemplate.src}
                alt="imagem do evento"
                width={500}
                height={500}
              />
            ) : (
              <div className="w-full h-[400px] bg-slate-900 rounded-2xl"></div>
            )}
          </div>

          <div className="w-full h-auto flex flex-col mt-5">
            <div className={`w-full h-auto flex ${isMobile ? "flex-col" : "flex-row"} justify-between items-start gap-3`}>
              <div className="flex flex-col">
                <div className="flex item-center gap-2">
                  <h1 className="text-3xl md:text-lg lg:text-2xl font-bold capitalize">
                  {evento.titulo}
                </h1>
                </div>
                
                <Link
                  href={`/categorias/${evento.genero || ""}`}
                  className="text-lg font-semibold text-orange-500 capitalize"
                >
                  {evento.genero}
                </Link>
              </div>
              <div className="flex flex-col justify-center items-start p-1.5">
                <p className="text-xs md:text-sm lg:text-base font-semibold text-orange-500 capitalize">
                   <FontAwesomeIcon icon={faCalendarDays} className="text-orange-500" />
                  {formatEventPeriod(evento.data_inicio, evento.data_fim)}
                </p>
                <p className="text-xs md:text-sm lg:text-base font-semibold capitalize">
                  <FontAwesomeIcon icon={faLocationDot} className="text-orange-500" />
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(evento.local)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {evento.local}  
                  </a>
                  
                </p>
                <p className="text-xs md:text-sm lg:text-base font-semibold capitalize">
                    <FontAwesomeIcon icon={faBuilding} className="text-orange-500" />
                  {evento.organizacao}
                </p>
              </div>
            </div>

            <div className="w-full h-auto flex flex-col">
              <div className="w-full min-h-15 flex flex-col justify-start items-start">
                <p className="text-2xl md:text-3xl lg:text-2xl text-green-800 font-bold my-5">
                  {priceLabel}
                </p>
                <div className="flex items-center gap-3">
                  {!isMobile && (
                    <>
                      <Link
                        className="p-2.5 px-6 bg-slate-900 text-white text-base rounded-lg"
                        href={ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {ctaText}
                      </Link>
                      <button
                        type="button"
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-orange-500 transition-colors"
                        aria-label="Compartilhar evento"
                        onClick={() => setShareOpen(true)}
                      >
                        <FontAwesomeIcon icon={faShareNodes} size="sm" />
                      </button>
                      <button
                        type="button"
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-orange-500 transition-colors"
                        aria-label="Adicionar ao calendário"
                        onClick={handleAddToCalendar}
                      >
                        <FontAwesomeIcon icon={faCalendarPlus} size="sm" />
                      </button>
                    </>
                  )}
                </div>
                
              </div>

              <div className="w-full mt-5">
                <h1 className="text-xl md:text-lg lg:text-2xl font-bold capitalize mt-4 ">
                  Descrição 
                </h1>
                <div
                  className="w-full min-h-108 text-gray-600 whitespace-pre-line text-base mt-4"
                  dangerouslySetInnerHTML={{ __html: evento.descricao }}
                />
              </div>
            </div>
          </div>
        </div>
        {isMobile && (
          <>
            {actionsOpen && (
              <div
                className="fixed inset-0 z-20 bg-transparent"
                onClick={() => setActionsOpen(false)}
                aria-hidden="true"
              />
            )}
            <div
              className="md:hidden fixed inset-x-0 bottom-0 z-30 px-5 pt-4 bg-white/95 backdrop-blur border-t border-slate-200 shadow-[0_-10px_30px_rgba(15,23,42,0.12)]"
              style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.25rem)" }}
            >
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <button
                    type="button"
                    className="h-14 w-16 rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-md flex items-center justify-center"
                    aria-label="Opções do evento"
                    aria-expanded={actionsOpen}
                    onClick={() => setActionsOpen((prev) => !prev)}
                  >
                    <FontAwesomeIcon icon={faBars} size="lg" />
                  </button>

                  {actionsOpen && (
                    <div
                      className="absolute bottom-16 left-0 z-40 w-[220px] max-w-[calc(100vw-80px)] rounded-2xl border border-slate-200 bg-white shadow-[0_20px_40px_rgba(15,23,42,0.18)] p-2"
                      style={{ minWidth: "180px" }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          handleAddToCalendar();
                          setActionsOpen(false);
                        }}
                        className="w-full flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100"
                      >
                        <FontAwesomeIcon icon={faCalendarPlus} className="text-slate-500" />
                        Adicionar à agenda
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShareOpen(true);
                          setActionsOpen(false);
                        }}
                        className="mt-1 w-full flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100"
                      >
                        <FontAwesomeIcon icon={faShareNodes} className="text-slate-500" />
                        Compartilhar
                      </button>
                    </div>
                  )}
                </div>

                <Link
                  href={ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-14 inline-flex items-center justify-center rounded-2xl bg-slate-900 text-white text-base font-semibold shadow-lg"
                  onClick={() => setActionsOpen(false)}
                >
                  {ctaText}
                </Link>
              </div>
            </div>
          </>
        )}
        <ShareModal
          open={shareOpen}
          onClose={() => setShareOpen(false)}
          url={typeof window !== "undefined" ? window.location.href : ""}
          isMobile={isMobile}
          evento={{
            titulo: evento.titulo,
            data_inicio: evento.data_inicio,
            data_fim: evento.data_fim,
            data: formatEventPeriod(evento.data_inicio, evento.data_fim),
            local: evento.local,
            organizacao: evento.organizacao,
            link_compra: evento.link_compra,
            valor: String(evento.valor)
          }}
        />
      </main>
      <Footer />
    </>
  );
}
