const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, Model, DataTypes } = require("sequelize");
const sqlite = require("sqlite3");

const app = express();
const port = 3000;

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./clients.sqlite",
});

class Client extends Model {}
Client.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    PESEL: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    accountNumber: DataTypes.STRING,
    balance: DataTypes.DECIMAL,
  },
  { sequelize, modelName: "client" }
);

sequelize.sync().then(
  async () =>
    await Client.findOrCreate({
      where: {
        username: "admin",
        password: "admin",
      },
    })
);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routing
app.get("/", (req, res) => {
  res.send("Witaj w banku!");
});

// Zakładanie nowego konta
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const newUser = { id: users.length + 1, username, password, balance: 0 };
  users.push(newUser);
  res.send(`Konto dla użytkownika ${username} zostało pomyślnie utworzone.`);
});

// Logowanie i sprawdzanie salda
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.send(`Witaj ${username}, twoje saldo wynosi ${user.balance} zł.`);
  } else {
    res.status(401).send("Nieprawidłowe dane logowania.");
  }
});

// Nasłuch
app.listen(port, () => {
  console.log(`Serwer bankowy działa na porcie ${port}\n`);
});
