import axios from "axios";

export const api = axios.create({
    baseURL: "http://147.93.32.119:8000/swagger/",
    headers: {
        "Content-Type": "application/json",
    },
})