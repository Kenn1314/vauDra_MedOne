const express = require('express');
const router = express.Router();

const { insertKeyValue, getValueByKey } = require('../Controllers/keyController');

router.post('/', insertKeyValue);
router.get('/:key', getValueByKey);


module.exports = router;