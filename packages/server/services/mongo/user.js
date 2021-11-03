const { model, Schema } = require("mongoose");

module.exports = model(
	"USER",
	new Schema({
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["admin", "user"],
			default: "user",
			required: true,
		},
	})
);
