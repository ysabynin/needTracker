// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var MongoClient = require('mongodb').MongoClient;

// configuration ===========================================
	
// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

mongoose.connection.on('connected', function(){
    console.log("Connected");
});

mongoose.connection.on('error', function(){
    console.log("Error");

});

mongoose.connection.on('disconnected', function(){
    console.log("Disconnected");

});

var db = mongoose.connect('mongodb://127.0.0.1:27017/needtracker',{ server: { poolSize: 1 }});

//create schema for needs
var needSchema = new mongoose.Schema({
    name:  String,
    description: String,
    price:   String
});

//compile schema to model
var Needs = db.model('needs', needSchema)

Needs.create({name: 'Health', description: 'Minion', price:'1231'}, function(err, doc) {
    console.log("Created");
});

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes




// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app