// Author: Alejandro Arteaga
import { defineStore } from 'pinia';
import type { UserInterface } from '@/interfaces/UserInterface';

type AuthState = {
  token: string | null;
  user: UserInterface | null;
};

const TOKEN_KEY = 'accessToken';
const USER_KEY = 'authUser';

function readStoredUser(): UserInterface | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as UserInterface;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem(TOKEN_KEY),
    user: readStoredUser(),
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token && state.user),
    isAdmin: (state) => state.user?.role === 'admin',
    authHeaders: (state) =>
      state.token
        ? {
            Authorization: `Bearer ${state.token}`,
          }
        : {},
  },
  actions: {
    setSession(token: string, user: UserInterface) {
      this.token = token;
      this.user = user;
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    },
    setUser(user: UserInterface) {
      this.user = user;
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    },
    clearSession() {
      this.token = null;
      this.user = null;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    },
  },
});