import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { GET_ALL_DUTIES } from './Queries/DutiesQuery';
import { mutationFields } from './Mutations';

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
