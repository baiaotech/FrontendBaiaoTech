"use client";

import { api } from "@/services/api";
import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Comunidade } from "@/types";
import SkeletonCard from "@/components/skeletonCard";
import EstadoFilter from "@/components/EstadoFilter";

export default function MainComunidades() {
  const [estadoParam, setEstadoParam] = useState<string | null>(null);

  const [comunidades, setComunidades] = useState<Comunidade[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [carregandoMais, setCarregandoMais] = useState(false);
  const [estadosSelecionados, setEstadosSelecionados] = useState<string[]>([]);
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalComunidades, setTotalComunidades] = useState(0);

  // Ler search params apenas no cliente para evitar hydration mismatch
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const estado = urlParams.get("estado") || null;
      setEstadoParam(estado);
    }
  }, []);

    const fetchComunidades = useCallback(async (page: number = 1, append: boolean = false, loadAll: boolean = false) => {
    try {
      if (page === 1) {
        setCarregando(true);
      } else {
        setCarregandoMais(true);
      }

      console.log(`Iniciando busca de comunidades - página ${page}...`);
      const response = await api.get(`/comunidades/?page=${page}&limit=12`);
      console.log("Resposta recebida:", response);

      const data = response.data;

      // Se a resposta for paginada
      if (data && typeof data === 'object' && 'results' in data) {
        const novasComunidades = Array.isArray(data.results) ? data.results : [];

        if (append) {
          setComunidades(prev => [...prev, ...novasComunidades]);
        } else {
          setComunidades(novasComunidades);
        }

        // Se precisamos carregar todas as comunidades (por causa do filtro) e há mais páginas
        if (loadAll && data.next) {
          // Carregar a próxima página recursivamente
          await fetchComunidades(page + 1, true, true);
        } else {
          // Verifica se há mais páginas - só definir hasMore quando não estamos carregando tudo
          if (!loadAll) {
            setHasMore(data.next !== null);
          }
          setTotalComunidades(data.count || 0);
        }
      } else if (Array.isArray(data)) {
        // Resposta direta como array
        if (append) {
          setComunidades(prev => [...prev, ...data]);
        } else {
          setComunidades(data);
        }
        setHasMore(false);
        setTotalComunidades(data.length);
      }

      setCarregando(false);
      setCarregandoMais(false);
    } catch (error) {
      console.error("Erro ao buscar comunidades:", error);
      setCarregando(false);
      setCarregandoMais(false);
    }
  }, []);

  // Filtrar comunidades baseado nos estados selecionados e busca
  const comunidadesExibidas = useMemo(() => {
    let filtradas = comunidades;

    // Filtro por estados
    if (estadosSelecionados.length > 0) {
      filtradas = filtradas.filter(com =>
        com.estado && estadosSelecionados.includes(com.estado)
      );
    }

    // Filtro por busca
    if (busca.trim()) {
      const termoBusca = busca.toLowerCase();
      filtradas = filtradas.filter(com =>
        com.nome.toLowerCase().includes(termoBusca) ||
        (com.descricao && com.descricao.toLowerCase().includes(termoBusca)) ||
        (com.estado && com.estado.toLowerCase().includes(termoBusca))
      );
    }

    return filtradas;
  }, [comunidades, estadosSelecionados, busca]);

  const handleFiltroEstados = (estados: string[]) => {
    setEstadosSelecionados(estados);

    // Se estamos removendo todos os filtros (estados vazios)
    if (estados.length === 0) {
      setPagina(1);
      setHasMore(true);
      // Limpar o parâmetro da URL quando removemos todos os filtros
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.delete('estado');
        window.history.replaceState({}, '', url.toString());
      }
      // Atualizar estadoParam para null quando removemos o filtro da URL
      setEstadoParam(null);
      // Recarregar apenas a primeira página quando removemos todos os filtros
      fetchComunidades(1, false, false);
    }
    // Se estamos aplicando filtros, carregar todas as comunidades para garantir que o filtro funcione
    else if (estados.length > 0 && comunidades.length < totalComunidades) {
      fetchComunidades(1, false, true);
    }
  };

  const handleLimparFiltro = () => {
    setEstadosSelecionados([]);
    setBusca("");
    setPagina(1);
    setHasMore(true);
    // Limpar o parâmetro da URL quando limpamos os filtros
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('estado');
      window.history.replaceState({}, '', url.toString());
    }
    // Atualizar estadoParam para null quando removemos o filtro da URL
    setEstadoParam(null);
    // Quando limpamos os filtros, recarregar apenas a primeira página
    fetchComunidades(1, false, false);
  };

  const handleBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusca(e.target.value);
  };

  const handleVerMais = () => {
    // Não carregar mais se estamos filtrando por estado ou busca (já carregamos tudo)
    if (estadosSelecionados.length > 0 || busca.trim()) return;

    if (hasMore && !carregandoMais) {
      const nextPage = pagina + 1;
      setPagina(nextPage);
      fetchComunidades(nextPage, true);
    }
  };

  useEffect(() => {
    // Se há um estado na URL, carregar todas as comunidades para garantir que o filtro funcione
    if (estadoParam) {
      fetchComunidades(1, false, true);
    } else {
      fetchComunidades(1, false);
    }
  }, [estadoParam, fetchComunidades]);

  // Aplicar filtro de estado automaticamente quando vier da URL
  useEffect(() => {
    if (estadoParam && comunidades.length > 0 && !estadosSelecionados.includes(estadoParam)) {
      setEstadosSelecionados([estadoParam]);
    }
  }, [estadoParam, comunidades, estadosSelecionados]);

  // Efeito para carregar todas as comunidades quando há filtros aplicados
  useEffect(() => {
    if ((estadosSelecionados.length > 0 || busca.trim()) && comunidades.length < totalComunidades && !carregando) {
      fetchComunidades(1, false, true);
    }
  }, [estadosSelecionados, busca, carregando, comunidades.length, fetchComunidades, totalComunidades]);

  return (
    <main className="w-full min-h-screen bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Comunidades de Tecnologia
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Esta é uma lista de comunidades de tecnologia do Nordeste que encontramos e reunimos para facilitar sua busca por networking, aprendizado e eventos.
            <span className="font-semibold text-orange-600 block mt-2">
              Nenhuma delas é parceira oficial do Baião Tech
            </span>
            — apenas listamos para ajudar a fortalecer o ecossistema regional!
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar comunidades..."
                  value={busca}
                  onChange={handleBuscaChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <EstadoFilter
                onFilter={handleFiltroEstados}
                onClear={handleLimparFiltro}
              />

              {(estadosSelecionados.length > 0 || busca) && (
                <button
                  onClick={handleLimparFiltro}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Limpar Filtros
                </button>
              )}
            </div>
          </div>

          {/* Active Filters */}
          {estadosSelecionados.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {estadosSelecionados.map(estado => (
                <span
                  key={estado}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {estado}
                  <button
                    onClick={() => handleFiltroEstados(estadosSelecionados.filter(e => e !== estado))}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {carregando
            ? Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : comunidadesExibidas.map((com) => (
                <div
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden group"
                  key={com.id}
                >
                  <Link href={`/comunidades/${com.id || ""}`} className="block">
                    <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
                      {com.cover_photo_url ? (
                        <img
                          src={com.cover_photo_url}
                          alt={com.nome}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {com.nome}
                      </h3>
                      {com.estado && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-2 flex-shrink-0">
                          {com.estado}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-slate-600 line-clamp-3 mb-4 min-h-[3rem]">
                      {com.descricao || "Comunidade de tecnologia sem descrição disponível."}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {com.url_site && (
                        <a
                          href={com.url_site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          🌐 Site
                        </a>
                      )}
                      {com.url_insta && (
                        <a
                          href={com.url_insta}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 text-xs font-medium text-pink-600 bg-pink-50 rounded-full hover:bg-pink-100 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          📷 Instagram
                        </a>
                      )}
                      {com.url_facebook && (
                        <a
                          href={com.url_facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          👥 Facebook
                        </a>
                      )}
                      {com.url_linkedin && (
                        <a
                          href={com.url_linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          💼 LinkedIn
                        </a>
                      )}
                      {com.url_twitter && (
                        <a
                          href={com.url_twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 text-xs font-medium text-sky-600 bg-sky-50 rounded-full hover:bg-sky-100 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          🐦 Twitter
                        </a>
                      )}
                      {com.url_telegram && (
                        <a
                          href={com.url_telegram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          ✈️ Telegram
                        </a>
                      )}
                      {com.url_whatsapp && (
                        <a
                          href={com.url_whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-600 bg-green-50 rounded-full hover:bg-green-100 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          💬 WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Ver Mais Button - aparece sempre que há mais comunidades para carregar e não estamos filtrando */}
        {!carregando && hasMore && comunidadesExibidas.length > 0 && estadosSelecionados.length === 0 && !busca.trim() && (
          <div className="text-center mt-8">
            <button
              onClick={handleVerMais}
              disabled={carregandoMais}
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-orange-400 disabled:cursor-not-allowed transition-colors font-medium shadow-sm"
            >
              {carregandoMais ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Carregando...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  Ver Mais Comunidades
                </>
              )}
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Mostrando {comunidades.length} de {totalComunidades} comunidades
            </p>
          </div>
        )}

        {/* Status message when filters are applied */}
        {!carregando && (estadosSelecionados.length > 0 || busca.trim()) && comunidadesExibidas.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              Mostrando {comunidadesExibidas.length} de {comunidades.length} comunidades
              {estadosSelecionados.length > 0 && ` filtradas por estado`}
              {busca.trim() && ` com busca "${busca}"`}
            </p>
          </div>
        )}

        {/* No Results */}
        {!carregando && comunidadesExibidas.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma comunidade encontrada</h3>
            <p className="text-gray-600 mb-4">
              {estadosSelecionados.length > 0 || busca
                ? "Tente ajustar os filtros ou remover a busca para ver mais resultados."
                : "Não há comunidades disponíveis no momento."
              }
            </p>
            {(estadosSelecionados.length > 0 || busca) && (
              <button
                onClick={handleLimparFiltro}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Limpar Filtros
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
