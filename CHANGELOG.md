# Changelog

All notable changes to this project will be documented in this file.  
This project adheres to [Semantic Versioning](https://semver.org) and follows [Conventional Commits](https://www.conventionalcommits.org).

---

## [1.2.0](https://github.com/dev-rashedin/express-error-toolkit/releases/tag/1.2.0) – 2025-08-09

### ♻️ Changes
 - Removed: The http-status-toolkit re-export from the package to keep the toolkit focused and lightweight.

   > You can now install and import http-status-toolkit directly if you need it:

```bash
npm install http-status-toolkit
```
```ts
import { StatusCodes } from 'http-status-toolkit';
```

---

## [1.1.2](https://github.com/dev-rashedin/express-error-toolkit/releases/tag/1.1.2) – 2025-07-19

### ✨ Improvements

- Introduced `introLine` to enhance developer experience (DX) when logging errors
- Made `introLine` fully customizable through `setErrorOptions()` or by setting it to `false` to disable it


---

## [1.1.1](https://github.com/dev-rashedin/express-error-toolkit/releases/tag/1.1.1) – 2025-07-19

### ✨ Improvements

- Console now logs the `statusCode` with styled ANSI output.
- Further improved DX for debugging and tracing errors during development.

---

## [1.1.0](https://github.com/dev-rashedin/express-error-toolkit/releases/tag/1.1.0) – 2025-07-18

### ✨ Improvements

- Enhanced `globalErrorHandler` with smarter defaults:
  - `showStack` and `logError` are now **enabled by default**, unless:
    - explicitly set to `false`, **or**
    - `NODE_ENV` is `'production'`
- Added ANSI color formatting to make console errors more readable
- Users can customize behavior via:
  - `.env` (`SHOW_STACK=false`, `LOG_ERROR=false`)
  - `setErrorOptions()` function in code
- Included updated usage guide and console screenshot in README

---

## [1.0.1](https://github.com/dev-rashedin/express-error-toolkit/releases/tag/1.0.1) – 2025-07-09

### ✨ Improvements

- Added support for optional stack trace and error logging in `globalErrorHandler`
- Users can now control behavior using `.env` (`SHOW_STACK`, `LOG_ERROR`) or programmatically via `setToolkitOptions()`

---

## [1.0.0](https://github.com/dev-rashedin/express-error-toolkit/releases/tag/1.0.0) – 2025-07-07

### ✨ Features

- ✅ Production-ready global error handler with optional stack trace
- ✅ Ready-to-use `asyncHandler` for wrapping async route handlers
- ✅ Built-in `notFoundHandler` middleware
- ✅ Custom error classes:
  - `BadRequestError`
  - `NotFoundError`
  - `ForbiddenError`
  - `UnauthenticatedError`
  - `ConflictError`
  - `ValidationError`
  - `TooManyRequestsError`
- ✅ `httpError()` factory for creating custom errors dynamically
- ✅ `isCustomAPIError()` type guard
- ✅ Optional `errorDetails` support (string or object) across all error types
- ✅ Full TypeScript support
- ✅ Supports both CommonJS and ESM
- ✅ Includes re-exports from `http-status-toolkit`

---

## [0.1.0-beta.1](https://github.com/dev-rashedin/express-error-toolkit/releases/tag/0.1.0-beta.1) – 2025-07-05

- Initial beta release
