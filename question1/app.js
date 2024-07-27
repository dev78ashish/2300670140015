const express = require('express');
const axios = require('axios');

const app = express();
const port = 9876;

const windowSize = 10;
let storedNumbers = [];

const API_URLS = {
    'p': 'http://20.244.56.144/test/primes',
    'f': 'http://20.244.56.144/test/fibo',
    'e': 'http://20.244.56.144/test/even',
    'r': 'http://20.244.56.144/test/rand'
};

async function fetchNumbers(numberId) {
    try {
        const response = await axios.get(API_URLS[numberId], { timeout: 500 });
        return response.data.numbers;
    } catch (error) {
        return [];
    }
}

app.get('/numbers/:numberId', async (req, res) => {
    const numberId = req.params.numberId;

    if (!API_URLS[numberId]) {
        return res.status(400).json({ error: 'Invalid number ID' });
    }

    const prevState = [...storedNumbers];
    const newNumbers = await fetchNumbers(numberId);

    newNumbers.forEach(num => {
        if (!storedNumbers.includes(num)) {
            storedNumbers.push(num);
            if (storedNumbers.length > windowSize) {
                storedNumbers.shift();
            }
        }
    });

    const currState = [...storedNumbers];
    const avg = storedNumbers.length ? (storedNumbers.reduce((a, b) => a + b, 0) / storedNumbers.length).toFixed(2) : 0.0;

    res.json({
        windowPrevState: prevState,
        windowCurrState: currState,
        numbers: newNumbers,
        avg: parseFloat(avg)
    });
});

app.listen(port, () => {
    console.log(`Average Calculator Microservice running on http://localhost:${port}`);
});
