# Development Guidelines

Code Style and Structure

- Write concise, best practises code with accurate examples. Follow Code Craftmanship patterns
- This is a React based project.
- This is a NextJS based project.
- Favor object-oriented programming (OOP) and declarative programming patterns.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Prefer one export per file.
- Ensure a clear separation between UI, state management, and business logic to maintain a clean architecture.
- Use lowercase with dashes for directories (e.g., components/auth-wizard).
- Always use named exports for consistency and maintainability.
- Use npm as the package manager and lock versions using package-lock.json for consistency.
- Use ?? instead of || for nullish coalescing.
- Use conventional commit messages (feat:, fix:, chore:, etc.).
- Ensure all code changes include relevant test cases.
- Use declarative JSX.

TypeScript Usage

- Use TypeScript for all code.
- Prefer interfaces over types, except for utility types or mapped types.
- Avoid enums due to runtime overhead; prefer object maps or union types instead.
- Use strict mode in TypeScript for better type safety, avoid usages of `any`.

UI and Styling

- Use Styled Components for styling.
- Ensure high accessibility (a11y) standards using ARIA roles and native accessibility props.
- Avoid hardcoding padding or margins.
- Implement proper keyboard handling.
- Use CSS variables for theming when necessary.

Performance Optimization

- Minimize the use of useState and useEffect.
- Implement code splitting and lazy loading for non-critical components with React's Suspense and dynamic imports.
- Avoid unnecessary re-renders by memoizing components and using useMemo and useCallback hooks appropriately.

State Management

- Use React Context sparingly to avoid unnecessary re-renders.

Authentication

- Ensure secure API requests using proper authentication and authorization mechanisms.

Error Handling and Validation

- Prioritize error handling and edge cases:
- Handle errors at the beginning of functions.
- Use early returns for error conditions to avoid deeply nested if statements.
- Avoid unnecessary else statements; use the if-return pattern instead.
- Use domain errors to handle errors in the domain layer.
- Use NextJS's ErrorBoundary components for error handling at the route level.

Testing

- Write unit tests using Vitest.
- Implement integration tests for critical user flows using Playwright.
- Write test cases for both success and failure scenarios.

Security

- Sanitize user inputs to prevent XSS attacks.
- Ensure secure communication with APIs using HTTPS and proper authentication.
- Implement Content Security Policy (CSP) headers to prevent cross-site scripting (XSS) attacks.
- Use secure, HttpOnly, and same-site cookies for session management.

React Components

- Use a variable (const) for the components.
- Use FC to type the variable.
- If a component has children, use PropsWithChildren to type the component.
- Props should be typed within the component's type definition.

API Documentation

- Use TypeScript doc comments for complex functions and APIs.
- Keep API documentation up-to-date when modifying code.
