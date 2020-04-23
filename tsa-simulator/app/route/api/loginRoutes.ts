import user from '../../data/model/user';
const pg = require("pg");


module.exports = function (app) {
    app.post('/auth', function(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        if (username && password) {
            pg.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
                if (results.length > 0) {
                    req.session.loggedin = true;
                    req.session.username = username;
                    res.redirect('/home');
                } else {
                    res.send('Incorrect Username and/or Password!');
                }			
                res.end();
            });
        } else {
            res.send('Please enter Username and Password!');
            res.end();
        }
    });    
    app.post("/newUser", function (req, res) {
        const user = req.body;

        res.json();
        });
};