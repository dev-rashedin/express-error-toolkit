import express from 'express';
import { asyncHandler, BadRequestError, globalErrorHandler, notFoundHandler } from 'express-error-toolkit';


const app = express();


app.get('/', asyncHandler(async (req, res) => {
  throw new BadRequestError('This is a bad request')
}))


// global error handler
app.use(globalErrorHandler);

// not found handler
app.use(notFoundHandler);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});