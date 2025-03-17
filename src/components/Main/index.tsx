import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { categorias } from "@/components/categorias";
import Image from "next/image";

export default function Main() {
  return (
    <main className="w-full flex justify-center items-start bg-stone-950">
      <div className="container h-full flex flex-col justify-center items-center">
        {/* carrossel das categorias */}
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full h-16 flex justify-start items-center">
            <p className="text-2xl text-white font-semibold">Categorias</p>
          </div>

          <Carousel className="w-full h-35 bg-slate-600 flex justify-center items-center">
            <CarouselContent>
              {categorias.map((i) => (
                <CarouselItem
                  key={i.id}
                  className="w-auto h-20 flex flex-col justify-center items-center border-2 bg-[#333] md:basis-1/2 lg:basis-1/3"
                >
                  <Image 
                    src={i.icone} 
                    alt="icone" 
                  />
                  <p>{i.nome}</p>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-black text-orange-400" />
            <CarouselNext className="bg-black text-orange-400" />
          </Carousel>
        </div>
      </div>
    </main>
  );
}
