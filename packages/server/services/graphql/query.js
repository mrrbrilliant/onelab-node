const { GraphQLObjectType } = require("graphql");
const { UserQueries } = require("./user");
const { ProfileQueries } = require("./profile");

module.exports = new GraphQLObjectType({
	name: "RootQuery",
	fields: {
		...UserQueries,
		...ProfileQueries,
	},
});
