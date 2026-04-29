import { create } from 'zustand';

// TODO: state — user, token
// TODO: actions — login(email, password), logout()
// TODO: persist token in localStorage

const useAuthStore = create(() => ({
  user: null,
  token: null,
}));

export default useAuthStore;
