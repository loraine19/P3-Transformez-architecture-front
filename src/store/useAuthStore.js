import { create } from 'zustand';

// TODO: state: { user: null, token: null }
// TODO: actions: login(email, password), logout()
// TODO: persister le token (localStorage ou sessionStorage)

const useAuthStore = create(() => ({
    user: null,
    token: null,
}));

export default useAuthStore;
