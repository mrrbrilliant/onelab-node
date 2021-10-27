const { model, Schema } = require("mongoose");

module.exports = model(
	"MEMBER",
	new Schema({
		profile_id: { type: String, required: true },
		workspace_id: { type: String, required: true },
		role_id: { type: String, required: true },
		created_at: { type: String, required: true },
		expire: { type: String, required: true },
	})
);
