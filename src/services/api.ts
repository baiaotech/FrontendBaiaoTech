import axios from "axios";

export const api = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

export const comunidadeApi = axios.create({
    baseURL: process.env.COMMUNITY_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
})