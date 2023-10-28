import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { GET_ALL_DUTIES } from 'server/Schema/Queries/DutiesQuery';
import { mutationFields } from 'server/Schema/Mutations';

const Queries = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getAllDuties: GET_ALL_DUTIES,
  },
});

const Mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: mutationFields,
});

export const schema = new GraphQLSchema({
  query: Queries,
  mutation: Mutations,
});
