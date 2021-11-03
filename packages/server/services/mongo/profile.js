const { model, Schema } = require("mongoose");

module.exports = model(
	"PROFILE",
	new Schema({
		user_id: { type: String, required: true, unique: true },
		firstName: String,
		lastName: String,
		gender: {
			type: String,
			enum: ["male", "female"],
			required: true,
		},
		dateOfBirth: String,
		address: String,
	})
);
