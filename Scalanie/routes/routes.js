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
router.post("/deposit", (req, res) => {});
router.post("/withdraw", (req, res) => {});
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
