// Import
const express = require("express");
const { initDatabase } = require("./models/index");
const router = require("./routes/routes");

const PORT = process.env.PORT || 3000;
const app = express();

initDatabase();

// JSON i formularze
app.use(express.json());

app.use("/", router);

// Start
app.listen(PORT, () => {
  console.log(`Serwer uruchomiony na porcie ${PORT}`);
});
