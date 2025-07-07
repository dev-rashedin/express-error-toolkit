# express-error-toolkit

[![npm version](https://img.shields.io/npm/v/express-error-toolkit)](https://www.npmjs.com/package/express-error-toolkit)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)
[![license](https://img.shields.io/npm/l/express-error-toolkit)](https://github.com/dev-rashedin/express-error-toolkit/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dw/express-error-toolkit)](https://www.npmjs.com/package/express-error-toolkit)
[![GitHub stars](https://img.shields.io/github/stars/dev-rashedin/express-error-toolkit?style=social)](https://github.com/dev-rashedin/express-error-toolkit/stargazers)
![minified](https://badgen.net/bundlephobia/min/express-error-toolkit)
![minified gzip](https://badgen.net/bundlephobia/minzip/express-error-toolkit)

👉 [View on npm](https://www.npmjs.com/package/express-error-toolkit)

A lightweight, production-ready error handling toolkit for Express.js applications — written in TypeScript with full support for both CommonJS and ESM.

It provides:

- Custom error classes (`NotFoundError`, `BadRequestError`, `ValidationError`, etc.)
- Express middleware: `globalErrorHandler`, `notFoundHandler`
- An `asyncHandler` utility to catch async route errors without boilerplate
- A flexible `httpError()` factory function
- `isCustomAPIError()` type guard for better type safety
- Re-exported utilities from [`http-status-toolkit`](https://www.npmjs.com/package/http-status-toolkit) — no need to install it separately

---

## ✨ Features

- ✅ Type-safe custom error classes
- ✅ Centralized global error handler
- ✅ Async error wrapper for route handlers
- ✅ Built-in 404 handler for unknown routes
- ✅ `httpError()` factory for dynamic error creation
- ✅ `isCustomAPIError()` type guard for safe narrowing
- ✅ Includes `http-status-toolkit` exports (like `StatusCodes`)
- ✅ Works with both CommonJS and ESM
- ✅ First-class TypeScript support

---

## 📦 Installation

```bash
npm install express-error-toolkit
```

---

## 📁 Usage

### 1. **asyncHandler**: Wrap async route handlers

```ts
import express from 'express';
import { asyncHandler } from 'express-error-toolkit';

const app = express();

app.get(
  '/users/:id',
  asyncHandler(async (req, res) => {
    // Your async code here
    throw new Error('Something went wrong!');
  })
);
```

---

### 2. **Custom Errors**: Throw meaningful exceptions

```ts
import { NotFoundError, BadRequestError } from 'express-error-toolkit';

app.get('/test', (req, res) => {
  throw new NotFoundError('User not found');
});
```

Each custom error sets the correct `statusCode` and `name` automatically.

---

### 3. **notFoundHandler**: Catch unregistered routes

```ts
import { notFoundHandler } from 'express-error-toolkit';

app.use(notFoundHandler);
```

This will throw a `NotFoundError` with the method and route info.

---

### 4. **globalErrorHandler**: Handle all errors in one place

```ts
import { globalErrorHandler } from 'express-error-toolkit';

app.use(globalErrorHandler);
```

In development mode (`NODE_ENV=development`), the error stack trace will be included in the response.

---

### 5. **Bonus**: Use status codes directly (re-exported from http-status-toolkit)

```ts
import { StatusCodes, getStatusMessage } from 'express-error-toolkit';

res.status(StatusCodes.BAD_REQUEST).json({
  message: getStatusMessage(StatusCodes.BAD_REQUEST),
});
```

---

## 🔧 Custom Error Classes Available

| Error Class       | Default Message | Status Code |
| ----------------- | --------------- | ----------- |
| `NotFoundError`   | "Not Found"     | `404`       |
| `BadRequestError` | "Bad Request"   | `400`       |

_(More to be added in future updates)_

---

## 🛠 Build & Compatibility

- Fully written in TypeScript
- Outputs:
  - CommonJS: `dist/index.cjs.js`
  - ESM: `dist/index.esm.js`
  - Types: `dist/index.d.ts`

---

## 📃 License

MIT © [Rashedin Islam](https://www.rashedin.dev)

---

## 🙌 Acknowledgements

This project includes and re-exports [`http-status-toolkit`](https://www.npmjs.com/package/http-status-toolkit), also created by me.
