const request = require('supertest');
const app = require('../server');

describe('Health Check Endpoint', () => {
    it('should respond with status 200 and "I am healthy!"', async () => {
        const response = await request(app).get('/api/__health');
        expect(response.status).toBe(200);
        expect(response.text).toBe('I am healthy!');
    });
});
