const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Define the directory for static assets like CSS, JS, images, etc.
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to serve your website's index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
