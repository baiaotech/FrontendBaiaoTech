"use client";

import "@/app/globals.css";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBuilding,
  faCalendarDays,
  faCalendarPlus,
  faLocationDot,
  faShareNodes
} from "@fortawesome/free-solid-svg-icons";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShareModal from "@/components/ShareModal";
import useIsMobile from "@/components/hook";
import imageTemplate from "@/assets/imgTemplate.png";

import { Evento } from "@/types";
import { pegarTodosEventos } from "@/routes/api.routes";
import {
  extractIdFromSlug,
  formatEventPeriod,
  generateCalendarUrl
} from "@/lib/utils";

const MOBILE_TRAY_BASE_HEIGHT = 96;

export default function EventoPage() {
  const router = useRouter();
  const { id } = router.query;
  const eventId = useMemo(() => extractIdFromSlug(id), [id]);

  const isMobile = useIsMobile();

  const [evento, setEvento] = useState<Evento | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [viewportOffset, setViewportOffset] = useState(0);

  useEffect(() => {
    if (eventId == null) {
      setEvento(null);
      return;
    }

    const fetchEvento = async () => {
      try {
        const response = await pegarTodosEventos();
        const eventoPorId = (response as Evento[]).find(
          (current: Evento) => current.id === Number(eventId)
        );
        setEvento(eventoPorId ?? null);
      } catch (error) {
        console.error(error);
        setEvento(null);
      }
    };

    fetchEvento();
  }, [eventId]);

  useEffect(() => {
    if (!isMobile || typeof window === "undefined" || !window.visualViewport) {
      return;
    }

    const viewport = window.visualViewport;

    const updateOffset = () => {
      const diff = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
      setViewportOffset(diff);
    };

    updateOffset();
    viewport.addEventListener("resize", updateOffset);
    viewport.addEventListener("scroll", updateOffset);

    return () => {
      viewport.removeEventListener("resize", updateOffset);
      viewport.removeEventListener("scroll", updateOffset);
    };
  }, [isMobile]);

  const dynamicTraySpacing = useMemo(() => {
    if (!isMobile) return undefined;
    return `calc(${MOBILE_TRAY_BASE_HEIGHT}px + env(safe-area-inset-bottom, 0px) + ${Math.round(viewportOffset)}px)`;
  }, [isMobile, viewportOffset]);

  const trayBottomInset = useMemo(() => {
    if (!isMobile) return undefined;
    return `calc(env(safe-area-inset-bottom, 0px) + ${Math.round(viewportOffset)}px)`;
  }, [isMobile, viewportOffset]);

  const trayInternalPadding = useMemo(() => {
    if (!isMobile) return undefined;
    return `calc(env(safe-area-inset-bottom, 0px) + 1.25rem)`;
  }, [isMobile]);

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

    window.open(calendarUrl, "_blank");
  };

  if (!evento) {
    return (
      <>
        <Header />
        <main className="w-full flex justify-center items-center p-5 min-h-screen">
          <p className="text-lg text-gray-600">Carregando evento...</p>
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
        className="w-full flex justify-center items-start p-5"
        style={dynamicTraySpacing ? { paddingBottom: dynamicTraySpacing } : undefined}
      >
        <div className="container max-w-7xl flex flex-col items-start">
          <div className="w-full flex justify-center items-center">
            {evento.cover_photo_url ? (
              <img
                className="w-full max-h-[400px] rounded-2xl object-contain bg-slate-900"
                src={evento.cover_photo_url || imageTemplate.src}
                alt="imagem do evento"
                width={500}
                height={500}
              />
            ) : (
              <div className="w-full h-[400px] rounded-2xl bg-slate-900" />
            )}
          </div>

          <div className="w-full flex flex-col mt-5">
            <div className={`w-full flex ${isMobile ? "flex-col" : "flex-row"} justify-between items-start gap-3`}>
              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-2">
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

              <div className="flex flex-col justify-center items-start p-1.5 space-y-1">
                <p className="text-xs md:text-sm lg:text-base font-semibold text-orange-500 capitalize">
                  <FontAwesomeIcon icon={faCalendarDays} className="mr-2 text-orange-500" />
                  {formatEventPeriod(evento.data_inicio, evento.data_fim)}
                </p>
                <p className="text-xs md:text-sm lg:text-base font-semibold capitalize">
                  <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-orange-500" />
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
                  <FontAwesomeIcon icon={faBuilding} className="mr-2 text-orange-500" />
                  {evento.organizacao}
                </p>
              </div>
            </div>

            <div className="w-full flex flex-col">
              <div className="w-full flex flex-col items-start">
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
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-orange-500"
                        aria-label="Compartilhar evento"
                        onClick={() => setShareOpen(true)}
                      >
                        <FontAwesomeIcon icon={faShareNodes} size="sm" />
                      </button>
                      <button
                        type="button"
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-orange-500"
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
                <h2 className="text-xl md:text-lg lg:text-2xl font-bold capitalize mt-4">Descrição</h2>
                <div
                  className="w-full text-base text-gray-600 whitespace-pre-line mt-4"
                  dangerouslySetInnerHTML={{ __html: evento.descricao }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {isMobile && (
        <>
          {actionsOpen && (
            <button
              type="button"
              className="fixed inset-0 z-20 bg-transparent"
              onClick={() => setActionsOpen(false)}
              aria-label="Fechar bandeja de ações"
            />
          )}
          <div
            className="md:hidden fixed inset-x-0 bottom-0 z-30 px-5 pt-4 bg-white/95 backdrop-blur border-t border-slate-200 shadow-[0_-10px_30px_rgba(15,23,42,0.12)]"
            style={{
              bottom: trayBottomInset,
              paddingBottom: trayInternalPadding
            }}
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

      <div style={dynamicTraySpacing ? { paddingBottom: dynamicTraySpacing } : undefined}>
        <Footer />
      </div>

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
    </>
  );
}
