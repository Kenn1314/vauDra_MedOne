const axios = require("axios");

var apiURL = "http://localhost:5555";

(async () => {
    let key = "mykey";
    let value = "value4";
    let timestamp = 1754672673;

    try {
        await store_key_value(key, value);
        await get_value_from_key(key);
        await get_value_from_key_and_timestamp(key, timestamp);
    } catch (err) {
        console.log("Main error: ", err)
    }

})();

async function store_key_value(key, value) {
    try {
        let data = {}
        data[key] = value

        let res = await axios.post(apiURL+"/object", data);
        console.log("Response from 'store_key_value' function: ", res.data);
    } catch (err) {
        console.log("store_key_value function: ", err)
        throw err;
    }
}

async function get_value_from_key(key) {
    try {
        let res = await axios.get(apiURL+`/object/${key}`);
        console.log("Response from 'get_key_from_value' function: ", res.data);
    } catch (err) {
        console.log("store_key_value function: ", err)
        throw err;
    }
}

async function get_value_from_key_and_timestamp(key, timestamp) {
    try {
        let res = await axios.get(apiURL+`/object/${key}?timestamp=${timestamp}`);
        console.log("Response from 'get_key_from_value' function: ", res.data);
    } catch (err) {
        console.log("store_key_value function: ", err)
        throw err;
    }
}