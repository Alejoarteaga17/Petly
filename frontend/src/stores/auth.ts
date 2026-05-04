// Author: Alejandro Arteaga
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { UserInterface } from '@/interfaces/UserInterface';

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

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY));
  const user = ref<UserInterface | null>(readStoredUser());

  const isAuthenticated = computed(() => Boolean(token.value && user.value));
  const isAdmin = computed(() => user.value?.role === 'admin');
  const authHeaders = computed(() =>
    token.value
      ? {
          Authorization: `Bearer ${token.value}`,
        }
      : {},
  );

  function setSession(sessionToken: string, sessionUser: UserInterface) {
    token.value = sessionToken;
    user.value = sessionUser;
    localStorage.setItem(TOKEN_KEY, sessionToken);
    localStorage.setItem(USER_KEY, JSON.stringify(sessionUser));
  }

  function setUser(nextUser: UserInterface) {
    user.value = nextUser;
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
  }

  function clearSession() {
    token.value = null;
    user.value = null;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  return {
    token,
    user,
    isAuthenticated,
    isAdmin,
    authHeaders,
    setSession,
    setUser,
    clearSession,
  };
});
