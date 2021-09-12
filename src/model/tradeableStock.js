const mongoose = require('mongoose');

const TradeableStockSchema = new mongoose.Schema({
  symbol: String,
  key: String,
  cost: Number,
  stopLoss: Number,
  risk: Number,
  date: Date,
  type: String,
  isAlertSent: Boolean
});

const TradeableStock = mongoose.model('tradeablestocks', TradeableStockSchema);
module.exports = {TradeableStock};
