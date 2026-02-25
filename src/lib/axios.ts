import axios, { AxiosError } from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,//10 seconds
});

/*api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);*/

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Lógica de logout ou refresh token
            console.error('Não autorizado. Redirecionando...');
        }
        return Promise.reject(error);
    }
);

/**
 * Esta aqui para servir de exemplo de como fazer chamadas tipadas
 *  async function getUsers() {
    try {
     // Chamada tipada
     const { data } = await api.get<User[]>('/users');
     return data;
   } catch (error) {
     // O Next.js recomenda deixar o erro subir para o closest error.js
     throw error;
   }
 }
 */
