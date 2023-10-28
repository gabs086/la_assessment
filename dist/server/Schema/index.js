"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const DutiesQuery_1 = require("server/Schema/Queries/DutiesQuery");
const Queries = new graphql_1.GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        getAllDuties: DutiesQuery_1.GET_ALL_DUTIES,
    },
});
const Mutations = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {},
});
exports.schema = new graphql_1.GraphQLSchema({
    query: Queries,
    mutation: Mutations,
});
//# sourceMappingURL=index.js.map