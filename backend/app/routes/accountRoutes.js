// Importowanie
const express = require('express');
const router = express.Router();
const accountModel = require('./accountModel');

// zakładanie nowego konta
router.post('/createAccount', (req, res) => {
    const { username, password, initialBalance } = req.body;
    accountModel.createAccount(username, password, initialBalance, (err, accountId) => {
        if (err) {
            res.status(500).json({ error: 'Błąd podczas tworzenia konta.' });
        } else {
            res.status(201).json({ message: 'Konto utworzone pomyślnie.', accountId });
        }
    });
});

// logowanie i sprawdzanie salda
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    accountModel.login(username, password, (err, balance) => {
        if (err) {
            res.status(500).json({ error: 'Błąd podczas logowania.' });
        } else {
            if (balance !== null) {
                res.status(200).json({ message: 'Zalogowano pomyślnie.', balance });
            } else {
                res.status(401).json({ error: 'Niepoprawne dane logowania.' });
            }
        }
    });
});

module.exports = router;
