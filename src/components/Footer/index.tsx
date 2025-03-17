import Link from "next/link";
import discordIcon from "@/assets/discord.svg";
import instagramIcon from "@/assets/instagram.svg";
import twitterIcon from "@/assets/twitter.svg";
import linkedinIcon from "@/assets/linkedin.svg";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full flex justify-center items-center bg-[#333]">
      <div className="w-full max-w-[1200px] p-5 flex flex-col justify-between items-center">
        {/* <!-- Top Section --> */}
        <div className="w-full h-[100px] border-b border-[#555] flex flex-row justify-start items-center">
          <div className="flex justify-center items-center">
            <Link href="/" className="text-2xl font-bold leading-[1.5] text-white uppercase tracking-[1px]">
              Baião <span className="text-orange-500">Tech</span>
            </Link>
          </div>
        </div>

        {/* <!-- Middle Section --> */}
        <div className="w-full my-12 flex flex-wrap justify-between items-start gap-5">
          {/* <!-- Events --> */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[12px] font-bold text-white uppercase tracking-[1px]">Encontre Eventos</h4>
            <ul className="flex flex-col gap-1">
              <li><Link href="/" className="text-[10px] text-gray-400 uppercase hover:text-orange-500">Hoje</Link></li>
              <li><Link href="/" className="text-[10px] text-gray-400 uppercase hover:text-orange-500">Amanhã</Link></li>
              <li><Link href="/" className="text-[10px] text-gray-400 uppercase hover:text-orange-500">Esta semana</Link></li>
              <li><Link href="/" className="text-[10px] text-gray-400 uppercase hover:text-orange-500">Este fim de semana</Link></li>
              <li><Link href="/" className="text-[10px] text-gray-400 uppercase hover:text-orange-500">Próxima semana</Link></li>
              <li><Link href="/" className="text-[10px] text-gray-400 uppercase hover:text-orange-500">Este mês</Link></li>
            </ul>
          </div>

          {/* <!-- Categories --> */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[12px] font-bold text-white uppercase tracking-[1px]">Categorias</h4>
            <ul className="flex flex-col gap-1">
              <li><Link href="/" className="text-[10px] text-gray-400 uppercase hover:text-orange-500">Frontend</Link></li>
              <li><Link href="/" className="text-[10px] text-gray-400 uppercase hover:text-orange-500">Backend</Link></li>
              <li><Link href="/" className="text-[10px] text-gray-400 uppercase hover:text-orange-500">Mobile</Link></li>
              <li><Link href="/" className="text-[10px] text-gray-400 uppercase hover:text-orange-500">DevOps</Link></li>
              <li><Link href="/" className="text-[10px] text-gray-400 uppercase hover:text-orange-500">Analise de Dados</Link></li>
              <li><Link href="/" className="text-[10px] text-gray-400 uppercase hover:text-orange-500">IA</Link></li>
              <li><Link href="/" className="text-[10px] text-gray-400 uppercase hover:text-orange-500">UI/UX</Link></li>
              <li><Link href="/" className="text-[10px] text-gray-400 uppercase hover:text-orange-500">Gestão de Projetos</Link></li>
              <li><Link href="/" className="text-[10px] text-gray-400 uppercase hover:text-orange-500">Marketing</Link></li>
              <li><Link href="/" className="text-[10px] text-gray-400 uppercase hover:text-orange-500">Inovação & Gestão</Link></li>
              <li><Link href="/" className="text-[10px] text-gray-400 uppercase hover:text-orange-500">Games</Link></li>
            </ul>
          </div>

          {/* <!-- Collaborator --> */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[12px] font-bold text-white uppercase tracking-[1px]">Para Colaboradores</h4>
            <ul className="flex flex-col gap-1">
              <li><Link href="/" className="text-[10px] text-gray-400 uppercase hover:text-orange-500">Indique seu evento</Link></li>
              <li><Link href="/" className="text-[10px] text-gray-400 uppercase hover:text-orange-500">Entre no Discord</Link></li>
            </ul>
          </div>
        </div>

        {/* <!-- Bottom Section --> */}
        <div className="w-full h-[120px] border-t border-[#555] flex flex-col justify-start items-center">
          <div className="w-full mt-5 flex flex-wrap justify-between items-center gap-5">
            <div className="flex flex-row gap-8">
              <Link href="/" className="text-[10px] text-gray-400 uppercase hover:text-orange-500">Home</Link>
              <Link href="/" className="text-[10px] text-gray-400 uppercase hover:text-orange-500">Termos e Políticas</Link>
              <Link href="/" className="text-[10px] text-gray-400 uppercase hover:text-orange-500">Ética e conduta</Link>
              <Link href="/" className="text-[10px] text-gray-400 uppercase hover:text-orange-500">Política de Direitos Humanos</Link>
            </div>
            <div className="flex flex-row gap-8">
              <Link href="/">
                <Image className="w-5 h-5" src={discordIcon} alt="discord icon" />
              </Link>
              <Link href="/">
                <Image className="w-5 h-5" src={instagramIcon} alt="discord icon" />
              </Link>
              <Link href="/">
                <Image className="w-5 h-5" src={twitterIcon} alt="discord icon" />
              </Link>
              <Link href="/">
                <Image className="w-5 h-5" src={linkedinIcon} alt="discord icon" />
              </Link>
            </div>
          </div>
          <div className="w-full h-[50px] mt-5 flex justify-start items-center">
            <p className="text-[10px] text-gray-400 uppercase">Baião Tech Community. © Copyright 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
