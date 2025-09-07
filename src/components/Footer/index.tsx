import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo/20.svg";
import instagramIcon from "@/assets/instagram.svg";
import linkedinIcon from "@/assets/linkedin.svg";
import discordIcon from "@/assets/discord.svg";

export default function Footer() {
  const baseLink =
    "inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors";
  const icon16 = "size-4";

  return (
    <footer className="bg-[#e6e6e7] text-slate-700 border-t border-slate-300/80 flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 py-12">
        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/" className="w-auto h-auto flex items-center">
            <Image
              src={logo}
              width={150}
              height={150}
              alt="BAIÃO TECH"
              priority
            />
          </Link>
        </div>

        {/* Tagline */}
        <p className="mt-6 text-center text-[13px] leading-relaxed text-slate-600">
          Baião Tech é o #1 indexador de eventos de tecnologia do Nordeste,
          antes Coders Ceará, agora Baião Tech! ❤️
        </p>

        {/* Redes sociais */}
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[13px]">
          <li>
            <Link
              href="https://instagram.com/baiaotech"
              className={baseLink}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={instagramIcon} alt="Instagram" className="h-4 w-4" />
              <span className="underline decoration-slate-500/60 underline-offset-2">
                Instagram
              </span>
            </Link>
          </li>

          <li>
            <Link
              href="https://wa.me/5599999999999"
              className={baseLink}
              aria-label="WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* WhatsApp */}
              <svg
                className={icon16}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20 12.1A8 8 0 1 1 8.7 4a8 8 0 0 1 11.3 8.1Zm-2.2 5.3a9.8 9.8 0 1 0-3 2L22 22l-4.2-4.6ZM7.9 8.6c.2-.6.5-.6.8-.6h.6c.2 0 .5 0 .7.6.2.6.6 2-.1 2.3-.7.4-.7.7-.5 1 .2.4.9 1.5 2 2.4 1.3 1 2.3 1.3 2.7 1.5.4.1.7.1 1-.4.3-.5.9-1.2 1.1-1.4.2-.2.3-.3.6-.2l1 .4c.3.1.6.3.7.5.1.2.1 1.3-.7 2.1-.8.9-2 1-3.3.7-1.4-.3-3.2-1.2-4.6-2.6-1.4-1.4-2.3-3.2-2.6-4.6-.3-1.3-.2-2.5.7-3.3Z" />
              </svg>
              <span className="underline decoration-slate-500/60 underline-offset-2">
                WhatsApp
              </span>
            </Link>
          </li>

          <li>
            <Link
              href="https://youtube.com/@baiaotech"
              className={baseLink}
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* YouTube */}
              <svg
                className={icon16}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M23 12s0-3.4-.4-5a3 3 0 0 0-2.1-2.1C18.9 4.4 12 4.4 12 4.4s-6.9 0-8.5.5A3 3 0 0 0 1.4 7C1 8.6 1 12 1 12s0 3.4.4 5a3 3 0 0 0 2.1 2.1c1.6.5 8.5.5 8.5.5s6.9 0 8.5-.5A3 3 0 0 0 22.6 17c.4-1.6.4-5 .4-5ZM9.8 15.5v-7l6.2 3.5-6.2 3.5Z" />
              </svg>
              <span className="underline decoration-slate-500/60 underline-offset-2">
                YouTube
              </span>
            </Link>
          </li>

          <li>
            <Link
              href="https://www.linkedin.com/company/baiaotech"
              className={baseLink}
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={linkedinIcon} alt="LinkedIn" className="h-4 w-4" />
              <span className="underline decoration-slate-500/60 underline-offset-2">
                LinkedIn
              </span>
            </Link>
          </li>
        </ul>

        {/* Para colaboradores – menos destaque e após redes */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-6 text-[13px]">
          <Link
            href={`${process.env.NEXT_PUBLIC_FORM_LINK ?? "#"}`}
            target="_blank"
            rel="noopener noreferrer"
            replace
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 underline decoration-slate-400/60 underline-offset-2"
          >
            {/* megafone */}
            <svg
              className={icon16}
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M21 8a2 2 0 0 0-2-2h-2.4l-6-3.3A2 2 0 0 0 8 4v12a2 2 0 0 0 2.6 1.8L16.6 14H19a2 2 0 0 0 2-2V8Z" />
              <path d="M7 10H3v4a3 3 0 0 0 3 3h1" />
            </svg>
            Indique evento
          </Link>

          <Link
            href={`${process.env.NEXT_PUBLIC_LEADERS_DISCORD ?? "#"}`}
            target="_blank"
            rel="noopener noreferrer"
            replace
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 underline decoration-slate-400/60 underline-offset-2"
          >
            <Image src={discordIcon} alt="Discord" className="h-4 w-4" />
            Discord dos líderes
          </Link>
        </div>

        {/* Copyright */}
        <p className="mt-6 text-center text-[11px] tracking-wide text-slate-600">
          BAIÃO TECH COMMUNITY · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
