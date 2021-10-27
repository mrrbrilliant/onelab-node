const { GraphQLObjectType, GraphQLList } = require("graphql");
const { ID, IDNonNull, String, StringNonNull } = require("./types");
const { WORKSPACE } = require("../mongo");

const WorkspaceType = new GraphQLObjectType({
	name: "Workspace",
	fields: {
		id: ID,
		name: String,
		owner_id: ID,
		parent_workspace_id: ID,
	},
});

const getMyWorkspaces = async (root, args, context) => {
	return null;
};

const getWorkspaceByID = async (root, { id }, context) => {
	return await WORKSPACE.findById(id);
};

const getWorkspaceByName = async (root, { name }, context) => {
	return await WORKSPACE.findOne({ name: name });
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

const createWorkspace = async (root, args, context) => {
	let new_ws = new WORKSPACE({ ...args });
	return await new_ws.save();
};

const updateWorkspace = async (root, args, context) => {
	let { id, ...update } = args;
	await WORKSPACE.findOneAndUpdate({ id }, { ...update });
	return await WORKSPACE.findById(id);
};

const removeWorkspace = async (root, { id }, context) => {
	return await WORKSPACE.findOneAndRemove({ _id: id });
};

const WorkspaceMutations = {
	createWorkspace: {
		type: WorkspaceType,
		args: {
			name: StringNonNull,
			owner_id: IDNonNull,
			parent_workspace_id: ID,
		},
		resolve: createWorkspace,
	},
	updateWorkspace: {
		type: WorkspaceType,
		args: {
			id: IDNonNull,
			name: StringNonNull,
			owner_id: IDNonNull,
			parent_workspace_id: ID,
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
