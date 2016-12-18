var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    title:  String,
    type: String,
    username: String,
    charges: [
        {type: mongoose.Schema.Types.ObjectId, ref:'Charge'}
    ]
});




