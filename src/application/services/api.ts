import { Assets } from "@/domain/types/assets/AssetsProps";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            console.log('Bagaço');
        }
        return Promise.reject(error);
    }
);

export async function getAssets(): Promise<Assets[]> {
    const response = await api.get("/assets")
    return response.data;
}



export default api;
