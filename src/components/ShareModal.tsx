import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

type Props = {
  open: boolean;
  onClose: () => void;
  url: string;
  isMobile?: boolean;
};

export default function ShareModal({ open, onClose, url, isMobile }: Props) {
    const router = useRouter();

    const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Evento",
          url,
        });
        onClose();
      } catch (error) {
        
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copiado!");
      onClose();
    }
  };
    
  if (!open) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-40`}
      style={{}}
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
                  `https://wa.me/?text=${encodeURIComponent(url)}`,
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
                  `https://wa.me/?text=${encodeURIComponent(url)}`,
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