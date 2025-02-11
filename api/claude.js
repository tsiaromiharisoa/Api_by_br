require('dotenv').config();
const express = require('express');
const axios = require('axios');

const router = express.Router();
const API_KEY = process.env.API_KEYS_CLAUDE;

router.get('/', async (req, res) => {
    const { question } = req.query;
    if (!question) {
        return res.status(400).json({ error: 'Veuillez fournir une question' });
    }

    try {
        const response = await axios.post(
            'https://api.anthropic.com/v1/messages',
            {
                model: 'claude-3',
                max_tokens: 1024,
                messages: [{ role: 'user', content: question }]
            },
            {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` }
            }
        );

        res.json({ response: response.data.message || 'Réponse non disponible' });
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: 'Erreur de traitement' });
    }
});

module.exports = router;
