const path = require("path");

module.exports = function(app) {
    console.log(path.join(__dirname, "/../public/index.html"));
	app.use(function(req, res) {
		res.sendFile(path.join(__dirname, "/../public/index.html"));
	});
};