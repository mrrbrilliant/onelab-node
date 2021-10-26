const {
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLNonNull,
	GraphQLFloat,
	GraphQLBoolean,
} = require("graphql");

// Output type
const String = { type: GraphQLString };
const ID = { type: GraphQLID };
const Boolean = { type: GraphQLBoolean };
const Int = { type: GraphQLInt };
const Float = { type: GraphQLFloat };
const StringNonNull = { type: GraphQLNonNull(GraphQLString) };
const IDNonNull = { type: GraphQLNonNull(GraphQLID) };
const BooleanNonNull = { type: GraphQLNonNull(GraphQLBoolean) };
const IntNonNull = { type: GraphQLNonNull(GraphQLInt) };
const FloatNonNull = { type: GraphQLNonNull(GraphQLFloat) };

module.exports = {
	String,
	ID,
	Boolean,
	Int,
	Float,
	StringNonNull,
	IDNonNull,
	BooleanNonNull,
	IntNonNull,
	FloatNonNull,
};
