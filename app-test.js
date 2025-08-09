const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');

const keyRoute = require("./Routes/keyRoute")

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json())

app.use('/object', keyRoute);

app.use((req, res) => {
  return res.status(404).json({"status": "err", "msg": "Route not found !"})
});

module.exports = app;