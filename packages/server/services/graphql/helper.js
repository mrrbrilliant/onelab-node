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

const validate_key = async (token) => {
	return new Promise((resolve, reject) => {
		if (!token) {
			reject("Authorization token is required");
		}
		let validity = jwt.verify(token, process.env.SECRET);

		if (validity) {
			resolve(jwt.decode(token));
		} else {
			reject("Invalid token");
		}
	});
};

const header_guard = (headers) => {
	return new Promise((resolve, reject) => {
		if (headers.authorization) {
			resolve(headers.authorization);
		} else {
			reject("Authorization Header is required");
		}
	});
};

const security_guard = async (root, args, context, config) => {
	let errs = [];

	return new Promise(async (resolve, reject) => {
		try {
			let auth_token = header_guard(context)
				.then((msg) => {
					return msg;
				})
				.catch((error) => {
					throw new Error(error);
				});

			let decoded_token = validate_key(await auth_token)
				.then((msg) => {
					return msg;
				})
				.catch((error) => {
					throw new Error(error);
				});
			if (errs.length > 0) {
				reject();
			} else {
				resolve(decoded_token);
			}
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = {
	hash_password,
	compare_password,
	validate_key,
	header_guard,
	security_guard,
};
