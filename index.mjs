import express, { static as expressStatic } from 'express';


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

// Middleware to restrict access to the utilities folder
app.use('/utilities/fetchRaiderStats.mjs', (req, res) => {
    // Prevent direct access to the utilities folder
    res.status(403).send('Access Forbidden');
});
app.use('/utilities/fetchDiscordInfo.mjs', (req, res) => {
    // Prevent direct access to the utilities folder
    res.status(403).send('Access Forbidden');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
