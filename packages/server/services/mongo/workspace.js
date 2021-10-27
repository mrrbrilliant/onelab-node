const { model, Schema } = require("mongoose");

module.exports = model(
	"WORKSPACE",
	new Schema({
		name: { type: String, required: true, unique: true },
		owner_id: { type: String, required: true },
		parent_workspace_id: { type: String, default: "" },
	})
);
