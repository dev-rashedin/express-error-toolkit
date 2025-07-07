import request from 'supertest';
import express from 'express';
import { globalErrorHandler } from '../src/global-error-handler';
import { NotFoundError } from '../src/error';
import { notFoundHandler } from '../src/not-found-handler';

const app = express();

app.get('/error', (req, res, next) => {
  next(new NotFoundError('Test not found'));
});

app.use(notFoundHandler);
app.use(globalErrorHandler);


describe('E2E error handling', () => {
  it('should handle NotFoundError thrown in route', async () => {
    const res = await request(app).get('/error');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Test not found');
    expect(res.body.success).toBe(false);
  });

  it('should return 404 with correct message', async () => {
    const res = await request(app).get('/error');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message', 'Test not found');
    expect(res.body).toHaveProperty('success', false);
  });
});
