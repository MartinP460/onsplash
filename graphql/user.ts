import { gql } from '@apollo/client'

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

export const GET_USER_QUERY = gql`
  query GetUser($id: uuid!) {
    user(id: $id) {
      id
      email
      displayName
      metadata
      avatarUrl
    }
  }
`
