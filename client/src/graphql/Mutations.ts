import { gql } from '@apollo/client';

export const CREATE_NEW_DUTY = gql`
  mutation createNewDuty($name: String!) {
    createNewDuty(name: $name) {
      success
      message
    }
  }
`;

export const UPDATE_NEW_DUTY = gql`
  mutation updateDuty($id: Int!, $name: String!) {
    updateDuty(id: $id, name: $name) {
      success
      message
    }
  }
`;

export const DELETE_DUTY = gql`
  mutation deleteDuty($id: Int!) {
    deleteDuty(id: $id) {
      success
      message
    }
  }
`;
