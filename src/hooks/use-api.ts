"use client"
import { api } from "@/lib/axios";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
export function useApi() {
    const { getToken } = useAuth();

    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(
            async (config) => {
                const token = await getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => { return Promise.reject(error); }
        )
        return () => {
            api.interceptors.request.eject(requestInterceptor);
        }
    }, [getToken]);

    return api;

}