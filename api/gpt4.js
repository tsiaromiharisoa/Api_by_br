require('dotenv').config();
const express = require('express');
const axios = require('axios');

const router = express.Router();
const API_KEY = process.env.API_KEYS_GPT4;

router.get('/', async (req, res) => {
    const { question } = req.query;
    if (!question) {
        return res.status(400).json({ error: 'Veuillez fournir une question' });
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
                messages: [{ role: 'user', content: question }],
                temperature: 1,
                max_tokens: 1024,
                top_p: 1
            },
            {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` }
            }
        );

        res.json({ response: response.data.choices[0]?.message?.content || 'Réponse non disponible' });
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: 'Erreur de traitement' });
    }
});

module.exports = router;
