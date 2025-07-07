import express from 'express';
import { asyncHandler, BadRequestError, globalErrorHandler, httpError, notFoundHandler } from 'express-error-toolkit';


const app = express();


app.get('/', (req, res) => {
  res.send('Hello, world!');
})


app.get('/bad-request', asyncHandler(async (req, res) => {
  throw new BadRequestError('Bad request');
}))

app.get('/error', asyncHandler(async (req, res) => {
  throw httpError('Custom error', 499, {info: 'extra info', details: 'extra details'});
}))




// not found handler
app.use(notFoundHandler);

// global error handler
app.use(globalErrorHandler);



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});