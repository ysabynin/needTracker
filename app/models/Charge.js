var mongoose = require('mongoose');

var chargeSchema = new mongoose.Schema({
	name:  String,
	place: String,
	cost:   Number,
	date:   Date
});

module.exports = chargeSchema;
