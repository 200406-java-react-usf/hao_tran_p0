const pg = require("pg");
const Schema = pg.Schema;

const passportSchema = new Schema({
    passportId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    sex: { type: String, required: true },
    nationality: { type: String, required: true },
});

const passport = pg.model("Passport", passportSchema);

module.exports = passport;