import { authApi } from '../api/authApi';
import { tokenStorage } from '../api/tokenStorage';
import type { LoginPayload, RegisterPayload, AuthData } from '../types/api';

/* IAUTH SERVICE INTERFACE */
interface IAuthService {
  login(data: LoginPayload): Promise<AuthData | null>;
  register(data: RegisterPayload): Promise<AuthData | null>;
  logout(): Promise<void>;
}

/* AUTH SERVICE */
class AuthService implements IAuthService {
  /* LOGIN */
  // stores token via tokenStorage after successful login
  async login(data: LoginPayload) {
    const res = await authApi.login(data);
    const authData = res.data.data;
    if (authData?.token) tokenStorage.set(authData.token);
    return authData;
  }

  /* REGISTER */
  async register(data: RegisterPayload) {
    const res = await authApi.register(data);
    return res.data.data;
  }

  /* LOGOUT */
  // removes token via tokenStorage
  async logout() {
    await authApi.logout();
    tokenStorage.remove();
  }
}

export const authService = new AuthService();
