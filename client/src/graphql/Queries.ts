import { gql } from '@apollo/client';

export const GET_ALL_DUTIES = gql`
  query {
    getAllDuties {
      id
      name
    }
  }
`;
