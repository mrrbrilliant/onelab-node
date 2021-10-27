const { GraphQLObjectType } = require("graphql");
const { UserQueries } = require("./user");
const { ProfileQueries } = require("./profile");
const { ActionQueries } = require("./action");
const { MemberQueries } = require("./member");
const { RoleQueries } = require("./role");
const { WorkspaceQueries } = require("./workspace");

module.exports = new GraphQLObjectType({
	name: "RootQuery",
	fields: {
		...UserQueries,
		...ProfileQueries,
		...ActionQueries,
		...MemberQueries,
		...RoleQueries,
		...WorkspaceQueries,
	},
});
