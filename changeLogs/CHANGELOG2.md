# CHANGELOG 2 — API layer + Services + Stores

**Date :** 2026-04-29 / 2026-05-01  
**Branche :** feature/api-client  
**Scope :** Bloc 2 — apiClient, tokenStorage, Api classes, Services | Bloc 3 — Stores Zustand

---

## Ce qui a été fait

### Migration TypeScript

- Tous les fichiers `.js` renommés en `.ts` / `.tsx`
- `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` — strict mode activé
- `src/vite-env.d.ts` — typage `import.meta.env.VITE_API_URL`
- `.env` + `.env.example` créés

### Types définis

- `src/types/entities.ts` — `User`, `Tag`, `Note` (miroir des modèles Laravel)
- `src/types/api.ts` — `ApiResponse<T>`, `LoginPayload`, `RegisterPayload`, `NotePayload`, `TagPayload`, `AuthData`

### Architecture couche API

Pattern uniforme dans chaque fichier : `interface I[X] + class [X] implements I[X] + export singleton`

| Fichier                   | Rôle                                                |
| ------------------------- | --------------------------------------------------- |
| `src/api/tokenStorage.ts` | `ITokenStorage` + `TokenStorage` (localStorage)     |
| `src/api/apiClient.ts`    | Instance Axios + interceptors (Bearer + 401)        |
| `src/api/authApi.ts`      | `IAuthApi` + `AuthApi` — login / register / logout  |
| `src/api/noteApi.ts`      | `INoteApi` + `NoteApi` — fetchAll / create / remove |
| `src/api/tagApi.ts`       | `ITagApi` + `TagApi` — fetchAll / create            |

### Décisions d'architecture

- `apiClient` lit le token via `tokenStorage.get()` — pas d'import du store (évite la dépendance circulaire)
- `tokenStorage` abstrait le type de stockage — swap `localStorage` → cookies en changeant une seule classe
- Singletons exportés (`export const authApi = new AuthApi()`) — remplace un DI container de façon lean

### Services

| Fichier                        | Méthodes                                                       |
| ------------------------------ | -------------------------------------------------------------- |
| `src/services/authService.ts`  | `login()` — écrit token, `register()`, `logout()` — vide token |
| `src/services/notesService.ts` | `fetchNotes()`, `createNote()`, `deleteNote()`                 |
| `src/services/tagsService.ts`  | `fetchTags()`, `createTag()`                                   |

### Convention commentaires

```
/* UPPERCASE */     ← label interface / classe / méthode
// lowercase        ← explication inline si nécessaire
```

### Build vérifié

```
✓ built in 144ms — 0 erreur
```

---

## Bloc 3 — Stores Zustand

Pattern uniforme : `interface I[X]State + interface I[X]Actions + create<IState & IActions>`

| Fichier                     | State           | Actions                                     |
| --------------------------- | --------------- | ------------------------------------------- |
| `src/store/useAuthStore.ts` | `user`, `token` | `login()`, `register()`, `logout()`         |
| `src/store/useNoteStore.ts` | `notes[]`       | `fetchNotes()`, `addNote()`, `removeNote()` |
| `src/store/useTagStore.ts`  | `tags[]`        | `fetchTags()`, `addTag()`                   |

### Décisions d'architecture

- `token` réhydraté depuis `tokenStorage.get()` au démarrage (persistance page reload)
- Actions délèguent aux services — zéro appel API direct dans le store
- `removeNote()` filtre optimistiquement côté client après confirmation serveur
- `addNote()` / `addTag()` — guard `if (result)` avant mutation du state

### Build vérifié

```
✓ 0 erreur TypeScript strict
```

---

## Ce qui reste à faire (prochains blocs)

- Bloc 4 : Routes + `PrivateRoute` + `App.tsx` câblé — branche `feature/front-components`
- Bloc 5 : Pages (`LoginPage`, `RegisterPage`, `DashboardPage`)
- Bloc 6 : Composants (`NoteList`, `NoteForm`, `TagForm`)
