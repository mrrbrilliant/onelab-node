const { USER } = require("./models");

const methods = {
	UserSignUp: function (args, context, done) {
		const new_user = new USER({ ...args });
		console.log(new_user);
		done(null, args);
	},
	hello: (args, context, callback) => {
		if (context.headers.authorization === "brilliant") {
			callback(null, {
				user: "Brilliant",
			});
		} else {
			const error = { code: 404, message: "UNAUTHORIZED" };
			callback(error, null);
		}
	},
	mul: (args, context, callback) => {
		callback(null, args.a * args.b);
	},
};

module.exports = methods;
