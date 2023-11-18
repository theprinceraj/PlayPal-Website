import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import express, { static as expressStatic } from 'express';

import { displayProfileCard } from '../public/utilities/displayProfileCard.mjs';
import { isValidDiscordID } from "../public/utilities/validateDiscordID.mjs";


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

app.use('/api/search', async (req, res, next) => {
    try {
        const userId = req.query.userId.toString();
        if (!isValidDiscordID(userId)) {
            res.status(500).send('Invalid Discord ID.');
            return;
        }

        let markup = await displayProfileCard(userId);
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
        res.send(markup);
    } catch (error) {
        console.error(error)
        next(error);
        res.status(500).send('No data found for the given ID.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app;