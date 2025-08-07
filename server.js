const express = require("express");
const cors = require("cors");
const moment = require("moment");
const fs = require("fs/promises");

const port = 5555;
const app = express();

app.use(cors())
app.use(express.json())

app.post("/object", async (req, res) => {
    try {
        let timestamp = moment().unix();
        let req_data = req.body;

        if (Object.keys(req_data).length != 1) {
            return res.status(200).json({"status": "err", "msg": `Only one key are allowed to be processed at a time !`, data: {}});
        } else if (typeof req_data[Object.keys(req_data)[0]] !== "string") {
            return res.status(200).json({"status": "err", "msg": `The value of key (${key}) must be a string`, data: {}});
        }

        let key = Object.keys(req_data)[0];
        let value = req_data[key];

        return res.status(200).json({key, value, timestamp})
    } catch (err) {
        return res.status(200).json({"status": "err", "msg": "Internal server error, please contact again !", data: {}})
    }
});

app.get("/object/mykey", async (req, res) => {
    try {

    } catch (err) {
        return res.status(200).json({"status": "err", "msg": "Internal server error, please contact again !", data: {}})
    }
});

app.listen(port, () => {
    console.log(`Server is listening at ${port}`)
})

async function writeJSON(data) {
    try {
        await fs.writeFile(data.json, J)
    } catch (err) {
        console.log("Error writing file: ", err);
        throw err;
    }
}