import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";
import imageTest from "@/assets/front-end.png";

export default function ProximosEventos() {
  const evento = [
    {
      id: 1,
      nome: "Frontend Day",
      imagem: imageTest,
      data: "MAR 25",
      localizacao: "UniChristus - Fortaleza, CE",
    },
    {
      id: 2,
      nome: "Frontend Day",
      imagem: imageTest,
      data: "MAR 25",
      localizacao: "UniChristus - Fortaleza, CE",
    },
    {
      id: 3,
      nome: "Frontend Day",
      imagem: imageTest,
      data: "MAR 25",
      localizacao: "UniChristus - Fortaleza, CE",
    },
    {
      id: 4,
      nome: "Frontend Day",
      imagem: imageTest,
      data: "MAR 25",
      localizacao: "UniChristus - Fortaleza, CE",
    },
  ];

  return (
    <div className="w-full flex flex-col justify-center items-center my-10">
      <div className="w-full h-16 flex justify-start items-center">
        <p className="text-2xl text-white font-semibold">Próximos Eventos</p>
      </div>

      <Carousel className="w-full h-auto flex justify-start items-center">
        <CarouselContent className="-ml-2 md:-ml-4">
          {evento.map((i) => (
            <CarouselItem
              className="w-full h-full md:basis-1/3 lg:basis-1/4"
              key={i.id}
            >
              <div className="w-[300px] h-[176px] bg-[#333] flex flex-col justify-between items-center rounded-2xl p-2">
                <div className="w-full h-28 bg-orange-500 flex justify-center items-center rounded-2xl">
                  <Image
                    src={i.imagem}
                    alt="icone"
                    className="w-10 h-10 object-cover"
                  />
                </div>

                <div className="w-full h-20 flex flex-col justify-center items-center gap-1">
                  <div className="w-full h-auto flex justify-start items-center">
                    <p className="text-xs text-orange-500 font-semibold">
                      {i.data}
                    </p>
                  </div>

                  <div className="w-full h-auto flex justify-start items-center">
                    <p className="text-sm text-white font-semibold">{i.nome}</p>
                  </div>

                  <div className="w-full h-auto flex justify-start items-center">
                    <p className="text-xs text-white font-semibold">
                      {i.localizacao}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
          {/* <CarouselItem className="pl-2 md:pl-4">...</CarouselItem>
          <CarouselItem className="pl-2 md:pl-4">...</CarouselItem> */}
        </CarouselContent>
        <CarouselPrevious className="bg-black text-orange-400" />
        <CarouselNext className="bg-black text-orange-400" />
      </Carousel>
    </div>
  );
}
