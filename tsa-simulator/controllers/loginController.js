const db = require("../models/user");

// Defining methods for the weightLiftController
module.exports = {
    // login 
  findById: function (req, res) {
    db
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
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