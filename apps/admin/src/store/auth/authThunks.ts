import { createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { apiClient } from "../../api/client";

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

function userFromToken(token: string) {
  const { sub, email, role } = jwtDecode<JwtPayload>(token);
  return { id: sub, email, role };
}

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    const { data } = await apiClient.post<{ accessToken: string }>("/auth/login", credentials);
    return { accessToken: data.accessToken, user: userFromToken(data.accessToken) };
  }
);

export const refreshThunk = createAsyncThunk("auth/refresh", async () => {
  const { data } = await apiClient.post<{ accessToken: string }>("/auth/refresh");
  return { accessToken: data.accessToken, user: userFromToken(data.accessToken) };
});

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  try {
    await apiClient.post("/auth/logout");
  } catch {
    // server error still results in client-side logout
  }
});
