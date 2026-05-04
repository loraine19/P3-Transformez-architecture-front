# CHANGELOG 3 — Pages + Composants + Routing + CSS

**Date :** 2026-05-01  
**Branche :** feature/front-components  
**Scope :** Bloc 4 — Router, PrivateRoute, Pages, Composants UI, Styles globaux

---

## Ce qui a été fait

### Routing

| Fichier                       | Rôle                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------ |
| `src/router/router.tsx`       | `createBrowserRouter` — routes `/login`, `/register`, `/` (sous PrivateRoute)        |
| `src/router/PrivateRoute.tsx` | Guard : lit `token` via `useAuthStore((s) => s.token)` — redirige `/login` si absent |
| `src/App.tsx`                 | Shell mince — `<RouterProvider router={router} />`                                   |

### Pages

| Fichier                             | Responsabilité                                                                          |
| ----------------------------------- | --------------------------------------------------------------------------------------- |
| `src/views/pages/LoginPage.tsx`     | Appelle `authService.login()` → `setAuth()` → `navigate('/')`                           |
| `src/views/pages/RegisterPage.tsx`  | Appelle `authService.register()` → `navigate('/login')`                                 |
| `src/views/pages/DashboardPage.tsx` | Init via `Promise.all([fetchNotes, fetchTags])` — orchestre NoteList, NoteForm, TagForm |

### Composants UI

| Fichier                                 | Rôle                                                                     |
| --------------------------------------- | ------------------------------------------------------------------------ |
| `src/views/components/LoginForm.tsx`    | Formulaire login — props : `onSubmit(email, password)`, `error`          |
| `src/views/components/RegisterForm.tsx` | Formulaire register — props : `onSubmit(name, email, password)`, `error` |
| `src/views/components/NoteList.tsx`     | Liste notes + suppression — résout le nom de tag via `tag_id` lookup     |
| `src/views/components/NoteForm.tsx`     | Formulaire création note — select tag alimenté depuis `useTagStore`      |
| `src/views/components/TagForm.tsx`      | Formulaire création tag                                                  |

### Styles globaux — `src/index.css`

- `@import "tailwindcss"` (Tailwind CSS v4 — import unique, pas de `@tailwind` directives)
- Variables CSS palette zinc (`--color-zinc-*`) pour cohérence visuelle
- `@layer components` avec classes réutilisables :

| Classe           | Usage                                       |
| ---------------- | ------------------------------------------- |
| `.auth-page`     | Page full-screen centrée (login / register) |
| `.auth-logo`     | Logo en haut du formulaire d'auth           |
| `.auth-label`    | Label de champ auth                         |
| `.auth-input`    | Input de champ auth                         |
| `.auth-btn`      | Bouton pleine largeur                       |
| `.card`          | Panneau bordé et arrondi                    |
| `.section-title` | Titre de section                            |
| `.btn-primary`   | Bouton action principale                    |
| `.btn-danger`    | Bouton action destructive (suppression)     |
| `.field`         | Wrapper vertical label + input              |

### Convention Clean Architecture appliquée

```
UI Event
  └─ Page (orchestration)
      └─ Service (appel API)
          └─ Api layer (Axios + Bearer Token)
              └─ Page met à jour le store (setter pur)
                  └─ Re-render composants abonnés
```

- **Pages** : orchestration — `async/await`, appels services, mise à jour des stores
- **Composants** : UI pure — reçoivent props, aucun appel API, aucune mutation de store
- **Stores** : état pur — setters uniquement (`setNotes`, `addNote`, `removeNote`, `setTags`, `addTag`)
- **Services** : appellent la couche API et retournent les données typées

### Correction bug backend (tags non filtrés)

Les tags n'étaient pas scopés par `user_id` côté API Laravel (TagService retournait `Tag::all()`).  
Correction effectuée dans le backend (branche `feature/exo2-front-impl`).  
Côté front : aucune modification nécessaire — l'API retourne désormais les tags de l'utilisateur connecté uniquement.

### Build vérifié

```
✓ built — 0 erreur TypeScript
```
