// Import
const express = require("express");
const { initDatabase } = require("./models/index");
const router = require("./routes/routes");

const PORT = process.env.PORT || 3000;
const app = express();

initDatabase(); // Inicjalizacja bazy danych

app.use(express.static('public')); // Obsługa plików statycznych

app.use(express.json());

app.use("/", router); // Obsługa tras API

// Obsługa ścieżki głównej
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => {
  console.log(`Serwer uruchomiony na porcie ${PORT}`);
});

