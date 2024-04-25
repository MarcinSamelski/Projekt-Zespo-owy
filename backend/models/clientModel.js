const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./bank.sqlite",
});

const Client = sequelize.define("Client", {
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  PESEL: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  accountNumber: {
    type: DataTypes.STRING,
  },
  balance: {
    type: DataTypes.REAL,
  },
});

module.exports = { Client };
