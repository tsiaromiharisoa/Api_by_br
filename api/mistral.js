require('dotenv').config();
const express = require('express');
const axios = require('axios');

const router = express.Router();
const API_KEY = process.env.API_KEYS_GROQ;
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const conversations = {};

router.get('/', async (req, res) => {
    const { question, uid } = req.query;
    if (!question || !uid) {
        return res.status(400).json({ error: 'Veuillez fournir une question et un UID' });
    }

    if (!conversations[uid]) {
        conversations[uid] = [];
    }
    conversations[uid].push({ role: 'user', content: question });

    try {
        const response = await axios.post(
            API_URL,
            {
                model: 'llama-3.3-70b-versatile',
                messages: conversations[uid],
                temperature: 1,
                max_tokens: 1024,
                top_p: 1
            },
            {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` }
            }
        );

        const botResponse = response.data.choices?.[0]?.message?.content || 'Réponse non disponible';
        conversations[uid].push({ role: 'assistant', content: botResponse });

        if (conversations[uid].length > 20) {
            conversations[uid] = conversations[uid].slice(-20);
        }

        res.json({ response: botResponse });
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: 'Erreur de traitement' });
    }
});

module.exports = router;
