import express, { static as expressStatic } from 'express';
import fs from 'fs';
import { displayProfileCard } from '../public/utilities/displayProfileCard.mjs';

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { error } from 'console';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(expressStatic(join(__dirname, '../public')));

// Define routes for specific files
app.get(['/', '/api'], (req, res) => {
    res.sendFile(join(__dirname, '../public/', 'index.html'));
});

app.use((error, req, res, next) => {
    console.error(error);
    const errorPageMarkup = fs.readFileSync('./public/views/error.html');
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

    res.send(errorPageMarkup.replace('${errorMessage}', error));
})

app.use('/api/search', async (req, res) => {
    try {
        const userId = req.query.userId;
        let markup = await displayProfileCard(userId.toString());
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
        res.send(markup);
    } catch (error) {
        res.status(500).send('No data found for the given ID.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app;