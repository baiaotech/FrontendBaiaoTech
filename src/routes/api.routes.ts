"use server";
import { api, comunidadeApi } from "@/services/api";

export async function pegarTodosEventos() {
  try {
    const response = await api.get("/eventos");
    const data = response.data;

    if (!data) throw new Error("Erro na requisição");

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function pegarEventoPorId(id: number) {
  try {
    const response = await api.get(`/eventos/${id}`);
    const data = response.data;

    if (!data) throw new Error("Erro na requisição");

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function pegarEventoPorTitulo(titulo: string) {
  try {
    const response = await api.get(`/eventos/filter/?titulo=${titulo}`);
    const data = response.data;

    if (!data) throw new Error("Erro na requisição");

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function pegarEventoDestaque() {
  try {
    const response = await api.get("/eventos/destaque");
    const data = response.data;

    // Se vier um objeto com campo "error", retornar null
    if (data?.error) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Erro ao buscar evento em destaque:", error);
    return null; // evita que o erro quebre o frontend
  }
}

export async function filtrarEventos(
  dataEvento?: string,
  local?: string,
  organizacao?: string,
  descricao?: string,
  genero?: string,
  titulo?: string
) {
  try {
    const response = await api.get(
      `/eventos/filter/?dataEvento=${dataEvento || ""}&local=${
        local || ""
      }&organizacao=${organizacao || ""}&descricao=${descricao || ""}&genero=${
        genero || ""
      }&titulo=${titulo || ""}`
    );
    const data = response.data;

    if (!data) throw new Error("Erro na requisição");

    return data;
  } catch (error) {
    console.error("Erro ao filtrar eventos:", error);
  }
}

export async function filtrarEventoPorPesquisa(termo: string) {
  try {
    const response = await api.get(
      `/eventos/search/${termo ? `?q=${termo}` : ""}`
    );

    const data = response.data;

    if (!data) throw new Error("Erro na requisição");

    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return [];
  }
}

export async function filtrarEventoPorGenero(genero: string) {
  try {
    const response = await api.get(`/eventos/filter/?genero=${genero}`);
    const data = response.data;

    if (!data) throw new Error("Erro na requisição");

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function filtrarEventoPorTitulo(titulo: string) {
  try {
    const response = await api.get(`/eventos/filter/?titulo=${titulo}`);
    const data = response.data;

    if (!data) throw new Error("Erro na requisição");

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function criarEvento() {
  try {
    const response = await api.post("/eventos/novo");
    const data = response.data;

    if (!data) throw new Error("Erro na requisição");

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function editarEvento(id: number) {
  try {
    const response = await api.put(`/eventos/edit/${id}`);
    const data = response.data;

    if (!data) throw new Error("Erro na requisição");

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function atualizarEvento(id: number) {
  try {
    const response = await api.patch(`/eventos/edit/${id}`);
    const data = response.data;

    if (!data) throw new Error("Erro na requisição");

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function deletarEvento(id: number) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("ID inválido para deleção de evento");
  }
  try {
    const response = await api.delete(`/eventos/delete/${id}`);
    const data = response.data;

    if (!data) throw new Error("Erro na requisição");

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function pegarTodasAsComunidades() {
  try {
    const response = await comunidadeApi.get(
      `${process.env.NEXT_PUBLIC_COMMUNITY_API_URL}`
    );
    const data = response.data;

    if (!data) throw new Error("Erro na requisição");

    return data;
  } catch (error) {
    console.error("Erro ao buscar comunidades:", error);
    return [];
  }
}
