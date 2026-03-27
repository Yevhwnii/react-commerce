import axios from "axios";
import { jwtDecode } from "jwt-decode";
import type { AppStore } from "../store";
import { setAuth, clearAuth } from "../store/auth/authSlice";

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

let store: AppStore;

export function injectStore(_store: AppStore) {
  store = _store;
}

export const apiClient = axios.create({
  baseURL: "http://localhost:3002",
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const { data } = await axios.post<{ accessToken: string }>(
          "http://localhost:3002/auth/refresh",
          {},
          { withCredentials: true }
        );
        const { sub, email, role } = jwtDecode<JwtPayload>(data.accessToken);
        store.dispatch(setAuth({ accessToken: data.accessToken, user: { id: sub, email, role } }));
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return apiClient(original);
      } catch {
        store.dispatch(clearAuth());
      }
    }

    return Promise.reject(error);
  }
);
