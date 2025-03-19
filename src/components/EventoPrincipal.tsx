import Image from "next/image";
import testImage from "@/assets/blockchain.png";
import { Button } from "./ui/button";

export default function EventoPrincipal() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full h-16 flex justify-start items-center">
        <p className="text-2xl text-white font-semibold">Evento Principal</p>
      </div>

      <div className="w-full h-[350px] flex-row flex justify-start items-center bg-[#333] rounded-2xl">
        <div className="w-[65%] h-full bg-orange-500 flex justify-center items-center rounded-l-2xl">
          <Image src={testImage} alt="" />
        </div>

        <div className="w-[35%] h-full flex flex-col justify-between items-start p-2">
          <div className="w-full h-auto flex flex-col justify-start items-center">
            <div className="w-full h-auto">
              <p className="text-sm text-orange-500 font-semibold">MAR 25</p>
            </div>

            <div className="w-full h-auto">
                <p className="text-2xl text-white font-semibold">Test</p>
            </div>
          </div>

          <div className="w-full h-auto">
            <Button className="w-[200px] h-[60px] bg-orange-600 text-white text-base">Mais Detalhes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
