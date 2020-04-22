const db = require("../models/user");

// Defining methods for the weightLiftController
module.exports = {
  // login 
  authUser: function(req, res){
    db.select('username').from('User')
      .then(items => {
        if (items.length) {
          res.json(items)
        } else {
          res.json({ dataExists: 'false' })
        }
      })
      .catch(err => res.status(400).json({ dbError: 'db error' }))
  },
  createUser: function (req, res) {
    let newUser = {
      "username": req.body.username || -1,
      "password": req.body.password || -1,
      "name": req.body.name || -1,
      "attempts": req.body.attempts || -1,
      "rank": req.body.rank || -1,
    };
    db
      .create(newUser)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
