const KeyModel = require('../Models/keyModel');
const moment = require("moment");

const insertKeyValue = async (req, res) => {
    try {
        let timestamp = moment().unix();
        let req_data = req.body;

        if (Object.keys(req_data).length != 1) {
            return res.status(400).json({"status": "err", "msg": `Only one key are allowed to be processed at a time !`});
        }

        let key = Object.keys(req_data)[0];
        let value = req_data[key];

        const result = await KeyModel.create({key, value, timestamp});
        console.log("Upsert result: ", result)

        return res.status(200).json({"status": "ok", key, value, timestamp})
    } catch (err) {
        console.log("Error: ", err)
        return res.status(500).json({"status": "err", "msg": "Internal server error, please contact again !"})
    }
}

const getValueByKey = async (req, res) => {
    try {
        let keyName = req.params.key;
        // console.log("keyName: ", keyName)

        let timestamp_param = req.query.timestamp ? parseInt(req.query.timestamp) : null;
        // console.log(timestamp_param)

        if (Number.isNaN(timestamp_param)) {
            return res.status(400).json({"status": "err", "msg": "Internal server error, timestamp not a number !"})
        }

        let valueOfKey = "";

        if (timestamp_param != null) {
            valueOfKey = await KeyModel.find({key: keyName, timestamp: {$lte: timestamp_param}}).sort({ timestamp: -1 }).limit(1);

            if (valueOfKey) { valueOfKey = valueOfKey[0] }
        } else {
            valueOfKey = await KeyModel.findOne({key: keyName}).sort({ timestamp: -1 });
        }

        if (valueOfKey) {
            return res.status(200).json({"status": "ok", "value": valueOfKey["value"]})
        } else {
            return res.status(200).json({"status": "ok", "msg": `Key: '${keyName}' not found !`})
        }
    } catch (err) {
        console.log("Error: ", err)
        return res.status(500).json({"status": "err", "msg": "Internal server error, please contact again !"})
    }
}

module.exports = {
    insertKeyValue,
    getValueByKey,
};