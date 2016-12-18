var mongoose = require('mongoose');
var mongoose_csv = require('mongoose-csv');

var chargeSchema = new mongoose.Schema({
	name:  String,
	username: String,
	needName: String,
	reciever: String,
	sum:   Number,
	date:   Date
});

chargeSchema.plugin(mongoose_csv);

module.exports = chargeSchema;
