const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hash_password = (password) => {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(password, salt);
};

const compare_password = (current_user, password) => {
	let compared_password_result = false;

	if (current_user.password !== null) {
		compared_password_result = bcrypt.compareSync(
			password,
			current_user.password
		);
	}

	return compared_password_result;
};

const validate_key = (token) => {
	let validity = jwt.verify(token, process.env.SECRET);

	if (!validity) {
		throw new Error("Invalid authenication token");
	}

	return jwt.decode(token);
};

module.exports = { hash_password, compare_password, validate_key };
