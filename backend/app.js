const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Dane przykładowej bazy danych
const users = [
    { id: 1, username: 'jan_kowalski', password: 'haslo123', balance: 1000 },
    { id: 2, username: 'anna_nowak', password: 'test123', balance: 500 }
];

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routing
app.get('/', (req, res) => {
    res.send('Witaj w banku!');
});

// Zakładanie nowego konta
app.post('/zarejestruj', (req, res) => {
    const { username, password } = req.body;
    const newUser = { id: users.length + 1, username, password, balance: 0 };
    users.push(newUser);
    res.send(`Konto dla użytkownika ${username} zostało pomyślnie utworzone.`);
});

// Logowanie i sprawdzanie salda
app.post('/zaloguj', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.send(`Witaj ${username}, twoje saldo wynosi ${user.balance} zł.`);
    } else {
        res.status(401).send('Nieprawidłowe dane logowania.');
    }
});

// Nasłuch
app.listen(port, () => {
    console.log(`Serwer bankowy działa na porcie ${port}`);
});
