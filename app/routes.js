module.exports = function(app, wagner) {
	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
	});
};