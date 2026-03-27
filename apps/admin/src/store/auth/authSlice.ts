import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginThunk, refreshThunk, logoutThunk } from "./authThunks";

export enum AuthStatus {
  Idle = "idle",
  Loading = "loading",
  Authenticated = "authenticated",
  Unauthenticated = "unauthenticated",
}

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  status: AuthStatus;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  status: AuthStatus.Idle,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ accessToken: string; user: AuthUser }>) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.status = AuthStatus.Authenticated;
    },
    clearAuth(state) {
      state.accessToken = null;
      state.user = null;
      state.status = AuthStatus.Unauthenticated;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.status = AuthStatus.Authenticated;
      })
      .addCase(refreshThunk.pending, (state) => {
        state.status = AuthStatus.Loading;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.status = AuthStatus.Authenticated;
      })
      .addCase(refreshThunk.rejected, (state) => {
        state.accessToken = null;
        state.user = null;
        state.status = AuthStatus.Unauthenticated;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.accessToken = null;
        state.user = null;
        state.status = AuthStatus.Unauthenticated;
      });
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
