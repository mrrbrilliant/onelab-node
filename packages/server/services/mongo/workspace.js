const { model, Schema } = require("mongoose");

module.exports = model(
	"SCHOOL",
	new Schema({
		name: { type: String, required: true, unique: true },
		user_id: { type: String, required: true },
		parent_workspace_id: { type: String, default: "" },
	})
);
