import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; BaiaoTech/1.0)",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    },
    timeout: 10000, // 10 seconds timeout
    withCredentials: false, // Disable credentials for CORS
});