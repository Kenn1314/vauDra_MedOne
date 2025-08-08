const KeyModel = require('../Models/keyModel');
const moment = require("moment");

const upsertKeyValue = async (req, res) => {
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

        const result = await KeyModel.create({key, value, timestamp});
        console.log("Upsert result: ", result)

        return res.status(200).json({key, value, timestamp})
    } catch (err) {
        console.log("Error: ", err)
        return res.status(200).json({"status": "err", "msg": "Internal server error, please contact again !", data: {}})
    }
}

const getValueByKey = async (req, res) => {
    try {
        let keyName = req.params.key;
        // console.log("keyName: ", keyName)

        let timestamp_param = req.query.timestamp ? parseInt(req.query.timestamp) : null;
        // console.log(typeof(timestamp_param))

        let valueOfKey = "";

        if (timestamp_param) {
            valueOfKey = await KeyModel.find({key: keyName, timestamp: {$lte: timestamp_param}}).sort({ timestamp: -1 }).limit(1);

            if (valueOfKey) { valueOfKey = valueOfKey[0] }
        } else {
            valueOfKey = await KeyModel.findOne({key: keyName}).sort({ timestamp: -1 });
        }

        if (valueOfKey) {
            return res.status(200).json({"value": valueOfKey["value"]})
        } else {
            return res.status(200).json(`Key: '${keyName}' not found !`)
        }
    } catch (err) {
        console.log("Error: ", err)
        return res.status(200).json({"status": "err", "msg": "Internal server error, please contact again !", data: {}})
    }
}

module.exports = {
    upsertKeyValue,
    getValueByKey,
};