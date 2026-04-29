import apiClient from './apiClient';
import type { ApiResponse, LoginPayload, RegisterPayload, AuthData } from '../types/api';

/* AUTH API INTERFACE */
interface IAuthApi {
  login(data: LoginPayload): Promise<import('axios').AxiosResponse<ApiResponse<AuthData>>>;
  register(data: RegisterPayload): Promise<import('axios').AxiosResponse<ApiResponse<AuthData>>>;
  logout(): Promise<import('axios').AxiosResponse<ApiResponse<null>>>;
}

/* AUTH API */
class AuthApi implements IAuthApi {
  /* LOGIN */
  login(data: LoginPayload) {
    return apiClient.post<ApiResponse<AuthData>>('/login', data);
  }

  /* REGISTER */
  register(data: RegisterPayload) {
    return apiClient.post<ApiResponse<AuthData>>('/register', data);
  }

  /* LOGOUT */
  logout() {
    return apiClient.post<ApiResponse<null>>('/logout');
  }
}
// use singleton pattern for auth API to manage token storage and redirection
export const authApi = new AuthApi();
