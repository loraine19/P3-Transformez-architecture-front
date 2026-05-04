import { create } from 'zustand';
import { tokenStorage } from '../api/tokenStorage';
import type { User } from '../types/entities';

/* IAUTH STATE */
interface IAuthState {
  user: User | null;
  token: string | null;
}

/* IAUTH ACTIONS */
interface IAuthActions {
  setAuth(data: { user: User; token: string }): void;
  clearAuth(): void;
}

/* AUTH STORE */
const useAuthStore = create<IAuthState & IAuthActions>((set) => ({
  user: null,
  token: tokenStorage.get(),

  /* SET AUTH */
  setAuth: ({ user, token }) => set({ user, token }),

  /* CLEAR AUTH */
  clearAuth: () => set({ user: null, token: null }),
}));

export default useAuthStore;
