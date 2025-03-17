"use client";
import Image from "next/image";
import locationIcon from "@/assets/pin.svg";
import chevronBottomIcon from "@/assets/chevron-bottom.svg";
import Link from "next/link";
import menuIcon from "@/assets/menu.svg";
import closeMenuIcon from "@/assets/menu_close.svg";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="w-full h-20 bg-[#333] flex justify-center items-center">
      <div className="w-full h-full px-5 flex flex-row justify-between items-center">
        <div className="h-full flex justify-center items-center">
          <Link
            href="/"
            className="text-2xl font-bold leading-relaxed text-white uppercase tracking-wider"
          >
            Baião <span className="text-orange-500">Tech</span>
          </Link>
        </div>

        <div
          className={`h-full flex flex-row justify-between items-center gap-8 ${
            menuOpen ? "hidden" : "flex"
          }`}
        >
          <div className="h-full flex justify-center items-center">
            <button className="bg-none border-none text-white text-sm font-bold uppercase tracking-wider cursor-pointer flex justify-center items-center">
              <Image src={locationIcon} alt="Icone de Localização" width={14} />
              <span className="mx-1">Qualquer Lugar</span>
              <Image
                src={chevronBottomIcon}
                alt="Icone de seta para baixo"
                width={14}
              />
            </button>
          </div>

          <div className="h-full flex justify-center items-center">
            <Link
              href="/"
              className="text-orange-500 text-sm font-bold uppercase tracking-wider cursor-pointer"
            >
              INDIQUE UM EVENTO
            </Link>
          </div>
        </div>

        <div className="md:hidden flex justify-center items-center cursor-pointer">
          <button
            id="menuOpen"
            onClick={handleMenuOpen}
            className="w-7 h-7 bg-none border-none"
          >
            <Image
              src={menuIcon}
              alt="Menu Icon"
              className="w-full h-full transition-all"
            />
          </button>

          <button
            id="menuClose"
            onClick={handleMenuOpen}
            className={`w-7 h-7 bg-none border-none ${
              menuOpen ? "flex" : "hidden"
            }`}
          >
            <Image
              src={closeMenuIcon}
              alt="Close menu Icon"
              className="w-full h-full transition-all"
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden w-full absolute right-0 top-20 bg-gray-800 z-50 flex flex-col justify-center items-center p-5 gap-5">
          <div className="h-full flex justify-center items-center">
            <button className="bg-none border-none text-white text-sm font-bold uppercase tracking-wider cursor-pointer flex justify-center items-center">
              <Image src={locationIcon} alt="Icone de Localização" width={14} />
              <span className="mx-1">Qualquer Lugar</span>
              <Image
                src={chevronBottomIcon}
                alt="Icone de seta para baixo"
                width={14}
              />
            </button>
          </div>

          <div className="h-full flex justify-center items-center">
            <Link
              href="/"
              className="text-orange-500 text-sm font-bold uppercase tracking-wider cursor-pointer"
            >
              INDIQUE UM EVENTO
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
