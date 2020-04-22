const pg = require("pg");
const Schema = pg.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    attempts: { type: String, required: true },
    rank: { type: String, required: true },
});

const user = pg.model("User", userSchema);

module.exports = user;