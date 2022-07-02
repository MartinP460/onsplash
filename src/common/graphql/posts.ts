import { gql } from '@apollo/client'

export const ALL_POSTS_QUERY = gql`
  query {
    posts {
      created_at
      description
      id
      url
      image {
        url
        width
        height
      }
      user {
        displayName
        avatarUrl
      }
      views
      location
      tags
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
      image {
        url
        width
        height
      }
      user {
        displayName
        avatarUrl
      }
      views
      location
      tags
    }
  }
`

export const CREATE_POST = gql`
  mutation (
    $description: String
    $tags: jsonb
    $location: String
    $url: String!
    $width: Int!
    $height: Int!
    $userId: uuid!
  ) {
    insert_posts_one(
      object: {
        description: $description
        tags: $tags
        location: $location
        image: { data: { height: $height, url: $url, width: $width } }
        user_id: $userId
      }
    ) {
      id
    }
  }
`
