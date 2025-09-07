import { api } from "@/services/api";

// Interface para resposta paginada da API
interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

// Função utilitária para extrair dados de resposta paginada
function extractDataFromResponse<T = unknown>(data: unknown): T[] {
  if (data && typeof data === 'object' && 'results' in data) {
    // Resposta paginada
    const paginatedData = data as PaginatedResponse<T>;
    return Array.isArray(paginatedData.results) ? paginatedData.results : [];
  } else if (Array.isArray(data)) {
    // Resposta direta como array
    return data;
  } else {
    console.warn("extractDataFromResponse: formato de resposta inesperado", data);
    return [];
  }
}

export async function pegarTodosEventos() {
  try {
    const response = await api.get("/eventos/");
    const data = response.data;
    return extractDataFromResponse(data);
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    return []; // Sempre retorna array vazio em caso de erro
  }
}

export async function pegarEventoPorId(id: number) {
  try {
    const response = await api.get(`/eventos/edit/${id}/`);
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
    const response = await api.get("/eventos/destaque/");

    // Verifica se a API retornou que não há evento destacado
    if (response.data?.status === "no_featured_event") {
      return {
        data: null,
        status: 404 // Trata como "não encontrado" para o frontend
      };
    }

    // Retorna tanto os dados quanto o status da resposta
    return {
      data: response.data,
      status: response.status
    };
  } catch (error: unknown) {
    console.error("Erro ao buscar evento em destaque:", error);
    // Retorna o status de erro se houver
    const axiosError = error as { response?: { status?: number } };
    return {
      data: null,
      status: axiosError.response?.status || 500
    };
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
      `/eventos/filter/?data=${dataEvento || ""}&local=${
        local || ""
      }&organizacao=${organizacao || ""}&descricao=${descricao || ""}&genero=${
        genero || ""
      }&titulo=${titulo || ""}`
    );
    const data = response.data;
    return extractDataFromResponse(data);
  } catch (error) {
    console.error("Erro ao filtrar eventos:", error);
    return [];
  }
}

export async function filtrarEventoPorPesquisa(termo: string) {
  try {
    const response = await api.get(
      `/eventos/search${termo ? `?q=${termo}` : ""}`
    );
    const data = response.data;
    return extractDataFromResponse(data);
  } catch (error) {
    console.error("Erro na requisição:", error);
    return [];
  }
}

export async function filtrarEventoPorGenero(genero: string) {
  try {
    const response = await api.get(`/eventos/filter/?genero=${genero}`);
    const data = response.data;
    return extractDataFromResponse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function filtrarEventoPorTitulo(titulo: string) {
  try {
    const response = await api.get(`/eventos/filter/?titulo=${titulo}`);
    const data = response.data;
    return extractDataFromResponse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function criarEvento() {
  try {
    const response = await api.post("/eventos/novo/");
    const data = response.data;

    if (!data) throw new Error("Erro na requisição");

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function editarEvento(id: number) {
  try {
    const response = await api.put(`/eventos/edit/${id}/`);
    const data = response.data;

    if (!data) throw new Error("Erro na requisição");

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function atualizarEvento(id: number) {
  try {
    const response = await api.patch(`/eventos/edit/${id}/`);
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
    const response = await api.delete(`/eventos/delete/${id}/`);
    const data = response.data;

    if (!data) throw new Error("Erro na requisição");

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function pegarTodasAsComunidades() {
  try {
    const response = await api.get("/comunidades/");
    const data = response.data;
    return extractDataFromResponse(data);
  } catch (error) {
    console.error("Erro ao buscar comunidades:", error);
    return [];
  }
}
