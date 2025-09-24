import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { formatEventPeriod } from "@/lib/utils";

type Props = {
  open: boolean;
  onClose: () => void;
  url: string;
  isMobile?: boolean;
  evento?: {
    titulo?: string;
    data?: string;
    data_inicio?: string;
    data_fim?: string;
    local?: string;
    organizacao?: string;
    link_compra?: string;
    valor?: string;
  };
};

export default function ShareModal({ open, onClose, url, isMobile, evento }: Props) {
  // Só renderiza se estiver aberto
  if (!open) return null;

  // Função para criar o texto de compartilhamento
  const criarTextoCompartilhamento = () => {
    if (!evento) return url;

    const { titulo, data, data_inicio, data_fim, local, organizacao, valor } = evento;

    let texto = `🎉 *${titulo || 'Evento'}*\n\n`;

    const dataTexto = (() => {
      if (data_inicio || data_fim) {
        const periodo = formatEventPeriod(data_inicio, data_fim);
        if (periodo && periodo.trim().length > 0) {
          return periodo;
        }
        return data_inicio || data_fim || data || "";
      }
      return data || "";
    })();

    if (dataTexto) {
      texto += `📅 *Quando:* ${dataTexto}\n`;
    }

    if (local) {
      texto += `📍 *Local:* ${local}\n`;
    }

    if (organizacao) {
      texto += `🏢 *Organização:* ${organizacao}\n`;
    }

    if (valor) {
      const valorTexto = valor === "0.00" || valor === "0" ? "Grátis" :
                        valor === "1.00" || valor === "1" ? "Em breve" :
                        `R$ ${valor}`;
      texto += `💰 *Valor:* ${valorTexto}\n`;
    }

    texto += `\n🔗 *Veja no Baião Tech:* ${url}\n`;
    
    texto += `\n📲 Participe também:\n`;

    texto += `\n🔗 *Canal no WhatsApp:* https://canal.baiaotech.org/`;
    texto += `\n🔗 *Grupo no Whatsapp:* https://whatsapp.baiaotech.org/`;

    return texto;
  };

    const handleCopyToClipboard = async () => {
        // Verifica se a Clipboard API está disponível
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(url);
                alert("Link copiado!");
                onClose();
            } catch (error) {
                console.error("Erro ao copiar para clipboard:", error);
                // Fallback: tentar usar o método antigo
                fallbackCopyToClipboard(url);
            }
        } else {
            // Fallback para navegadores que não suportam Clipboard API
            fallbackCopyToClipboard(url);
        }
    };

    const fallbackCopyToClipboard = (text: string) => {
        // Método alternativo usando textarea temporária
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                alert("Link copiado!");
                onClose();
            } else {
                alert("Não foi possível copiar o link. Copie manualmente: " + text);
            }
        } catch (error) {
            console.error("Erro no fallback de cópia:", error);
            alert("Não foi possível copiar o link. Copie manualmente: " + text);
        }

        document.body.removeChild(textArea);
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Evento",
                    url,
                });
                onClose();
            } catch (error) {
                console.error("Erro no compartilhamento nativo:", error);
                // Fallback para cópia
                await handleCopyToClipboard();
            }
        } else {
            // Fallback para cópia se compartilhamento nativo não estiver disponível
            await handleCopyToClipboard();
        }
    };

  return (
    <div
      className="fixed inset-0 z-50 bg-white/20 backdrop-blur"
      style={{ backdropFilter: "blur(7.5px)" }}
    >
      {/* Desktop modal */}
      {!isMobile && (
        <div className="flex items-center justify-center h-full">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4 w-full max-w-xs relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-orange-500"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>
            <h2 className="text-lg font-bold mb-2">Compartilhar evento</h2>
            {/* ...botões de compartilhamento... */}
            <button
              className="flex items-center gap-2 p-3 rounded bg-green-500 text-white hover:bg-green-600 justify-center"
              onClick={() =>
                window.open(
                  `https://wa.me/?text=${encodeURIComponent(criarTextoCompartilhamento())}`,
                  "_blank"
                )
              }
            >
              <FontAwesomeIcon icon={faWhatsapp} />
              
            </button>
            <button
                className="flex items-center gap-2 p-3 rounded bg-black text-white hover:bg-gray-800 justify-center"
                onClick={() =>
                    window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
                    "_blank"
                    )
                }
                >
                <FontAwesomeIcon icon={faXTwitter} />
                
            </button>
            <button
            className="flex items-center gap-2 p-3 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 justify-center"
            onClick={handleNativeShare}
            >
            <FontAwesomeIcon icon={faShareNodes} />
            Compartilhar
            </button>
          </div>
        </div>
      )}
      {/* Mobile sheet */}
      {isMobile && (
        <div className="fixed left-0 bottom-0 w-full z-50 animate-slideUpSheet">
          <div className="bg-white rounded-t-2xl shadow-lg p-6 flex flex-col gap-4 w-full max-w-lg mx-auto relative">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-orange-500"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>
            <h2 className="text-lg font-bold mb-2 text-center">Compartilhar evento</h2>
            <button
              className="flex items-center gap-2 p-3 rounded bg-green-500 text-white hover:bg-green-600 justify-center"
              onClick={() =>
                window.open(
                  `https://wa.me/?text=${encodeURIComponent(criarTextoCompartilhamento())}`,
                  "_blank"
                )
              }
            >
              <FontAwesomeIcon icon={faWhatsapp} />
              WhatsApp
            </button>
            <button
                className="flex items-center gap-2 p-3 rounded bg-black text-white hover:bg-gray-800 justify-center"
                onClick={() =>
                    window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
                    "_blank"
                    )
                }
                >
                <FontAwesomeIcon icon={faXTwitter} />
                
            </button>
            <button
            className="flex items-center gap-2 p-3 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 justify-center"
            onClick={handleNativeShare}
            >
            <FontAwesomeIcon icon={faShareNodes} />
            Compartilhar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}