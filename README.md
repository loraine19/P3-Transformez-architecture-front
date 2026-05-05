# P3 - Front-end React (Renote SPA)

Application front-end découplée du back-end Laravel. SPA React consommant l'API REST via Bearer Token (Sanctum).

---

## Stack technique

| Outil            | Version | Rôle                                         |
| ---------------- | ------- | -------------------------------------------- |
| React            | 19.x    | Librairie UI                                 |
| TypeScript       | strict  | Typage statique                              |
| Vite             | 8.x     | Bundler + dev server                         |
| React Router DOM | ^6.30.1 | Routing SPA (`createBrowserRouter`)          |
| Zustand          | ^5.0.12 | State management (3 stores)                  |
| Axios            | ^1.15.2 | Client HTTP (Bearer Token, interceptors)     |
| Tailwind CSS     | v4      | Styles utilitaires (`@import "tailwindcss"`) |

---

## Architecture

```
src/
├── api/
│   ├── tokenStorage.ts   ← ITokenStorage  - abstraction localStorage
│   ├── apiClient.ts      ← Axios configuré (baseURL, Bearer, interceptors 401)
│   ├── authApi.ts        ← IAuthApi + AuthApi (login / register / logout)
│   ├── noteApi.ts        ← INoteApi + NoteApi (fetchAll / create / remove)
│   └── tagApi.ts         ← ITagApi + TagApi (fetchAll / create)
├── services/
│   ├── authService.ts    ← login(), register(), logout()
│   ├── notesService.ts   ← fetchNotes(), createNote(), deleteNote()
│   └── tagsService.ts    ← fetchTags(), createTag()
├── store/
│   ├── useAuthStore.ts   ← user, token | login(), logout()
│   ├── useNoteStore.ts   ← notes[] | fetchNotes(), addNote(), removeNote()
│   └── useTagStore.ts    ← tags[] | fetchTags(), addTag()
├── types/
│   ├── entities.ts       ← User, Tag, Note (miroir modèles Laravel)
│   └── api.ts            ← ApiResponse<T>, payloads
├── router/
│   ├── router.tsx        ← createBrowserRouter (/login, /register, /)
│   └── PrivateRoute.tsx  ← Guard : redirige /login si token absent
└── views/
    ├── pages/
    │   ├── LoginPage.tsx
    │   ├── RegisterPage.tsx
    │   └── DashboardPage.tsx
    └── components/
        ├── LoginForm.tsx
        ├── RegisterForm.tsx
        ├── NoteList.tsx
        ├── NoteForm.tsx
        └── TagForm.tsx
```

**Convention Clean Architecture :**

```
UI Event → Page (orchestration) → Service (appel API) → Api layer (Axios + Bearer)
                                                       → Page met à jour le store
                                                                 → Re-render composants abonnés
```

- **Pages** : orchestrent les composants, appellent les services, mettent à jour les stores
- **Composants** : UI pure - reçoivent des props, aucun appel API, aucune mutation de store
- **Stores** : état pur - setters uniquement, jamais d'appel réseau
- **Services** : font les appels API et retournent les données typées
- **Api layer** : Axios centralisé - un seul endroit pour configurer `Authorization: Bearer`

---

## Prérequis

Le back-end Laravel doit tourner en local :

```bash
# Dans le dossier back-end
php artisan serve   # → http://localhost:8000
```

Variables d'environnement attendues (`.env`) :

```env
VITE_API_URL=http://localhost:8000/api/v1
```

Le back-end doit avoir dans son `.env` :

```env
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

---

## Installation et lancement

```bash
npm install
npm run dev      # → http://localhost:5173
npm run build    # Build production (0 erreur TypeScript)
```

---

## Branche active

`feature/front-components`

---

## Tests manuels validés

| Scénario                              | Résultat |
| ------------------------------------- | -------- |
| Register → redirect login             | ✅       |
| Login → dashboard                     | ✅       |
| Dashboard charge notes + tags via API | ✅       |
| Créer une note → ajout sans reload    | ✅       |
| Supprimer une note → retrait immédiat | ✅       |
| Créer un tag                          | ✅       |
| Logout → redirect /login              | ✅       |
| Accès / sans token → redirect login   | ✅       |
