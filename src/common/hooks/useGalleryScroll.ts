import { useState, useEffect } from 'react'
import { Post } from '../types'
import { DocumentNode, useLazyQuery } from '@apollo/client'

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
  initialPosts?: Post[]
): {
  posts: Post[]
  handleRefresh(): void
} => {
  const [posts, setPosts] = useState(initialPosts || [])
  const [page, setPage] = useState(0)
  const [getPosts, { data }] = useLazyQuery(queryObject.query, {
    variables: { offset: page * 20, ...queryObject.variables }
  })

  useEffect(() => {
    if (initialPosts) return
    getPosts()
  }, [])

  useEffect(() => {
    if (data && initialPosts) {
      return setPosts([...posts, ...data.posts])
    }
    if (data) {
      return setPosts([...data.posts])
    }
  }, [data])

  const handleRefresh = () => {
    setPage(page + 1)
    getPosts()
  }

  return { posts, handleRefresh }
}

export default useGalleryScroll
