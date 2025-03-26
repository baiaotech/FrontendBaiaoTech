"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import logo from "@/assets/logo/20.svg"
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-[#e6e6e7]">
      <div className="w-full h-20 flex flex-row justify-between items-center px-6 lg:px-8">
        <div className="h-full flex justify-center items-center">
          <Link 
            href="/"
            className="w-36 h-20 flex justify-center items-center"
          >
            <Image src={logo} alt="logo" className="w-full h-full object-cover" />
          </Link>
        </div>

        <nav className="hidden md:flex gap-6">
          <div className="text-slate-900 lg:text-sm md:text-xs font-bold">
            <Link className="hover:text-orange-600 transition" href="/comunidades">Comunidades</Link>
          </div>
          <div className="text-slate-900 lg:text-sm md:text-xs font-bold">
            <Link className="hover:text-orange-600 transition" href="/">Baião Tech Fest</Link>
          </div>

          <div className="h-full flex justify-center items-center">
            <Link
              href={`${process.env.FORM_LINK}`}
              className="text-orange-500 lg:text-sm md:text-xs font-bold cursor-pointer hover:text-orange-800"
              target="_blank"
            >
              Indique um evento
            </Link>
          </div>
        </nav>

        <div className="md:hidden cursor-pointer text-slate-900" onClick={handleMenuOpen}>
          <Menu />
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col justify-center items-center bg-[#e6e6e7] gap-5 py-4 md:hidden transition">
          <div className="text-slate-900 text-xs font-bold">
            <Link className="hover:text-orange-500" href="/comunidades">
              Comunidades
            </Link>
          </div>

          <div className="text-slate-900 text-xs font-bold">
            <Link className="hover:text-orange-500" href="/">
              Baião Tech Fest
            </Link>
          </div>

          <div className="h-full flex justify-center items-center">
            <Link
              href={`${process.env.FORM_LINK}`}
              className="text-orange-500 text-xs font-bold cursor-pointer hover:text-orange-800"
              target="_blank"
            >
              Indique um evento
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
