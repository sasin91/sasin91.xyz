# Task List

## Infrastructure & Layouts
- [x] Update `resources/js/layouts/app-layout.tsx` to use `AppHeaderLayout`.
- [x] Update `resources/js/layouts/auth-layout.tsx` to use `AppSidebarLayout`.
- [x] Update `resources/js/pages/welcome.tsx` to use `AppLayout`.
- [x] Remove `PublicLayout` and `PublicNavbar` components.

## Navigation Enhancements
- [x] Add public links (About Me, Blog) to `AppHeader`.
- [x] Add guest authentication links (Log in, Register) to `AppHeader`.
- [x] Use Wayfinder route helpers in `AppHeader`.
- [ ] Update mobile navigation sheet in `AppHeader` with new links.
- [ ] Ensure consistent active state styling for header links.

## Blog Migration
- [x] Create `BlogArticle` UI component.
- [x] Copy blog images from old project to `resources/images/blog/`.
- [x] Implement `BlogIndex` (`/blog`) page.
- [ ] Implement `BlogTrongate` (`/blog/trongate`) page.
- [ ] Implement `MxTransition` (`/blog/trongate/mx-transition`) page.

## Type Safety & Bug Fixes
- [ ] Resolve `SharedData` type errors across all components.
- [ ] Verify `Inertia.SharedData` namespace availability from Wayfinder.
- [ ] Fix any broken image paths in migrated blog sections.
