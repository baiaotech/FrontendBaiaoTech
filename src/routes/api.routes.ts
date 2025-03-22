import { api } from "@/services/api";

const msgErroRequisicao = "Problema na requisição com a API"

export async function pegarTodosEventos() {
    try {
        const response = await api.get("/eventos");
        const data = response.data;
        
        if(!data) throw msgErroRequisicao;

        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function pegarEventoPorId(id: number) {
    try {
        const response = await api.get(`/eventos/delete/${id}`);
        const data = response.data;

        if(!data) throw msgErroRequisicao;

        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function filtrarEventos(dataEvento: string, local: string, organizacao: string, descricao: string, genero: string) {
    try {
        const response = await api.get(`/eventos/filter/?data=${dataEvento}&local=${local}&organizacao=${organizacao}&descricao=${descricao}&genero=${genero}`);
        const data = response.data;

        if(!data) throw msgErroRequisicao;

        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function criarEvento() {
    try {
        const response = await api.post("/eventos/novo");
        const data = response.data;

        if(!data) throw msgErroRequisicao;

        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function editarEvento(id: number) {
    try {
        const response = await api.put(`/eventos/edit/${id}`)
        const data = response.data;

        if(!data) throw msgErroRequisicao;

        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function atualizarEvento(id: number) {
    try {
        const response = await api.patch(`/eventos/edit/${id}`);
        const data = response.data;

        if(!data) throw msgErroRequisicao;

        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function deletarEvento(id: number) {
    try {
        const response = await api.delete(`/eventos/delete/${id}`);
        const data = response.data;

        if(!data) throw msgErroRequisicao;

        return data;
    } catch (error) {
        console.error(error);
    }
}