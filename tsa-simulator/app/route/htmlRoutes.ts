const path = require("path");

module.exports = function(app) {
	app.get("/login", function(req, res) {
		res.sendFile(path.join(__dirname, "/../public/survey.html"));
	});
	app.get("/profile", function(req, res) {
		res.sendFile(path.join(__dirname, "/../public/profile.html"));
	});
	app.get("/game", function(req, res) {
		res.sendFile(path.join(__dirname, "/../public/game.html"));
	});
	app.use(function(req, res) {
		res.sendFile(path.join(__dirname, "/../public/idex.html"));
	});
};