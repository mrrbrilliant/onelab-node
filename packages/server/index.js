const express = require("express");
const { connect } = require("mongoose");
const { json } = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./services/graphql");
// env
require("dotenv").config({ path: "../../.env" });

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
	NODE_ENV,
} = process.env;
const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_ADDRESS}:${MONGO_PORT}/${MONGO_INITDB_DATABASE}`;

function main() {
	app.use(json());
	app.use(
		"/api/graphql",
		graphqlHTTP({
			schema: schema,
			graphiql: NODE_ENV === "production" ? false : true,
		})
	);
	app.listen(EXPRESS_PORT, EXPRESS_ADDRESS, () => {
		console.log(`OneLab Server: http://${EXPRESS_ADDRESS}:${EXPRESS_PORT}`);
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
