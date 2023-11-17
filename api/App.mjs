import express, { static as expressStatic } from 'express';
import { displayProfileCard } from '../public/utilities/displayProfileCard.mjs';

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000; // Use the provided port or default to 3000

// Serve static files from the 'public' directory
app.use(expressStatic(join(__dirname, '../public')));

// Define routes for specific files
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '../public', 'index.html'));
});

app.get('/search', async (req, res) => {
    try {
        const userId = req.query.userId;
        let markup = await displayProfileCard(userId.toString());
        res.send(markup);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error generating profile card');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
