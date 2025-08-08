const express = require('express');
const router = express.Router();

const { upsertKeyValue, getValueByKey } = require('../Controllers/keyController');

router.post('/', upsertKeyValue);
router.get('/:key', getValueByKey);


module.exports = router;