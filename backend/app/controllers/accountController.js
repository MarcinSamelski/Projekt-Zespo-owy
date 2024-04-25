// Baza danych SQLite
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS accounts (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, balance REAL)");
});

// Zakładanie nowego konta
function createAccount(username, password, initialBalance, callback) {
    db.run("INSERT INTO accounts (username, password, balance) VALUES (?, ?, ?)", [username, password, initialBalance], function(err) {
        if (err) {
            console.error('Błąd podczas tworzenia konta:', err);
            callback(err, null);
        } else {
            console.log('Konto utworzone:', this.lastID);
            callback(null, this.lastID);
        }
    });
}

// Logowanie i sprawdzanie salda
function login(username, password, callback) {
    db.get("SELECT * FROM accounts WHERE username = ? AND password = ?", [username, password], function(err, row) {
        if (err) {
            console.error('Błąd podczas logowania:', err);
            callback(err, null);
        } else {
            if (row) {
                console.log('Zalogowano jako:', row.username);
                callback(null, row.balance);
            } else {
                console.log('Niepoprawne dane logowania.');
                callback('Niepoprawne dane logowania.', null);
            }
        }
    });
}

module.exports = { createAccount, login };
