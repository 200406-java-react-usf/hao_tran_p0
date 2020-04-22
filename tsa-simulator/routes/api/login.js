  
const router = require("express").Router();
const loginController = require("../../controllers/loginController");

router.route("/")
    .post(loginController.create);

module.exports = router;