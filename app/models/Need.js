var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    title:  String,
    type: String,
    period:   String,
    charges: [
        {type: mongoose.Schema.Types.ObjectId, ref:'Charge'}
    ]
});




