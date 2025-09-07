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
    console.log("Fetching all events from API");
    let allResults: any[] = [];
    let nextUrl: string | null = "/eventos/";
    
    while (nextUrl) {
      const response = await api.get(nextUrl);
      console.log("Response status:", response.status);
      const data = response.data;
      console.log("Response data:", data);
      
      if (data && typeof data === 'object' && 'results' in data) {
        const paginatedData = data as PaginatedResponse<any>;
        allResults = allResults.concat(paginatedData.results || []);
        nextUrl = paginatedData.next ? paginatedData.next.replace(/^http:/, 'https:') : null;
        console.log("Fetched", paginatedData.results?.length || 0, "events, next:", nextUrl);
      } else if (Array.isArray(data)) {
        allResults = allResults.concat(data);
        nextUrl = null;
        console.log("Fetched array of", data.length, "events");
      } else {
        console.warn("filtrarEventoPorPesquisa: formato de resposta inesperado", data);
        break;
      }
    }
    
    console.log("Total events fetched:", allResults.length);
    return allResults;
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    return [];
  }
}

export async function pegarEventoPorId(id: number) {
  try {
    const response = await api.get(`/eventos/${id}/`);
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
    const queryParams = new URLSearchParams({
      data: dataEvento || "",
      local: local || "",
      organizacao: organizacao || "",
      descricao: descricao || "",
      genero: genero || "",
      titulo: titulo || ""
    }).toString();
    
    let allResults: any[] = [];
    let nextUrl: string | null = `/eventos/filter/?${queryParams}`;
    
    while (nextUrl) {
      const response = await api.get(nextUrl);
      const data = response.data;
      
      if (data && typeof data === 'object' && 'results' in data) {
        const paginatedData = data as PaginatedResponse<any>;
        allResults = allResults.concat(paginatedData.results || []);
        nextUrl = paginatedData.next ? paginatedData.next.replace(/^http:/, 'https:') : null;
      } else if (Array.isArray(data)) {
        allResults = allResults.concat(data);
        nextUrl = null;
      } else {
        console.warn("filtrarEventos: formato de resposta inesperado", data);
        break;
      }
    }
    
    return allResults;
  } catch (error) {
    console.error("Erro ao filtrar eventos:", error);
    return [];
  }
}

export async function filtrarEventoPorPesquisa(termo: string) {
  try {
    let allResults: any[] = [];
    let nextUrl: string | null = `/eventos/search${termo ? `?q=${termo}` : ""}`;
    
    while (nextUrl) {
      const response = await api.get(nextUrl);
      const data = response.data;
      
      if (data && typeof data === 'object' && 'results' in data) {
        const paginatedData = data as PaginatedResponse<any>;
        allResults = allResults.concat(paginatedData.results || []);
        nextUrl = paginatedData.next;
      } else if (Array.isArray(data)) {
        allResults = allResults.concat(data);
        nextUrl = null;
      } else {
        console.warn("filtrarEventoPorPesquisa: formato de resposta inesperado", data);
        break;
      }
    }
    
    return allResults;
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
