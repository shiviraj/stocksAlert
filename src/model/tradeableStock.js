const mongoose = require('mongoose');

const TradeableStockSchema = new mongoose.Schema({
  symbol: String,
  cost: Number,
  stopLoss: Number,
  risk: Number,
  date: Date,
  type: String,
  isAlertSent: Boolean
});

const TradeableStock = mongoose.model('Post', TradeableStockSchema);
module.exports = {TradeableStock};
