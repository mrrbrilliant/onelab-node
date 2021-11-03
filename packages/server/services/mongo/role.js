const { model, Schema } = require("mongoose");

module.exports = model(
	"ROLE",
	new Schema({
		name: { type: String, required: true },
		description: { type: String, required: true },
		school_id: { type: String, required: true },
		authorized_action: { type: String, required: true },
	})
);
