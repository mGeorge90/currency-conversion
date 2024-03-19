const request = require('supertest');
const app = require('../server'); // Import your Express app
const axiosMock = require('axios-mock-adapter');

// Mock the axios instance
const axios = require('axios');
const axiosMockInstance = new axiosMock(axios);

describe('Convert Endpoint', () => {
    afterEach(() => {
        axiosMockInstance.reset();
    });
    let token;
    beforeAll(async () => {
        // call register endpoint for token
        const userData = {
            email: 'test_conver@gmail.com',
            password: 'testpassword',
            name: 'Test User'
        };
        const registerResult = await request(app)
            .post('/api/user/register')
            .send(userData)
            .set('Accept', 'application/json');

        token = registerResult.body.data.token;
    });

    it('should return converted amount for valid request', async () => {
        const exchangeRateResponse = {
            conversion_rates: {
                EUR: 0.85,
                GBP: 0.73,
                JPY: 110.31
            }
        };
        axiosMockInstance
            .onGet(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/USD`)
            .reply(200, exchangeRateResponse);

        const response = await request(app)
            .get('/api/convert')
            .query({ from: 'USD', to: 'EUR', amount: 100 })
            .set('Authorization', token);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Successful Conversion', data: { amount: 85 } });

        // Add assertions to ensure that saveUserHistoryJob is called correctly
    });

    it('should handle invalid currency conversion', async () => {
        const exchangeRateResponse = {
            conversion_rates: {
                EUR: 0.85,
                GBP: 0.73,
                JPY: 110.31
            }
        };
        axiosMockInstance
            .onGet(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/USD`)
            .reply(200, exchangeRateResponse);


        const response = await request(app)
            .get('/api/convert')
            .query({ from: 'USD', to: 'XYZ', amount: 100 })
            .set('Authorization', token);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid currency' });

        // Add assertions to ensure that saveUserHistoryJob is not called
    });

    // Add more test cases for edge cases, error handling, etc.
});
