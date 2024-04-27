const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./bank.sqlite",
});

const TransactionHistory = sequelize.define("TransactionHistory", {
  from: {
    type: DataTypes.STRING,
  },
  to: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
  },
  amount: {
    type: DataTypes.REAL,
  },
});

module.exports = { TransactionHistory };
