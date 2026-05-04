/* ITOKEN STORAGE INTERFACE */
interface ITokenStorage {
  get(): string | null;
  set(token: string): void;
  remove(): void;
}

/* TOKEN STORAGE */
// localStorage implementation — swap class to switch to cookies
class TokenStorage implements ITokenStorage {
  private readonly key = 'token';

  /* GET */
  get() {
    return localStorage.getItem(this.key);
  }

  /* SET */
  set(token: string) {
    localStorage.setItem(this.key, token);
  }

  /* REMOVE */
  remove() {
    localStorage.removeItem(this.key);
  }
}

export const tokenStorage = new TokenStorage();
