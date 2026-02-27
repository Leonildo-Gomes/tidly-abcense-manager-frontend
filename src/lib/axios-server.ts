import { auth } from '@clerk/nextjs/server';
import axios, { AxiosError } from 'axios';

export const apiServer = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

apiServer.interceptors.request.use(
    async (config) => {
        try {
            const { getToken } = await auth();
            const token = await getToken();
            console.log("Token:", token);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('[apiServer] Error getting authentication token:', error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiServer.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            console.error('[apiServer] Unauthorized call from server.');
        }
        return Promise.reject(error);
    }
);
