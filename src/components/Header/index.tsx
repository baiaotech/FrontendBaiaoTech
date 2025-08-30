"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, Search as SearchIcon } from "lucide-react";
import logo from "@/assets/logo/20.svg";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // ---- search (netflix-like) ----
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleMenuOpen = () => {
    if (menuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setMenuOpen(false);
        setIsClosing(false);
      }, 300);
    } else {
      setMenuOpen(true);
    }
  };

  const toggleSearch = () => {
    setSearchOpen((v) => !v);
  };

  useEffect(() => {
    if (searchOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  const submitSearch = () => {
    const q = term.trim();
    if (q.length >= 2) {
      router.push(`/eventos?search=${encodeURIComponent(q)}`);
      setSearchOpen(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submitSearch();
    if (e.key === "Escape") {
      setSearchOpen(false);
      setTerm("");
    }
  };

  return (
    <header className="bg-[#e6e6e7]">
      <div className="w-full h-20 flex flex-row justify-between items-center px-6 lg:px-8">
        {/* logo */}
        <div className="h-full flex justify-center items-center">
          <Link href="/" className="md:w-36 w-25 h-20 flex justify-center items-center">
            <Image src={logo} alt="logo" className="w-full h-full object-cover" />
          </Link>
        </div>

        {/* desktop nav + search */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="text-slate-900 lg:text-sm md:text-xs font-bold">
            <Link className="hover:text-orange-600 transition" href="/comunidades">
              Comunidades
            </Link>
          </div>
          {/*<div className="text-slate-900 lg:text-sm md:text-xs font-bold">
            <Link className="hover:text-orange-600 transition" href="/">
              Baião Tech Fest
            </Link>
          </div> */}
          <div className="h-full flex justify-center items-center">
            <Link
              href={`${process.env.NEXT_PUBLIC_FORM_LINK ?? "#"}`}
              className="text-orange-500 lg:text-sm md:text-xs font-bold cursor-pointer hover:text-orange-800 transition"
              target="_blank"
            >
              Indique um evento
            </Link>
          </div>

          {/* SEARCH – netflix like */}
          <div className="relative flex items-center">
            {/* container com transição de largura */}
            <div
              className={[
                "flex items-center rounded-full border border-slate-300 bg-white/80 shadow-sm",
                "transition-all duration-300 ease-out overflow-hidden",
                searchOpen ? "w-80 px-3 py-1.5" : "w-9 px-0 py-0",
              ].join(" ")}
            >
              <button
                type="button"
                onClick={toggleSearch}
                aria-label="Buscar"
                className="flex items-center justify-center w-9 h-9 text-slate-700 hover:text-slate-900"
              >
                <SearchIcon size={18} />
              </button>

              {/* input aparece só quando aberto */}
              <input
                ref={inputRef}
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Pesquisar eventos…"
                className={[
                  "bg-transparent outline-none text-sm placeholder:text-slate-500",
                  "transition-all duration-200",
                  searchOpen ? "w-full px-2" : "w-0 px-0 opacity-0 pointer-events-none",
                ].join(" ")}
                aria-label="Pesquisar eventos"
              />

              {searchOpen && term && (
                <button
                  type="button"
                  onClick={() => setTerm("")}
                  title="Limpar"
                  aria-label="Limpar"
                  className="text-slate-500 hover:text-slate-700 px-1"
                >
                  ⨯
                </button>
              )}
            </div>
          </div>
        </nav>

        {/* mobile: menu + botão search que abre overlay */}
        <div className="md:hidden flex items-center gap-3">
          {/* botão search (abre overlay) */}
          <button
            aria-label="Buscar"
            onClick={() => setSearchOpen(true)}
            className="w-8 h-8 flex items-center justify-center text-slate-900"
          >
            <SearchIcon />
          </button>

          {/* menu hamburguer */}
          <div className="cursor-pointer text-slate-900 relative w-8 h-8" onClick={handleMenuOpen}>
            <Menu
              className={`absolute top-0 left-0 w-8 h-8 transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-90" : "opacity-100 scale-100"
              }`}
            />
            <X
              className={`absolute top-0 left-0 w-8 h-8 transition-all duration-300 ${
                menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            />
          </div>
        </div>
      </div>

      {/* mobile nav */}
      {(menuOpen || isClosing) && (
        <nav
          className={`flex flex-col justify-center items-center bg-[#e6e6e7] gap-5 py-4 md:hidden transition-all duration-300 ease-in-out
          ${menuOpen && !isClosing ? "animate-fade-down" : "animate-fade-up"}
        `}
        >
          <div className="text-slate-900 lg:text-sm md:text-xs font-bold">
            <Link className="hover:text-orange-600 transition" href="/comunidades">
              Comunidades
            </Link>
          </div>
           {/*
          <div className="text-slate-900 lg:text-sm md:text-xs font-bold">
            <Link className="hover:text-orange-600 transition" href="/">
              Baião Tech Fest
            </Link>
          </div> */}
          <div className="h-full flex justify-center items-center">
            <Link
              href={`${process.env.NEXT_PUBLIC_FORM_LINK ?? "#"}`}
              className="text-orange-500 lg:text-sm md:text-xs font-bold cursor-pointer hover:text-orange-800 transition"
              target="_blank"
            >
              Indique um evento
            </Link>
          </div>
        </nav>
      )}

      {/* MOBILE SEARCH OVERLAY */}
      {searchOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setSearchOpen(false)}>
          <div
            className="bg-[#e6e6e7] shadow-lg rounded-b-2xl p-4 pt-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2">
              <SearchIcon className="text-slate-600" size={18} />
              <input
                ref={inputRef}
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitSearch();
                  if (e.key === "Escape") setSearchOpen(false);
                }}
                placeholder="Pesquisar eventos…"
                className="w-full bg-transparent outline-none text-sm placeholder:text-slate-500"
                aria-label="Pesquisar eventos"
              />
              {term && (
                <button
                  onClick={() => setTerm("")}
                  className="text-slate-500 hover:text-slate-700 px-1"
                  aria-label="Limpar"
                >
                  ⨯
                </button>
              )}
              <button
                onClick={submitSearch}
                className="ml-1 rounded-full bg-orange-600 text-white text-xs font-semibold px-3 py-1.5 hover:bg-orange-700 transition"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
