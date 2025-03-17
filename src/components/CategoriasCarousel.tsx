import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { categorias } from "@/components/categorias";
import Image from "next/image";

export default function CategoriasCarousel() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full h-16 flex justify-start items-center">
        <p className="text-2xl text-white font-semibold">Categorias</p>
      </div>

      <Carousel className="w-full h-auto flex justify-start items-center">
        <CarouselContent className="flex">
          {categorias.map((i) => (
            <CarouselItem
              key={i.id}
              className="w-full h-full flex justify-center items-center md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
            >
              {/* Card dentro do CarouselItem */}
              <div className="w-full h-full bg-[#333] flex flex-col justify-between items-center rounded-2xl p-2">
                <div className="w-full h-24 bg-orange-500 flex justify-center items-center rounded-2xl">
                  <Image src={i.icone} alt="icone" className="w-10 h-10 object-cover" />
                </div>

                <div className="w-full h-12 flex justify-center items-center">
                  <p className="text-white text-base font-semibold">{i.nome}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-black text-orange-400" />
        <CarouselNext className="bg-black text-orange-400" />
      </Carousel>
    </div>
  );
}



{/* <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full h-16 flex justify-start items-center">
        <p className="text-2xl text-white font-semibold">Categorias</p>
      </div>

      <Carousel className="w-full h-auto flex justify-start items-center">
        <CarouselContent className="flex">
          {categorias.map((i) => (
            <CarouselItem
              key={i.id}
              className="w-full h-full flex justify-center items-center md:basis-1/3 lg:basis-1/6"
            >
              {/* Card dentro do CarouselItem 
              <div className="w-36 h-36 bg-[#333] flex flex-col justify-between items-center rounded-2xl p-2">
                <div className="w-full h-24 bg-orange-500 flex justify-center items-center rounded-2xl">
                  <Image src={i.icone} alt="icone" className="w-10 h-10" />
                </div>

                <div className="w-full h-12 flex justify-center items-center">
                  <p className="text-white text-base font-semibold">{i.nome}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-black text-orange-400" />
        <CarouselNext className="bg-black text-orange-400" />
      </Carousel>
    </div> */}
