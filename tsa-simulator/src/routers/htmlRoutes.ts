const path = require('path')
module.exports = function(app) {
	app.use(function(req, res) {
		res.send('pages/index');;
	});
};

