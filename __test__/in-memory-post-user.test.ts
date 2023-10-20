import request from 'supertest';
import app from './in-memory-app';

describe('POST /users', () => {
    it('should create a new user', async () => {
        const newUser = {
            login: "testUser",
            senha: "testPass",
            categoria: "testCategory"
        };

        const response = await request(app)
            .post('/users')
            .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(newUser);
    });
});
