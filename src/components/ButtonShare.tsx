"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import type { Evento } from "@/types";
export default function ButtonShare({ evento }: { evento: Evento }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href); // pega a URL atual do evento
    }
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: evento.titulo,
          text: `Confira este evento: ${evento.titulo} em ${evento.local}`,
          url,
        });
      } catch (error) {
        console.error("Erro ao compartilhar:", error);
      }
    } else {
      alert("Compartilhamento nativo não suportado neste dispositivo 😕");
    }
  };

  return (
    <Button
      onClick={handleShare}
      className="p-2.5 bg-slate-900 text-white text-base rounded-lg capitalize hover:bg-orange-600 transition-colors duration-300"
    >
      Compartilhar evento
    </Button>
  );
}
