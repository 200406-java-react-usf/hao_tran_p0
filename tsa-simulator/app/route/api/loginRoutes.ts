import { user } from '../../data/model/user';
module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
      res.json(friends);
    });
  
    app.post("/api/friends", function(req, res) {
      var user = req.body; 
      res.json();
    });
  };