import { gql } from '@apollo/client'

export const ALL_POSTS_QUERY = gql`
  query {
    posts {
      id
      url
      views
      user {
        displayName
        avatarUrl
      }
      description
      created_at
    }
  }
`

export const GET_POST = gql`
  query ($id: uuid!) {
    posts(where: { id: { _eq: $id } }) {
      created_at
      description
      id
      url
      user {
        displayName
        avatarUrl
      }
      views
    }
  }
`
