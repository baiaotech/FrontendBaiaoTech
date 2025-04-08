import Link from "next/link";
import discordIcon from "@/assets/discord.svg";
import instagramIcon from "@/assets/instagram.svg";
import twitterIcon from "@/assets/twitter.svg";
import linkedinIcon from "@/assets/linkedin.svg";
import logo from "@/assets/logo/20.svg";
import Image from "next/image";
import { categorias } from "../categorias";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center bg-[#e6e6e7]">
      <div className="w-full max-w-[1200px] h-auto p-5 flex flex-col justify-between items-center">
        {/* <!-- Top Section --> */}
        <div className="w-full min-h-[100px] border-b border-[#ccc] flex flex-row justify-start items-center">
          <div className="flex justify-center items-center">
            <Link
              href="/"
              className="md:w-36 w-25 h-20 flex justify-center items-center"
            >
              {/* Baião <span className="text-orange-500">Tech</span> */}
              <Image src={logo} alt="logo" className="w-full h-full object-cover" />
            </Link>
          </div>
        </div>

        {/* <!-- Middle Section --> */}
        <div className="w-full my-12 flex flex-wrap justify-between items-start gap-5">
          {/* <!-- Events --> */}
          <div className="flex flex-col gap-4">
            <h4 className="md:text-[12px] text-[10px] font-bold text-slate-900 uppercase tracking-[1px]">
              Encontre Eventos
            </h4>
            <ul className="flex flex-col gap-1">
              <li>
                <Link
                  href="/"
                  className="md:text-[10px] text-[8px] text-slate-700 uppercase hover:text-orange-500"
                >
                  Hoje
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="md:text-[10px] text-[8px] text-slate-700 uppercase hover:text-orange-500"
                >
                  Amanhã
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="md:text-[10px] text-[8px] text-slate-700 uppercase hover:text-orange-500"
                >
                  Esta semana
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="md:text-[10px] text-[8px] text-slate-700 uppercase hover:text-orange-500"
                >
                  Este fim de semana
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="md:text-[10px] text-[8px] text-slate-700 uppercase hover:text-orange-500"
                >
                  Próxima semana
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="md:text-[10px] text-[8px] text-slate-700 uppercase hover:text-orange-500"
                >
                  Este mês
                </Link>
              </li>
            </ul>
          </div>

          {/* <!-- Categories --> */}
          <div className="flex flex-col gap-4">
            <h4 className="md:text-[12px] text-[10px] font-bold text-slate-900 uppercase tracking-[1px]">
              Categorias
            </h4>
            <ul className="flex flex-col gap-1">
              {categorias.map((i) => (
                <li key={i.id}>
                  <Link
                    href="/"
                    className="md:text-[10px] text-[8px] text-slate-700 uppercase hover:text-orange-500"
                  >
                    {i.genero}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* <!-- Collaborator --> */}
          <div className="flex flex-col gap-4">
            <h4 className="md:text-[12px] text-[10px] font-bold text-slate-900 uppercase tracking-[1px]">
              Para Colaboradores
            </h4>
            <ul className="flex flex-col gap-1">
              <li>
                <Link
                  href={`${process.env.FORM_LINK}`}
                  target="_blank"
                  className="md:text-[10px] text-[8px] text-slate-700 uppercase hover:text-orange-500"
                >
                  Indique seu evento
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  target="_blank"
                  className="md:text-[10px] text-[8px] text-slate-700 uppercase hover:text-orange-500"
                >
                  Entre no Discord
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* <!-- Bottom Section --> */}
        <div className="w-full min-h-[120px] border-t border-[#ccc] flex flex-col justify-start items-center">
          <div className="w-full mt-5 flex flex-wrap justify-between items-center gap-5">
            <div className="flex flex-row gap-8">
              <Link
                href="/"
                className="md:text-[10px] text-[8px] text-slate-700 uppercase hover:text-orange-500"
              >
                Home
              </Link>
              <Link
                href="/"
                className="md:text-[10px] text-[8px] text-slate-700 uppercase hover:text-orange-500"
              >
                Termos e Políticas
              </Link>
              <Link
                href="/"
                className="md:text-[10px] text-[8px] text-slate-700 uppercase hover:text-orange-500"
              >
                Ética e conduta
              </Link>
              <Link
                href="/"
                className="md:text-[10px] text-[8px] text-slate-700 uppercase hover:text-orange-500"
              >
                Política de Direitos Humanos
              </Link>
            </div>
            <div className="flex flex-row gap-8">
              <Link href="/">
                <Image
                  className="w-5 h-5"
                  src={discordIcon}
                  alt="discord icon"
                />
              </Link>
              <Link href="/">
                <Image
                  className="w-5 h-5"
                  src={instagramIcon}
                  alt="discord icon"
                />
              </Link>
              <Link href="/">
                <Image
                  className="w-5 h-5 color-[#90a1b9]"
                  src={twitterIcon}
                  alt="discord icon"
                />
              </Link>
              <Link href="/">
                <Image
                  className="w-5 h-5"
                  src={linkedinIcon}
                  alt="discord icon"
                />
              </Link>
            </div>
          </div>
          <div className="w-full h-[50px] mt-5 flex justify-start items-center">
            <p className="md:text-[10px] text-[8px] text-slate-700 uppercase">
              Baião Tech Community. © Copyright 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
