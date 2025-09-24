export interface Evento {
  id: number;
  titulo: string;
  data?: string; // manter para compatibilidade
  data_inicio: string;
  data_fim: string;
  local: string;
  organizacao: string;
  valor: number | string;
  link_compra: string;
  descricao: string;
  genero: string;
  cover_photo_url: string;
  is_featured?: boolean;
  priority_level?: number;
}

export interface Comunidade {
  id: number;
  nome: string;
  descricao: string | null;
  estado: string | null;
  url_site: string | null;
  url_insta: string | null;
  url_facebook: string | null;
  url_linkedin: string | null;
  url_twitter: string | null;
  url_telegram: string | null;
  url_whatsapp: string | null;
  cover_photo_url: string | null;
}