import axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import { tokenStore } from "../auth/token";
import { refreshClient } from "./refreshClient";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ??
    "http://localhost:8000/api/v1",

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});


// Attach access token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStore.get();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
);


let refreshPromise: Promise<string> | null = null;


async function refreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post<{ access_token: string }>("/auth/refresh")
      .then((response) => {
        const newToken = response.data.access_token;

        tokenStore.set(newToken);

        return newToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}


// Handle expired access token
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const newToken = await refreshAccessToken();

      originalRequest.headers.Authorization =
        `Bearer ${newToken}`;

      return api(originalRequest);

    } catch (refreshError) {
      tokenStore.clear();

      return Promise.reject(refreshError);
    }
  },
);