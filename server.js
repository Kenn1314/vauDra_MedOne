const express = require("express");
const cors = require("cors");
const moment = require("moment");
const fs = require("fs/promises");
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const keyRoute = require("./Routes/keyRoute")

dotenv.config();

const port = process.env.PORT || 5555;
const DB_CONNECTION_URI = process.env.MONGO_DB_URI;
const DB_NAME = process.env.DB_MAIN_NAME;
const app = express();

app.use(cors())
app.use(express.json())


app.use('/object', keyRoute);

app.use((req, res) => {
  return res.status(404).json({"status": "err", "msg": "Route not found !"})
});

mongoose.connect(DB_CONNECTION_URI+DB_NAME)
  .then(() => {
    console.log("MongoDB connected nicely...");
    app.listen(port, () => {
        console.log(`Server is listening at ${port}`)
    })  
  })
  .catch(err => { 
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });