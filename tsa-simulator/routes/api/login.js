  
const router = require("express").Router();
const loginController = require("../../controllers/loginController");

router.route("/")
    .post(loginController.findAll)
    .get(loginController.create);

module.exports = router;