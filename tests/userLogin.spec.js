const request = require('supertest');
const app = require('../server');

describe('User Authentication API', () => {
    let token;
    const password = '123456789';
    beforeAll(async () => {
        const userData = {
            email: 'test@example.com',
            password: password,
            name: 'Test User'
        };

        // Send a POST request to register endpoint
        const response = await request(app)
            .post('/api/user/register')
            .send(userData)
            .set('Accept', 'application/json');
        token = response.body.data.token;
    });

    it('should authenticate a user with valid credentials', async () => {
        const loginData = {
            email: 'test@example.com',
            password: password,
        };

        const response = await request(app)
            .post('/api/user/login')
            .send(loginData)
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('User authenticated successfully');
        expect(response.body.data).toHaveProperty('token');
    });

    it('should return 401 for invalid credentials', async () => {
        const invalidLoginData = {
            email: 'invalid@example.com',
            password: 'invalidpassword'
        };

        const response = await request(app)
            .post('/api/user/login')
            .send(invalidLoginData)
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe('Invalid credentials');
    });
});
