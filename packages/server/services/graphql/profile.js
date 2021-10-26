const { GraphQLObjectType } = require("graphql");
const { String, ID, IDNonNull, Int } = require("./types");
const { PROFILE } = require("../mongo");

const ProfileType = new GraphQLObjectType({
	name: "Profile",
	fields: () => ({
		id: ID,
		firstName: String,
		lastName: String,
		gender: String,
		dateOfBirth: String,
		address: String,
		owner_id: ID,
	}),
});

const getProfileByID = async (root, { id }, context) => {
	return await PROFILE.findById(id);
};

const createProfile = async (root, args, context) => {
	let new_profile = new PROFILE({ ...args });

	let created_profile = await new_profile.save().catch((error) => {
		throw new Error("Failed to create profile");
	});

	if (created_profile === null) {
		throw new Error("Failed to create profile");
	}

	return created_profile;
};

const updateProfile = async (root, args, context) => {
	let { id, ...update } = args;

	let updated_profile = await PROFILE.findOneAndUpdate(
		{ _id: id },
		{ ...update }
	);

	if (updated_profile === null) {
		throw new Error("Failed to update profile");
	}

	return await getProfileByID(root, { id: id }, context);
};

const ProfileQueries = {
	getProfile: {
		type: ProfileType,
		args: {
			id: IDNonNull,
		},
		resolve: getProfileByID,
	},
};

const ProfileMutations = {
	createProfile: {
		type: ProfileType,
		args: {
			firstName: String,
			lastName: String,
			gender: String,
			dateOfBirth: String,
			address: String,
			owner_id: IDNonNull,
		},
		resolve: createProfile,
	},
	updateProfile: {
		type: ProfileType,
		args: {
			id: IDNonNull,
			firstName: String,
			lastName: String,
			gender: String,
			dateOfBirth: String,
			address: String,
		},
		resolve: updateProfile,
	},
};

module.exports = {
	ProfileType,
	ProfileQueries,
	ProfileMutations,
	getProfileByID,
	createProfile,
	updateProfile,
};
