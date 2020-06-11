const mongoose = require('mongoose');

const WineSchema = new mongoose.Schema({
  lotCode: String,
  volume: Number,
  description: String,
  tankCode: String,
  productState: String,
  ownerName: String,
  components: [
    {
      percentage: Number,
      year: Number,
      variety: String,
      region: String
    }
  ]
});

module.exports = Wine = mongoose.model('wine', WineSchema);
