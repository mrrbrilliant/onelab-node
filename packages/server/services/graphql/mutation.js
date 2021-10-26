const { GraphQLObjectType } = require("graphql");
const { UserMutations } = require("./user");
const { ProfileMutations } = require("./profile");

module.exports = new GraphQLObjectType({
	name: "RootMutation",
	fields: {
		...UserMutations,
		...ProfileMutations,
	},
});
