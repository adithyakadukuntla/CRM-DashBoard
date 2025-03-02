const mongoose = require('mongoose');
const stockSchema = new mongoose.Schema({
    symbol: String,
    name: String,
    country:String,
    type:String
});
const Stock = mongoose.model('Stock', stockSchema);


module.exports = Stock;