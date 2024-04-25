// Import
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Express
const app = express();

// JSON i formularze
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// katalog publiczny
app.use(express.static(path.join(__dirname, 'public')));

// Droga strona główna
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'views', 'index.html'));
});

// Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serwer uruchomiony na porcie ${PORT}`);
});
