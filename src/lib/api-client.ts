import { redirect } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

type FetchOptions = RequestInit & {
  headers?: Record<string, string>;
};

export class ApiError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchWrapper<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      // TODO: Handle unauthorized (e.g., redirect to login or refresh token)
      // redirect("/auth/login");
    }
    
    // Tentativa de ler a mensagem de erro da API, se existir
    let errorMessage = `Erro na requisição: ${response.status} ${response.statusText}`;
    try {
      const errorBody = await response.json();
      if (errorBody.message) {
        errorMessage = errorBody.message;
      }
    } catch {
      // Ignora erro de parse do JSON
    }

    throw new ApiError(response.status, errorMessage);
  }

  // Se o conteúdo for 204 No Content, retorna null
  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string, options?: FetchOptions) => 
    fetchWrapper<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
    fetchWrapper<T>(endpoint, { 
      ...options, 
      method: "POST", 
      body: JSON.stringify(body) 
    }),

  put: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
    fetchWrapper<T>(endpoint, { 
      ...options, 
      method: "PUT", 
      body: JSON.stringify(body) 
    }),

  patch: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
    fetchWrapper<T>(endpoint, { 
      ...options, 
      method: "PATCH", 
      body: JSON.stringify(body) 
    }),

  delete: <T>(endpoint: string, options?: FetchOptions) =>
    fetchWrapper<T>(endpoint, { ...options, method: "DELETE" }),
};
