const { model, Schema } = require("mongoose");

module.exports = model(
	"ACTION",
	new Schema({
		name: { type: String, required: true },
		description: { type: String, required: true },
		action: { type: String, enum: [] },
		workspace_scope: { type: String, required: true },
	})
);
