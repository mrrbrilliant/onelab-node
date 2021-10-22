const express = require("express");
const { json } = require("body-parser");
const jayson = require("jayson");
const { connect } = require("mongoose");
// env
require("dotenv").config().config({ path: "../.env" });

const methods = require("./server");

// Global variables
const app = express();
const {
	// database
	MONGO_USER,
	MONGO_PASSWORD,
	MONGO_ADDRESS,
	MONGO_PORT,
	MONGO_INITDB_DATABASE,
	// server
	EXPRESS_ADDRESS,
	EXPRESS_PORT,
} = process.env;
const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_ADDRESS}:${MONGO_PORT}/${MONGO_INITDB_DATABASE}`;

function main() {
	const server = new jayson.Server(methods, {
		useContext: true,
		params: Object,
	});

	app.use(json());
	app.use("/api", function (req, res, next) {
		const context = { headers: req.headers };

		server.call(req.body, context, function (err, result) {
			if (err) {
				res.send(err || {});
			}
			res.send(result || {});
		});
	});

	app.listen(SERVER_PORT, () => {
		console.log(`OneLab Server: http://${ADDRESS}:${SERVER_PORT}`);
	});
}

try {
	connect(uri).then(function () {
		console.log("Database connection established.");
		main();
	});
} catch (error) {
	if (error) {
		throw new Error(error);
	}
}
