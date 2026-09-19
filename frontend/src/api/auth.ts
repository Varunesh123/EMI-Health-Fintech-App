import { api } from "./client";

import type {
  LoginPayload,
  RegisterPayload,
  TokenResponse,
  User,
} from "../types/auth";


export const authApi = {

  async register(
    data: RegisterPayload,
  ): Promise<User> {

    const response =
      await api.post<User>(
        "/auth/register",
        data,
      );

    return response.data;
  },


  async login(
    data: LoginPayload,
  ): Promise<TokenResponse> {

    const response =
      await api.post<TokenResponse>(
        "/auth/login",
        data,
      );

    return response.data;
  },


  async me(): Promise<User> {

    const response =
      await api.get<User>(
        "/auth/me",
      );

    return response.data;
  },


  async refresh(): Promise<TokenResponse> {

    const response =
      await api.post<TokenResponse>(
        "/auth/refresh",
      );

    return response.data;
  },


  async logout(): Promise<void> {

    await api.post(
      "/auth/logout",
    );
  },
};