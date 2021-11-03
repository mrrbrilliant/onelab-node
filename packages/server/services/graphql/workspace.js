const { GraphQLObjectType, GraphQLList, GraphQLError } = require("graphql");
const { ID, IDNonNull, String, StringNonNull } = require("./types");
const { SCHOOL } = require("../mongo");
const { security_guard } = require("./helper");

const WorkspaceType = new GraphQLObjectType({
	name: "Workspace",
	fields: {
		id: ID,
		name: String,
		user_id: ID,
	},
});

const getMyWorkspaces = async (root, args, context) => {
	await security_guard(root, args, context, {
		athentication: true,
		authorization: true,
	});

	return null;
};

const getWorkspaceByID = async (root, { id }, context) => {
	return await SCHOOL.findById(id);
};

const getWorkspaceByName = async (root, { name }, context) => {
	return await SCHOOL.findOne({ name: name });
};

const WorkspaceQueries = {
	getMyWorkspaces: {
		type: GraphQLList(WorkspaceType),
		resolves: getMyWorkspaces,
	},
	getWorkspaceByID: {
		type: WorkspaceType,
		args: {
			id: IDNonNull,
		},
		resolve: getWorkspaceByID,
	},
	getWorkspaceByName: {
		type: WorkspaceType,
		args: {
			name: StringNonNull,
		},
		resolve: getWorkspaceByName,
	},
};

const isMember = async () => {};

const isValidAction = () => {};

const createWorkspace = async (root, args, context) => {
	// let auth = false;
	// try {
	// 	security_guard(root, args, context, {
	// 		athentication: true,
	// 		authorization: true,
	// 	}).then((msg) => {
	// 		console.log(msg);
	// 	});
	// } catch (error) {
	// 	throw new GraphQLError(error);
	// }

	let authenicated = false;
	let ctx = {};
	return security_guard(root, args, context, {
		athentication: true,
		authorization: true,
	})
		.then(async (msg) => {
			if (msg) {
				let new_ws = new SCHOOL({ ...args });
				return await new_ws.save();
			}
		})
		.catch((error) => {
			console.log(error);
			return new Error(error);
		});
};

const updateWorkspace = async (root, args, context) => {
	let { id, ...update } = args;
	await SCHOOL.findOneAndUpdate({ id }, { ...update });
	return await SCHOOL.findById(id);
};

const removeWorkspace = async (root, { id }, context) => {
	return await SCHOOL.findOneAndRemove({ _id: id });
};

const WorkspaceMutations = {
	createWorkspace: {
		type: WorkspaceType,
		args: {
			name: StringNonNull,
			user_id: IDNonNull,
		},
		resolve: createWorkspace,
	},
	updateWorkspace: {
		type: WorkspaceType,
		args: {
			id: IDNonNull,
			name: StringNonNull,
			user_id: IDNonNull,
		},
		resolve: updateWorkspace,
	},
	removeWorkspace: {
		type: WorkspaceType,
		args: {
			id: IDNonNull,
		},
		resolve: removeWorkspace,
	},
};

module.exports = {
	WorkspaceType,
	WorkspaceMutations,
	WorkspaceQueries,
};
