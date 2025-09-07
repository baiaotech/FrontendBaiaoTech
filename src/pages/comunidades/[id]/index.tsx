"use client";
import "@/app/globals.css";
import { pegarTodasAsComunidades } from "@/routes/api.routes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Comunidade } from "@/types";

export default function ComunidadeDetalhes() {
  const [comunidade, setComunidade] = useState<Comunidade | null>(null);
  const [carregando, setCarregando] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchComunidade = async () => {
      try {
        const response = await pegarTodasAsComunidades();
        const comunidadeSelecionada = (response as Comunidade[]).find(
          (com: Comunidade) => com.id === Number(id)
        );
        setComunidade(comunidadeSelecionada || null);
        setCarregando(false);
      } catch (error) {
        console.error("Erro ao buscar comunidade:", error);
        setCarregando(false);
      }
    };

    if (id) fetchComunidade();
  }, [id]);

  if (carregando) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Carregando comunidade...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!comunidade) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Comunidade não encontrada</h2>
            <p className="text-gray-600 mb-6">A comunidade que você está procurando não existe ou foi removida.</p>
            <Link
              href="/comunidades"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Voltar para Comunidades
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const socialLinks = [
    { url: comunidade.url_site, label: "🌐 Site", color: "blue" },
    { url: comunidade.url_insta, label: "📷 Instagram", color: "pink" },
    { url: comunidade.url_facebook, label: "👥 Facebook", color: "blue" },
    { url: comunidade.url_linkedin, label: "💼 LinkedIn", color: "blue" },
    { url: comunidade.url_twitter, label: "🐦 Twitter", color: "sky" },
    { url: comunidade.url_telegram, label: "✈️ Telegram", color: "blue" },
    { url: comunidade.url_whatsapp, label: "💬 WhatsApp", color: "green" },
  ].filter(link => link.url);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <Link
              href="/comunidades"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Voltar para Comunidades
            </Link>
          </nav>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header Image */}
            <div className="aspect-[16/9] bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-8">
              {comunidade.cover_photo_url ? (
                <img
                  src={comunidade.cover_photo_url}
                  alt={comunidade.nome}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              ) : (
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Title and State */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h1 className="text-3xl font-bold text-slate-900 mb-2 sm:mb-0">
                  {comunidade.nome}
                </h1>
                {comunidade.estado && (
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                    📍 {comunidade.estado}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Sobre a Comunidade</h2>
                <p className="text-slate-600 leading-relaxed">
                  {comunidade.descricao || "Esta comunidade ainda não possui uma descrição detalhada."}
                </p>
              </div>

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Links e Redes Sociais</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          link.color === 'blue'
                            ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                            : link.color === 'pink'
                            ? 'bg-pink-50 text-pink-700 hover:bg-pink-100'
                            : link.color === 'sky'
                            ? 'bg-sky-50 text-sky-700 hover:bg-sky-100'
                            : 'bg-green-50 text-green-700 hover:bg-green-100'
                        }`}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Interessado nesta comunidade?
                </h3>
                <p className="text-slate-600 mb-4">
                  Entre em contato através dos links acima para participar de eventos, networking e oportunidades de aprendizado.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/comunidades"
                    className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Ver Outras Comunidades
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                  >
                    Voltar ao Início
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
