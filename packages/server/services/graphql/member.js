const { GraphQLObjectType, GraphQLList } = require("graphql");
const { ID, IDNonNull, String, StringNonNull } = require("./types");
const { MEMBER } = require("../mongo");

const MemberType = new GraphQLObjectType({
	name: "Member",
	fields: {
		id: ID,
		profile_id: ID,
		workspace_id: ID,
		role_id: ID,
		created_at: String,
		expire: String,
	},
});

const getAllMemberByWorkspace = async (root, { workspace_id }, context) => {
	return await MEMBER.find({ workspace_id: workspace_id });
};

const getMemberByID = async (root, { id }, context) => {
	return await MEMBER.findById(id);
};

const addMember = async (root, args, context) => {
	let new_member = new MEMBER({ ...args });
	return await new_member.save();
};

const updateMember = async (root, args, context) => {
	let { id, ...update } = args;
	await MEMBER.findOneAndUpdate({ _id: id }, { ...update });
	return await MEMBER.findById(id);
};

const removeMember = async (root, { id }, context) => {
	return await MEMBER.findOneAndRemove({ _id: id });
};

const MemberQueries = {
	getAllMemberByWorkspace: {
		type: GraphQLList(MemberType),
		args: {
			workspace_id: IDNonNull,
		},
		resolve: getAllMemberByWorkspace,
	},
	getMemberByID: {
		type: MemberType,
		args: {
			id: IDNonNull,
		},
		resolve: getMemberByID,
	},
};

const MemberMutations = {
	addMember: {
		type: MemberType,
		args: {
			profile_id: ID,
			workspace_id: ID,
			role_id: ID,
			created_at: String,
			expire: String,
		},
		resolve: addMember,
	},
	updateMember: {
		type: MemberType,
		args: {
			id: ID,
			profile_id: ID,
			workspace_id: ID,
			role_id: ID,
			created_at: String,
			expire: String,
		},
		resolve: updateMember,
	},
	removeMember: {
		type: MemberType,
		args: {
			id: IDNonNull,
		},
		resolve: removeMember,
	},
};

module.exports = {
	MemberType,
	MemberMutations,
	MemberQueries,
};
