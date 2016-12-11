var mongoose = require('mongoose');

var chargeSchema = new mongoose.Schema({
	name:  String,
	reciever: String,
	sum:   Number,
	date:   Date
});

module.exports = chargeSchema;
