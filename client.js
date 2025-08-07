const axios = require("axios");

var apiURL = "http://localhost:5555";

(async () => {
    let key = "mykey";
    let value = "value1";

    try {
        await store_key_value(key, value);
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