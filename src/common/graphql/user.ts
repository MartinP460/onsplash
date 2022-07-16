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
    $email: citext!
    $metadata: jsonb
  ) {
    updateUser(
      pk_columns: { id: $id }
      _set: { displayName: $displayName, email: $email, metadata: $metadata }
    ) {
      id
      email
      displayName
      metadata
    }
  }
`

export const DELETE_USER = gql`
  mutation ($id: uuid!) {
    delete_images(where: { post: { user_id: { _eq: $id } } }) {
      affected_rows
    }
    delete_posts(where: { user_id: { _eq: $id } }) {
      affected_rows
    }
    deleteUser(id: $id) {
      id
    }
  }
`
