const { GraphQLObjectType, GraphQLList } = require("graphql");
const { ID, IDNonNull, String, StringNonNull } = require("./types");
const { ROLE } = require("../mongo");

const RoleType = new GraphQLObjectType({
	name: "Role",
	fields: {
		id: ID,
		name: String,
		description: String,
		school_id: String,
		authorized_action: String,
	},
});

const getAllRoles = async (root, args, context) => {
	return await ROLE.find();
};

const getRolesByWorkspace = async (root, { school_id }, context) => {
	return await ROLE.find({ school_id: school_id });
};

const getRoleByID = async (root, { id }, context) => {
	return await ROLE.findById(id);
};

const createRole = async (root, args, context) => {
	let new_role = new ROLE({ ...args });
	return await new_role.save();
};

const updateRole = async (root, args, context) => {
	let { id, ...update } = args;
	await ROLE.findOneAndUpdate({ _id: id }, { ...update });
	return ROLE.findById(id);
};

const removeRole = async (root, { id }, context) => {
	return await ROLE.findOneAndRemove({ _id: id });
};

const RoleQueries = {
	getAllRoles: {
		type: GraphQLList(RoleType),
		resolve: getAllRoles,
	},
	getRolesByWorkspace: {
		type: GraphQLList(RoleType),
		args: {
			school_id: IDNonNull,
		},
		resolve: getRolesByWorkspace,
	},
	getRoleByID: {
		type: RoleType,
		args: {
			id: IDNonNull,
		},
		resolve: getRoleByID,
	},
};
const RoleMutations = {
	createRole: {
		type: RoleType,
		args: {
			name: String,
			description: String,
			school_id: String,
			authorized_action: String,
		},
		resolve: createRole,
	},
	updateRole: {
		type: RoleType,
		args: {
			id: IDNonNull,
			name: String,
			description: String,
			school_id: String,
			authorized_action: String,
		},
		resolve: updateRole,
	},
	removeRole: {
		type: RoleType,
		args: {
			id: IDNonNull,
		},
		resolve: removeRole,
	},
};

module.exports = {
	RoleType,
	RoleMutations,
	RoleQueries,
};
