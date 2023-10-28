import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';

export const DutiesType = new GraphQLObjectType({
  name: 'Duties',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString! },
    createdat: { type: GraphQLString },
    updatedat: { type: GraphQLString },
  }),
});
