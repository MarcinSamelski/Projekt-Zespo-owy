const express = require("express");
const router = express.Router();
const { Client, TransactionHistory } = require("../models/index");

router.post("/register", async (req, res) => {
  const { username, password, firstName, lastName, pesel } = req.body;

  try {
    // Generowanie numeru konta
    const accountNumber = generateAccountNumber();

    // Tworzenie w bazie
    const newClient = await Client.create({
      username,
      password,
      firstName,
      lastName,
      pesel,
      accountNumber,
      balance: 1000, 
    });

    res.status(201).send({ message: 'Rejestracja udana', client: newClient });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Wystąpił błąd podczas rejestracji' });
  }
});

// Generowanie numeru konta
function generateAccountNumber() {
  const length = 26;
  let accountNumber = '';
  const characters = '0123456789';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    accountNumber += characters[randomIndex];
  }

  return accountNumber;
}

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Szukanie klienta
    const client = await Client.findOne({ where: { username } });

    // Sprawdzanie czy klient istnieje
    if (!client || client.password !== password) {
      return res.status(401).send({ message: 'Nieprawidłowy login lub hasło' });
    }

    res.status(200).send({ message: 'Logowanie udane', client });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Wystąpił błąd podczas logowania' });
  }
});

router.post("/deposit", async (req, res) => {
  const client = await Client.findOne({
    where: { accountNumber: req.body["accountNumber"] },
  });
  const amount = req.body["amount"];

  if (client == null) {
    return res
      .status(404)
      .send({ message: "Nie znaleziono klienta o danym numerze konta" });
  }

  const balance = client.balance;

  if (amount <= 0) {
    return res
      .status(400)
      .send({ message: "Wplacana kwota nie moze byc mniejsza lub równa zero" });
  }

  await client.update({ balance: balance + amount });

  await client.save();

  await TransactionHistory.create({
    to: client.accountNumber,
    type: "deposit",
    amount: amount,
  });

  res.status(200).send({
    message: `Wplacono ${amount} na konto ${req.body["accountNumber"]}`,
  });
});

router.post("/withdraw", async (req, res) => {
  const client = await Client.findOne({
    where: { accountNumber: req.body["accountNumber"] },
  });
  const amount = req.body["amount"];

  if (client == null) {
    return res
      .status(404)
      .send({ message: "Nie znaleziono klienta o danym numerze konta" });
  }

  const balance = client.balance;

  if (amount <= 0) {
    return res.status(400).send({
      message: "Wypłacana kwota nie moze byc mniejsza bądź równa zero",
    });
  }

  if (amount > balance) {
    return res.status(400).send({
      message: "Nie można wypłacić więcej niż znajduje się na koncie",
    });
  }

  await client.update({ balance: balance - amount });

  await client.save();

  await TransactionHistory.create({
    to: client.accountNumber,
    type: "withdraw",
    amount: amount,
  });

  res.status(200).send({
    message: `Wypłacono ${amount} z konta ${req.body["accountNumber"]}`,
  });
});

router.post("/transfer", async (req, res) => {
  const sender = await Client.findOne({
    where: { accountNumber: req.body["senderAccountNumber"] },
  });
  const recipient = await Client.findOne({
    where: { accountNumber: req.body["recipientAccountNumber"] },
  });
  const amount = req.body["amount"];

  if (sender == null || recipient == null) {
    return res.status(404).send({
      message: `Nie znaleziono ${
        sender == null ? "wysyłającego" : "odbierającego"
      }`,
    });
  }

  if (amount <= 0) {
    return res
      .status(400)
      .send({ message: "Kwota nie moze byc mniejsza bądź równa zero" });
  }
  if (amount > sender.balance) {
    return res.status(400).send({
      message: "Nie można przelać więcej niż znajduje się na koncie",
    });
  }

  await sender.update({ balance: sender.balance - amount }).then(sender.save());
  await recipient
    .update({ balance: recipient.balance + amount })
    .then(recipient.save());

  await TransactionHistory.create({
    from: sender.accountNumber,
    to: recipient.accountNumber,
    type: "transfer",
    amount: amount,
  });

  res.status(200).send({
    message: `Wysłano ${amount} z ${sender.accountNumber} do ${recipient.accountNumber}`,
  });
});

router.get("/getAccountInfo", async (req, res) => {
  const client = await Client.findOne({ where: req.body });

  if (client == null) {
    return res.status(404).send({ message: "Nie znaleziono klienta" });
  }

  res.status(200).send(client);
});

router.get("/getTransactionHistory", async (req, res) => {
  const history = await TransactionHistory.findAll({
    where: req.body,
  });

  res.status(200).send(history);
});

function generateAccountNumber() {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 26) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

module.exports = router;
