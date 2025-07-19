# express-error-toolkit

[![npm version](https://img.shields.io/npm/v/express-error-toolkit)](https://www.npmjs.com/package/express-error-toolkit)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)
[![license](https://img.shields.io/npm/l/express-error-toolkit)](https://github.com/dev-rashedin/express-error-toolkit/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dm/http-status-toolkit)](https://www.npmjs.com/package/http-status-toolkit)
![minified](https://badgen.net/bundlephobia/min/express-error-toolkit)
![minified gzip](https://badgen.net/bundlephobia/minzip/express-error-toolkit)

👉 [View on npm](https://www.npmjs.com/package/express-error-toolkit)

A lightweight, production-ready error handling toolkit for Express.js applications — written in TypeScript with full support for both CommonJS and ESM.

If you like the project, please give the project a GitHub ⭐

It provides:

- Custom error classes (`NotFoundError`, `BadRequestError`, `ValidationError`, etc.)
- Express middleware: `globalErrorHandler`, `notFoundHandler`
- An `asyncHandler` utility to handle async errors without boilerplate
- A `httpError()` factory function to create custom error instances easily
- `isCustomAPIError()` type guard for safe error type checks
- Re-exported utilities from [`http-status-toolkit`](https://www.npmjs.com/package/http-status-toolkit) — no need to install it separately

---

## ✨ Features

- ✅ Type-safe custom error classes
- ✅ Centralized error-handling middleware
- ✅ Async error wrapper for route handlers
- ✅ Built-in 404 (Not Found) handler
- ✅ Factory method for generating custom errors
- ✅ Type guard for runtime error checking
- ✅ Out-of-the-box support for both CJS and ESM
- ✅ Includes `http-status-toolkit` exports (like `StatusCodes`, `getStatusMessage`)

---

# 🚀 Installation Guide

You can install **express-error-toolkit** using your favorite package manager.

## Using npm

```bash
npm install express-error-toolkit
```

## Using yarn

```bash
yarn add express-error-toolkit
```

## Using pnpm

```bash
pnpm add express-error-toolkit
```

> ⚙️ Requires **Node.js v14 or higher**.
> ℹ️ Make sure you have `express` installed in your project, as this toolkit is built specifically to enhance Express.js error handling.

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

Each custom error automatically sets the correct `statusCode` and `name`.

You can also pass optional `errorDetails` as a string, object, or leave it out:

```ts
throw new BadRequestError('Invalid data', { field: 'email' });
throw new BadRequestError('Invalid input', 'Missing required field');
throw new BadRequestError('Generic client error');
```

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

By default, the handler includes the stack trace and logs the error in development.
In production (`NODE_ENV=production`), both are automatically suppressed for safety.

---

### 5. 🖍️ Readable Console Logs with ANSI Colors

To enhance developer experience during debugging, this toolkit uses **ANSI escape codes** — **no external dependencies like `chalk` required** — to make console logs more readable.

Each part of the error log is styled using a traffic light-inspired color scheme:

- 🔴 **Error Status & Message** – Red  
- 🟡 **Error Details** – Yellow (optional; string or object)  
- 🟢 **Stack Trace** – Green (shown only if available and enabled)

> 🖼️ Example: Here's how the console might look in development mode:

![Colored error output preview](./assets/console-preview-1.1.2.png)

---

#### ✨ Customizing the Intro Line

By default, an introductory line (*"Even the best code breaks sometimes! Let's debug..."*) is displayed before each error block.

You can control this with the `introLine` option:

```ts
import { setErrorOptions } from 'express-error-toolkit';

// Disable the intro line
setErrorOptions({
  introLine: false
});

// Customize the intro line
setErrorOptions({
  introLine: '🚨 Debugging session begins here...'
});
```

---

### 6. **Set Options Globally (Optional)**

You can configure the error handling behavior (e.g., hide stack traces and disable console logging even in development) using either:

```.env
SHOW_STACK=false
LOG_ERROR=false
```

or directly in your code:

```ts
import { setErrorOptions } from 'express-error-toolkit';

setErrorOptions({
  showStack: false,
  logError: false
});
```

This overrides the default behavior (based on `NODE_ENV` or `.env` file).

---

### 7. **httpError()**: Create generic custom errors

```ts
import { httpError } from 'express-error-toolkit';

throw httpError('Something custom', 418);
```

You can also pass optional `errorDetails` as a string, object, or leave it out:

```ts
throw httpError('Expectation failed', 417,  { reason: 'The server could not meet the Expect header requirements' });
throw httpError('Failed Dependency', 424, 'This request relies on a previous request that failed' );
throw httpError('Unavailable for legal reason', 451);
```

---

### 8. **isCustomAPIError()**: Type guard for checking error type

```ts
import { isCustomAPIError } from 'express-error-toolkit';

if (isCustomAPIError(err)) {
  console.log(err.statusCode, err.message);
  // your rest of the code 
}
```

---

### 9. **Bonus**: Use status codes directly (re-exported from http-status-toolkit)

```ts
import { StatusCodes, getStatusMessage } from 'express-error-toolkit';

res.status(StatusCodes.BAD_REQUEST).json({
  message: getStatusMessage(StatusCodes.BAD_REQUEST),
});
```

---

## 🔧 Custom Error Classes Available

| Error Class            | Default Message         | Status Code |
|------------------------|-------------------------|-------------|
| `BadRequestError`      | Bad Request              | `400`       |
| `UnauthorizedError`    | Unauthorized             | `401`       |
| `ForbiddenError`       | Forbidden                | `403`       |
| `NotFoundError`        | Not Found                | `404`       |
| `ConflictError`        | Conflict                 | `409`       |
| `ValidationError`      | Unprocessable Entity     | `422`       |
| `TooManyRequestsError` | Too Many Requests        | `429`       |
| `CustomAPIError`       | Internal Server Error    | `500`       |

---

## 📂 Directory Structure

```
├── src/
│   ├── error/
│   │   ├── BadRequestError.ts
│   │   ├── NotFoundError.ts
│   │   └── ...
│   ├── global-error-handler.ts
│   ├── async-handler.ts
│   ├── http-error.ts
│   └── index.ts
├── example/
│   └── index.ts
├── __tests__/
│   └── *.test.ts
```

---

## 🛠 Build & Compatibility

- Fully written in TypeScript
- Outputs:
  - CommonJS: `dist/index.cjs`
  - ESM: `dist/index.js`
  - Types: `dist/index.d.ts`

---

## 📃 License

MIT © [Rashedin Islam](https://www.rashedin.dev)

---

## 🙌 Acknowledgements

This project includes and re-exports [`http-status-toolkit`](https://www.npmjs.com/package/http-status-toolkit), also created by me.


## Contributions
Feel free to suggest improvements or add new status codes by opening issues or pull requests on GitHub.


## Links

- **GitHub:** [dev-rashedin](https://github.com/dev-rashedin)
- **Portfolio:** [rashedin.dev](https://www.rashedin.dev)

---

Made with ❤️ by [Rashedin Islam](https://www.rashedin.dev)