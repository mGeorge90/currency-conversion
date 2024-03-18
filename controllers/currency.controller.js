const axios = require('axios');
const saveUserHistoryJob = require('../jobs/save_user_history.job');

async function convert(req, res) {
    const exchangeRateAPIKey = process.env.EXCHANGE_RATE_API_KEY;
    try {
        const { from, to, amount } = req.query;
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${exchangeRateAPIKey}/latest/${from}`);
        const exchangeRate = response.data?.conversion_rates;
        const exchangeRateTarget = exchangeRate[to];
        if (!exchangeRateTarget) {
            return res.status(400).json({ error: 'Invalid currency' });
        }
        const convertedAmount = exchangeRateTarget * amount;
        const userId = req.user.userId;
        const data = {
            from,
            to,
            amount,
            convertedAmount,
            userId
        };
        saveUserHistoryJob.add({ data });
        res.json({ message: "Successful Conversion", data:{amount: convertedAmount} });
    } catch (error) {
        console.error('Error converting currency:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    convert
}