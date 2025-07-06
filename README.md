# express-error-toolkit

A lightweight, production-ready error handling toolkit for Express.js applications — written in TypeScript with full support for both CommonJS and ESM.

It provides:

- Custom error classes (`NotFoundError`, `BadRequestError`, etc.)
- Express middleware: `globalErrorHandler`, `notFoundHandler`
- An `asyncHandler` utility to handle async errors without boilerplate
- Re-exported utilities from [`http-status-toolkit`](https://www.npmjs.com/package/http-status-toolkit) — no need to install it separately

## ✨ Features

- ✅ Type-safe custom error classes
- ✅ Centralized error-handling middleware
- ✅ Async error wrapper for route handlers
- ✅ Built-in 404 (Not Found) handler
- ✅ Out-of-the-box support for both CJS and ESM
- ✅ Includes `http-status-toolkit` exports (like `StatusCodes`)

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
  message: getStatusMessage(StatusCodes.BAD_REQUEST)
});
```

---

## 🔧 Custom Error Classes Available

| Error Class        | Default Message  | Status Code |
|--------------------|------------------|-------------|
| `NotFoundError`    | "Not Found"      | `404`       |
| `BadRequestError`  | "Bad Request"    | `400`       |
*(More to be added in future updates)*

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
