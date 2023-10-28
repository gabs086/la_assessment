"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DutiesType = void 0;
const graphql_1 = require("graphql");
exports.DutiesType = new graphql_1.GraphQLObjectType({
    name: 'Duties',
    fields: () => ({
        id: { type: graphql_1.GraphQLInt },
        name: { type: graphql_1.GraphQLString },
        createdat: { type: graphql_1.GraphQLString },
        updatedat: { type: graphql_1.GraphQLString },
    }),
});
//# sourceMappingURL=DutiesType.js.map