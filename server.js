const express = require("express");
const cors = require("cors");
const moment = require("moment");
const fs = require("fs/promises");
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const keyRoute = require("./Routes/keyRoute")

dotenv.config();

const port = 5555;
const app = express();

app.use(cors())
app.use(express.json())

const DB_CONNECTION_URI = process.env.MONGO_DB_URI;
// console.log("DB_CONNECTION_URI: ", DB_CONNECTION_URI)


app.use('/object', keyRoute);

mongoose.connect(DB_CONNECTION_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
        console.log(`Server is listening at ${port}`)
    })  
  })
  .catch(err => console.error("MongoDB connection error:", err));