import express, { static as expressStatic } from 'express';
import { displayProfileCard } from './public/utilities/displayProfileCard.mjs';

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000; // Use the provided port or default to 3000

// Serve static files from the 'public' directory
app.use(expressStatic(join(__dirname, 'public')));

// Define routes for specific files
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});
app.get('/search', (req, res) => {
    const userId = req.query.userId;
    let markup = displayProfileCard(userId);
    res.send(markup);
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
