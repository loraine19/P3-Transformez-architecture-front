# CHANGELOG 1 — Setup initial

**Date :** 2026-04-29  
**Branche :** main  
**Scope :** Bloc 1 — Scaffolding + structure du projet

---

## Ce qui a été fait

### Scaffold Vite + React

- Projet créé avec `npm create vite@latest` (template `react`)
- React 19.2.5 / Vite 8.x / @vitejs/plugin-react v6

### Dépendances installées

| Package            | Version | Rôle                              |
| ------------------ | ------- | --------------------------------- |
| `react-router-dom` | ^6.30.1 | Routing (v6 — pinné manuellement) |
| `zustand`          | ^5.0.12 | State management                  |
| `axios`            | ^1.15.2 | Client HTTP                       |

### Structure de dossiers créée

```
P3_front/
├── changeLogs/
└── src/
    ├── api/          ← apiClient.js (coquille)
    ├── services/     ← authService, notesService, tagsService (coquilles)
    ├── store/        ← useAuthStore, useNoteStore, useTagStore (coquilles)
    └── views/
        ├── pages/    ← LoginPage, RegisterPage, DashboardPage (coquilles)
        └── components/ ← NoteList, NoteForm, TagForm, PrivateRoute (coquilles)
```

### Fichiers configurés

- `App.jsx` — shell RouterProvider (routes en TODO)
- `index.css` — reset + variables de couleur reprises du backend Laravel (zinc/accent)
- Coquilles vides créées pour toutes les couches (api, services, store, views)

### Build vérifié

```
✓ built in 188ms — 0 erreur
```

---

## Ce qui reste à faire (prochains blocs)

- Bloc 2 : `apiClient.js` — Axios configuré (baseURL, Bearer, interceptors)
- Bloc 3 : Services (authService, notesService, tagsService)
- Bloc 4 : Stores Zustand (useAuthStore, useNoteStore, useTagStore)
- Bloc 5 : Routes + PrivateRoute
- Bloc 6 : Pages + composants UI
