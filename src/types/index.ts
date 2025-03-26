export interface Evento {
  id: number;
  titulo: string;
  data: string;
  local: string;
  organizacao: string;
  valor: number;
  link_compra: string;
  descricao: string;
  genero: string;
  cover_photo_url: string;
}

export interface Comunidade {
  id: number;
  nome: string;
  descricao: string;
  url_site: string;
  url_insta: string;
}