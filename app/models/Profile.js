var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var postSchema = new mongoose.Schema({
    login:  String,
    password: String,
    email:   String,
    name:   String,
    surname:   String,
    needs: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Need'}
    ]
});

postSchema.plugin(deepPopulate, {
    populate: {
        'needs.charges': {
            select: 'name'
        }
    }
});

module.exports = postSchema


