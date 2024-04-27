const { Client } = require("./clientModel");
const { TransactionHistory } = require("./transactionHistoryModel");
const { Sequelize } = require("sequelize");

function initDatabase() {
  Client.sync().then(
    async () =>
      await Client.findOrCreate({
        where: {
          username: "admin",
          password: "admin",
        },
      })
  );

  TransactionHistory.sync();
}

module.exports = { Client, TransactionHistory, initDatabase };
