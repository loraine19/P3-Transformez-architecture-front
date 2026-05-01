import { create } from 'zustand';
import { authService } from '../services/authService';
import { tokenStorage } from '../api/tokenStorage';
import type { User } from '../types/entities';
import type { AuthData, LoginPayload, RegisterPayload } from '../types/api';

/* IAUTH STORE STATE */
interface IAuthState {
  user: User | null;
  token: string | null;
}

/* IAUTH STORE ACTIONS */
interface IAuthActions {
  login(data: LoginPayload): Promise<void>;
  register(data: RegisterPayload): Promise<void>;
  logout(): Promise<void>;
}

/* AUTH STORE */
const useAuthStore = create<IAuthState & IAuthActions>((set) => ({
  // rehydrate token from storage on page reload
  user: null,
  token: tokenStorage.get(),

  /* LOGIN */
  login: async (data: LoginPayload): Promise<void> => {
    const authData: AuthData | null = await authService.login(data);
    set({ user: authData?.user ?? null, token: authData?.token ?? null });
  },

  /* REGISTER */
  register: async (data: RegisterPayload): Promise<void> => {
    await authService.register(data);
  },

  /* LOGOUT */
  logout: async (): Promise<void> => {
    await authService.logout();
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
