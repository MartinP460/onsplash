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
