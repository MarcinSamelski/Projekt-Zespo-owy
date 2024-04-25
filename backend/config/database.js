const sqlite3 = require('sqlite3').verbose();

// Połączenia z bazą danych
const db = new sqlite3.Database('./bank_database.db', (err) => {
    if (err) {
        console.error('Błąd podczas łączenia z bazą danych:', err.message);
    } else {
        console.log('Połączono z bazą danych');
    }
});

// Tworzenie tabeli kont bankowych
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        balance REAL NOT NULL
    )`);
});

// Dodanie nowego konta
function addAccount(username, password, balance, callback) {
    db.run(`INSERT INTO accounts (username, password, balance) VALUES (?, ?, ?)`, [username, password, balance], function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null, { id: this.lastID });
        }
    });
}

// Pobranie danych konta na podstawie nazwy użytkownika
function getAccountByUsername(username, callback) {
    db.get(`SELECT * FROM accounts WHERE username = ?`, [username], (err, row) => {
        if (err) {
            callback(err);
        } else {
            callback(null, row);
        }
    });
}

// Aktualizacja salda konta
function updateAccountBalance(id, newBalance, callback) {
    db.run(`UPDATE accounts SET balance = ? WHERE id = ?`, [newBalance, id], function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

module.exports = {
    db,
    addAccount,
    getAccountByUsername,
    updateAccountBalance
};
