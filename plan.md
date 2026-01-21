# Refactoring Plan: Public Navigation & Blog Migration

## Objective
Refactor the public navigation to use existing `AppLayout` and `AppHeader` components and migrate the portfolio's blog content from React Router to Laravel Inertia.

## Current Progress
- **Layouts Redefined**: 
    - `AppLayout` now uses `AppHeaderLayout`.
    - `AuthLayout` now uses `AppSidebarLayout`.
- **Navigation**:
    - `AppHeader` has been updated to include "About Me" and "Blog" links.
    - `AppHeader` now displays "Log in" and "Register" buttons for guests.
    - Responsive desktop view is mostly functional.
- **Home Page**:
    - `welcome.tsx` updated to use `AppLayout`.
- **Blog Foundation**:
    - `BlogArticle` component created.
    - Blog images copied to `resources/images/blog/trongate`.
    - `BlogIndex` partially implemented.

## Next Steps

### 1. Complete Blog Content Migration
- **Implement `BlogTrongate`**: Create `resources/js/pages/blog/trongate.tsx` by converting the old `trongate.tsx`, removing i18n, and updating image imports.
- **Implement `MxTransition`**: Create `resources/js/pages/blog/trongate/mx-transition.tsx` with the corresponding content.
- **Verification**: Ensure all internal links within blog posts use Inertia `Link`.

### 2. Resolve Type System Issues
- **Wayfinder Types**: Fix the missing `Inertia.SharedData` definition issues. The user suggested using `Inertia.SharedData` instead of a local `SharedData` interface.
- **Global Props**: Ensure `usePage<Inertia.SharedData>()` correctly provides `auth.user` across all components (`AppHeader`, `NavUser`, `Profile.tsx`, etc.).

### 3. Polish Navigation
- **Mobile Menu**: Update the `Sheet` (Mobile Nav) in `AppHeader` to include the new links (About Me, Blog, Dashboard) and guest auth links.
- **Active States**: Ensure `useActiveUrl` correctly highlights the active navigation item in the header.

### 4. Final Cleanup
- Delete any remaining unused layout files (e.g., `PublicLayout`).
- Run a build to ensure no TypeScript or CSS errors remain.
