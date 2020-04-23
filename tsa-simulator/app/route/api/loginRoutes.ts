import user from '../../data/model/user';
const pg = require("pg");


module.exports = function (app) {
    app.post("/auth", function (req, res) {
        let username = req.body.username;
        let password = req.body.password;
        pg.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (results.length > 0) {
                res.redirect("/profile/:username");
            }
        });
    });
    app.post("/newUser", function (req, res) {
        const user = req.body;

        res.json();
    });
};