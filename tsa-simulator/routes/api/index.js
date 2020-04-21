const router = require("express").Router();
const gameRoutes = require("./game");
const loginRoutes = require("./login")

// API Routes
router.use("/game", gameRoutes);
router.use("/login", loginRoutes);


module.exports = router;