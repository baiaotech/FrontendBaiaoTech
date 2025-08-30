'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

type SearchItem = {
  id: string | number;
  titulo?: string;
  title?: string;          // fallback
  data?: string;
  local?: string;
  organizacao?: string;
  cover_photo_url?: string;
};

const BASE = 'https://api.baiaotech.org/api/v1/eventos/search/';

async function fetchSearch(term: string, ac: AbortController) {
  // tenta ?q= , depois ?search=
  const urls = [
    `${BASE}?q=${encodeURIComponent(term)}`,
    `${BASE}?search=${encodeURIComponent(term)}`,
  ];
  for (const url of urls) {
    const res = await fetch(url, { signal: ac.signal, cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      const arr: SearchItem[] = Array.isArray(data) ? data : (data?.results ?? []);
      return arr;
    }
  }
  throw new Error('Nenhum formato aceito respondeu com 200');
}

export default function SearchBar() {
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [results, setResults] = useState<SearchItem[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  const MIN = 2;

  useEffect(() => {
    const term = q.trim();
    if (term.length < MIN) {
      setResults([]);
      setErr(null);
      return;
    }
    const ac = new AbortController();
    abortRef.current?.abort();
    abortRef.current = ac;

    setLoading(true);
    setErr(null);

    const t = setTimeout(async () => {
      try {
        const arr = await fetchSearch(term, ac);
        setResults(arr);
      } catch (e: any) {
        if (e.name !== 'AbortError') setErr('Falha ao pesquisar');
      } finally {
        setLoading(false);
      }
    }, 450); // debounce

    return () => {
      clearTimeout(t);
      ac.abort();
    };
  }, [q]);

  const showPanel = useMemo(
    () => q.trim().length >= MIN && (loading || err || results.length >= 0),
    [q, loading, err, results.length]
  );

  return (
    <section aria-label="Pesquisar eventos" className="w-full max-w-3xl mx-auto my-6">
      <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20">
        <svg width="18" height="18" viewBox="0 0 24 24" className="text-slate-500">
          <path fill="currentColor" d="M21 21l-4.2-4.2m1.2-5A7 7 0 1 1 7 3a7 7 0 0 1 11 8.8z" />
        </svg>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Pesquisar eventos (título, descrição, local, organização, gênero, data)…"
          className="w-full bg-transparent outline-none text-[14px] placeholder:text-slate-400"
          aria-label="Pesquisar eventos"
        />
        {q && (
          <button
            type="button"
            onClick={() => { setQ(''); setResults([]); setErr(null); }}
            className="rounded-md px-2 py-1 text-slate-500 hover:text-slate-700"
            aria-label="Limpar"
            title="Limpar"
          >
            ⨯
          </button>
        )}
      </div>

      {showPanel && (
        <div className="mt-2 rounded-xl border border-slate-200 bg-white shadow-sm">
          {loading && <div className="p-4 text-sm text-slate-500">Buscando…</div>}
          {err && !loading && <div className="p-4 text-sm text-red-600">{err}</div>}
          {!loading && !err && results.length === 0 && q.trim().length >= MIN && (
            <div className="p-4 text-sm text-slate-500">Nenhum resultado.</div>
          )}
          {!loading && !err && results.length > 0 && (
            <ul className="divide-y divide-slate-100">
              {results.map((it) => {
                const title = it.titulo || it.title || 'Evento';
                const meta = [it.data?.split('T')[0], it.local, it.organizacao]
                  .filter(Boolean)
                  .join(' • ');
                return (
                  <li key={String(it.id)}>
                    <Link href={`/eventos/${it.id}`} className="block p-3 hover:bg-slate-50">
                      <div className="text-[14px] font-semibold text-slate-900">{title}</div>
                      {meta && <div className="text-[12px] text-slate-500">{meta}</div>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
