import { useState } from 'react'
import { Post } from 'common/types'
import { DocumentNode, useQuery, useLazyQuery } from '@apollo/client'

/*
useGalleryScroll is a custom hook that takes an object containing a graphQL query
and it's variables to fetch posts as the user scrolls, and optionally some initial
posts. It returns an array of posts and a function to fetch more posts.
*/
const useGalleryScroll = (
  queryObject: {
    query: DocumentNode
    variables?: {
      [key: string]: string | number
    }
  },
  initialPosts: Post[] = []
): {
  posts: Post[]
  handleRefresh(): void
} => {
  const [page, setPage] = useState(0)
  const [posts, setPosts] = useState(initialPosts)
  const [getPosts] = useLazyQuery(queryObject.query, {
    variables: { offset: page * 20, ...queryObject.variables },
    onCompleted: (data) => setPosts(posts.concat(data.posts))
  })

  useQuery(queryObject.query, {
    variables: {
      offset: 0,
      ...queryObject.variables
    },
    onCompleted: (data) => {
      if (initialPosts.length > 0) return
      setPosts(posts.concat(data.posts))
    }
  })

  const handleRefresh = () => {
    setPage(page + 1)
    getPosts()
  }

  return { posts, handleRefresh }
}

export default useGalleryScroll
