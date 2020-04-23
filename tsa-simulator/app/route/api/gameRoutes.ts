import passport from '../../data/model/passport';
import event from '../../data/model/event';
import { UserRepository } from "../repo/user-repo";

const pg = require("pg");
const user = new UserRepository;

module.exports = function (app) {
    app.route("/auth").get(user.getById).then(resolve =>{
        let username = req.body.username;
        let password = req.body.password;
        pg.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (results.length > 0) {
                res.redirect("/profile/:username");
            }
        });
    })
    app.post("/auth", function (req, res) {

    });
    app.post("/newUser", function (req, res) {
        const user = req.body;

        res.json();
    });
};