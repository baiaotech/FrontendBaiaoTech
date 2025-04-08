"use server"
import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const comunidadeApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_COMMUNITY_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
});