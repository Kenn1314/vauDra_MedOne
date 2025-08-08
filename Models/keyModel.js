const mongoose = require('mongoose');

const keyStoreSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  timestamp: { type: Number, required: true},
});

module.exports = mongoose.model('KeyStore', keyStoreSchema);