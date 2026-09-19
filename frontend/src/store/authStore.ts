import { create } from "zustand";

import { authApi } from "../api/auth";
import { tokenStore } from "../auth/token";

import type {
  LoginPayload,
  RegisterPayload,
  User,
} from "../types/auth";


interface AuthState {
  user: User | null;
  accessToken: string | null;

  isLoading: boolean;
  isAuthenticated: boolean;

  login: (data: LoginPayload) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}


export const useAuthStore = create<AuthState>(
  (set) => ({

    user: null,

    accessToken: null,

    isLoading: true,

    isAuthenticated: false,


    async login(data) {

      const tokenResponse =
        await authApi.login(data);

      tokenStore.set(
        tokenResponse.access_token,
      );

      set({
        accessToken:
          tokenResponse.access_token,
      });


      const user =
        await authApi.me();

      set({
        user,
        isAuthenticated: true,
      });
    },


    async register(data) {

      await authApi.register(data);

      await this.login({
        email: data.email,
        password: data.password,
      });
    },


    async logout() {

      try {
        await authApi.logout();

      } finally {

        tokenStore.clear();

        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        });
      }
    },


    async initialize() {

      try {

        const tokenResponse =
          await authApi.refresh();

        tokenStore.set(
          tokenResponse.access_token,
        );

        set({
          accessToken:
            tokenResponse.access_token,
        });


        const user =
          await authApi.me();

        set({
          user,
          isAuthenticated: true,
        });

      } catch {

        tokenStore.clear();

        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        });

      } finally {

        set({
          isLoading: false,
        });
      }
    },
  }),
);