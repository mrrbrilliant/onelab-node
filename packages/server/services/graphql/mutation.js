const { GraphQLObjectType } = require("graphql");
const { UserMutations } = require("./user");
const { ProfileMutations } = require("./profile");
const { ActionMutations } = require("./action");
const { MemberMutations } = require("./member");
const { RoleMutations } = require("./role");
const { WorkspaceMutations } = require("./workspace");

module.exports = new GraphQLObjectType({
	name: "RootMutation",
	fields: {
		...UserMutations,
		...ProfileMutations,
		...ActionMutations,
		...MemberMutations,
		...RoleMutations,
		...WorkspaceMutations,
	},
});
