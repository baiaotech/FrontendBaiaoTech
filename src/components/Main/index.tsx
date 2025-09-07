import ComunidadesCarousel from "@/components/ComunidadesCarousel";
import CategoriasCarousel from "@/components/CategoriasCarousel";
import ProximosEventos from "@/components/proximosEventos";
import EventoPrincipal from "@/components/EventoPrincipal";

export default function Main() {
  return (
    <main className="w-full flex justify-center items-start p-5">
      <div className="container max-w-7xl h-full flex flex-col justify-start items-start">
        <ComunidadesCarousel />
        <CategoriasCarousel />
        <ProximosEventos />
        <EventoPrincipal />
      </div>
    </main>
  );
}
