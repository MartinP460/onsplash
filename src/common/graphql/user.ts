import { gql } from '@apollo/client'

export const GET_USER = gql`
  query ($displayName: String) {
    users(where: { displayName: { _eq: $displayName } }) {
      id
      displayName
      metadata
      avatarUrl
    }
  }
`

export const UPDATE_USER_MUTATION = gql`
  mutation (
    $id: uuid!
    $displayName: String!
    $avatarUrl: String!
    $metadata: jsonb
  ) {
    updateUser(
      pk_columns: { id: $id }
      _set: {
        displayName: $displayName
        avatarUrl: $avatarUrl
        metadata: $metadata
      }
    ) {
      id
      displayName
      metadata
    }
  }
`
