import request from 'supertest';
import express, { Express } from 'express';

const app: Express = express();
app.get('/', (req, res) => {
    res.send('Hello World');
});

describe('GET /', () => {
    it('should respond with "Hello World"', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello World');
    });
});
