const pg = require("pg");
const Schema = pg.Schema;

const eventSchema = new Schema({
    tile: { type: String, required: true },
    context: { type: String, required: true },
    calledCheck: { type: Boolean, required: true },
});

const event = pg.model("Event", eventSchema);

module.exports = event;