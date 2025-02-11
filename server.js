require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;
const host = '0.0.0.0';

app.use(cors());
app.use(express.json());

// Import des routes API
const mistral = require('./api/mistral');
const claude = require('./api/claude');
const gpt4 = require('./api/gpt4');

app.use('/api/mistral', mistral);
app.use('/api/claude', claude);
app.use('/api/gpt4', gpt4);

app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API Centrale IA');
});

app.listen(port, host, () => {
    console.log(`Serveur démarré sur http://${host}:${port}`);
});
