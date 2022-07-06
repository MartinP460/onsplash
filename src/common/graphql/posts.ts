import { gql } from '@apollo/client'

export const GET_ALL_POSTS = gql`
  query ($offset: Int!) {
    posts(limit: 20, offset: $offset) {
      created_at
      description
      id
      image {
        url
        width
        height
      }
      user {
        displayName
        avatarUrl
        metadata
      }
      views
      location
      tags
      likes
    }
  }
`

export const GET_POST = gql`
  query ($id: uuid!) {
    posts(where: { id: { _eq: $id } }) {
      created_at
      description
      id
      image {
        url
        width
        height
      }
      user {
        displayName
        avatarUrl
        metadata
      }
      views
      location
      tags
      likes
    }
  }
`

export const GET_POSTS_BY_QUERY = gql`
  query ($query: String, $offset: Int!) {
    posts(
      limit: 20
      offset: $offset
      where: {
        _or: [
          { description: { _ilike: $query } }
          { location: { _ilike: $query } }
          { tags: { _cast: { String: { _ilike: $query } } } }
        ]
      }
    ) {
      created_at
      description
      id
      image {
        url
        width
        height
      }
      user {
        displayName
        avatarUrl
        metadata
      }
      views
      location
      tags
      likes
    }
  }
`

export const GET_POSTS_BY_USER = gql`
  query ($displayName: String, $offset: Int!) {
    posts(
      where: { user: { displayName: { _eq: $displayName } } }
      limit: 20
      offset: $offset
    ) {
      created_at
      description
      id
      image {
        url
        width
        height
      }
      user {
        displayName
        avatarUrl
        metadata
      }
      views
      location
      tags
      likes
    }
  }
`

export const GET_LIKED_POSTS = gql`
  query ($userId: uuid!, $offset: Int!) {
    posts(
      where: { likes: { _contains: [$userId] } }
      limit: 20
      offset: $offset
    ) {
      created_at
      description
      id
      image {
        url
        width
        height
      }
      user {
        displayName
        avatarUrl
        metadata
      }
      views
      location
      tags
      likes
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

export const LIKE_POST = gql`
  mutation ($postId: uuid!, $userId: uuid!) {
    update_posts_by_pk(
      pk_columns: { id: $postId }
      _append: { likes: [$userId] }
    ) {
      id
    }
  }
`

export const UNLIKE_POST = gql`
  mutation ($postId: uuid!, $userId: String!) {
    update_posts_by_pk(
      pk_columns: { id: $postId }
      _delete_key: { likes: $userId }
    ) {
      id
    }
  }
`

export const INCREMENT_VIEWS = gql`
  mutation ($id: uuid!) {
    update_posts_by_pk(pk_columns: { id: $id }, _inc: { views: 1 }) {
      id
    }
  }
`
