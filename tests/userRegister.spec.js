const request = require('supertest');
const app = require('../server');

describe('User Registration API', () => {

    it('should stop for not providing email', async () => {
        const userData = {
            password: 'testpassword',
            name: 'Test User'
        };
        const response = await request(app)
            .post('/api/user/register')
            .send(userData)
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(400);
        expect(response.body.errors[1].msg).toBe('Please provide a valid email address');
    });

    it('should stop for not providing password', async () => {
        const userData = {
            email: 'test@example.com',
            name: 'Test User'
        };
        const response = await request(app)
            .post('/api/user/register')
            .send(userData)
            .set('Accept', 'application/json');

        console.log(response.body);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].msg).toBe('Invalid value');
    });

    it('should stop for not providing name', async () => {
        const userData = {
            email: 'test@example.com',
            password: 'testpassword'
        };
        const response = await request(app)
            .post('/api/user/register')
            .send(userData)
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(400);
        expect(response.body.errors[1].msg).toBe('Please provide your name');
    });

    it('should register a new user', async () => {
        const userData = {
            email: 'test@example.com',
            password: 'testpassword',
            name: 'Test User'
        };

        const response = await request(app)
            .post('/api/user/register')
            .send(userData)
            .set('Accept', 'application/json');

        // Assert the response
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('User registered successfully');
        expect(response.body.data).toHaveProperty('token');
    });
});

