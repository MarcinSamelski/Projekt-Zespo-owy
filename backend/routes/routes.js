const express = require("express");
const router = express.Router();
const { Client, TransactionHistory } = require("../models/index");

router.post("/register", async (req, res) => {
  req.body["accountNumber"] = generateAccountNumber();
  req.body["balance"] = 0;

  await Client.create(req.body);

  res.status(201).send({ message: "Konto poprawnie utworzone" });
});

router.post("/login", (req, res) => {});
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
    return res
      .status(400)
      .send({ message: "Wypłacana kwota nie moze byc mniejsza bądź równa zero" });
  }

  if (amount > balance) {
    return res
      .status(400)
      .send({
        message: "Nie można wypłacić więcej niż znajduje się na koncie",
      });
  }

  await client.update({ balance: balance - amount });

  await client.save();

  res.status(200).send({
    message: `Wypłacono ${amount} z konta ${req.body["accountNumber"]}`,
  });
});
router.post("/transfer", (req, res) => {});
router.post("/login", (req, res) => {});
router.get("/getAccountInfo", (req, res) => {});

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
