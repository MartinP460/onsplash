import { Post } from '../types/index'
import { splitArrayToThreeSubArrays } from '../utils/helpers'
import { useState } from 'react'
import { useWindowSize } from 'rooks'
import { useRouter } from 'next/router'
import { DocumentNode } from 'graphql'
import { QuestionMarkCircleIcon } from '@heroicons/react/solid'
import { useMutation } from '@apollo/client'
import { INCREMENT_VIEWS } from '../graphql/posts'
import useGalleryScroll from '../hooks/useGalleryScroll'
import Thumbnail from './Thumbnail'
import Modal from './Modal'
import PostModal from './PostModal'
import InfiniteScroll from 'react-infinite-scroll-component'

interface HeroProps {
  scrollQuery: {
    query: DocumentNode
    variables?: {
      [key: string]: string | number
    }
  }
  initialPosts?: Post[]
}

const Gallery = ({ scrollQuery, initialPosts }: HeroProps) => {
  const router = useRouter()
  const [activePost, setActivePost] = useState<Post | null>(null)
  const [incrementViews] = useMutation(INCREMENT_VIEWS)
  const { posts, handleRefresh } = useGalleryScroll(scrollQuery, initialPosts)
  const { innerWidth } = useWindowSize()

  const handleImageClick = (post: Post) => {
    if (!innerWidth) return

    incrementViews({ variables: { id: post.id } })

    if (innerWidth < 768) {
      return router.push(`/photo/${post.id}`)
    }

    router.push({}, `/photo/${post.id}`, { scroll: false })
    setActivePost(post)
  }

  return (
    <>
      {posts && posts.length !== 0 ? (
        <InfiniteScroll
          dataLength={posts.length}
          next={handleRefresh}
          hasMore={true}
          loader={
            <p>Onsplash. Make something great. Or whatever their slogan is.</p>
          }
          className="max-w-7xl mx-auto md:px-5 w-full md:grid md:grid-cols-3 md:grid-rows-1 md:gap-5"
        >
          {splitArrayToThreeSubArrays(posts).map((splitPosts, i) => (
            <div key={i} className="grid grid-cols-1 h-fit gap-5">
              {splitPosts.map((post) => (
                <Thumbnail
                  key={post.id}
                  post={post}
                  onImageClick={() => handleImageClick(post)}
                />
              ))}
            </div>
          ))}
        </InfiniteScroll>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 mt-24">
          <QuestionMarkCircleIcon className="w-8 text-primary" />
          <p className="text-xl">Hmmmm... We couldn't find any photos.</p>
        </div>
      )}
      <Modal
        isOpen={Boolean(activePost)}
        onClose={() => {
          setActivePost(null)
          router.push({}, '', { scroll: false })
        }}
      >
        {activePost && <PostModal post={activePost} />}
      </Modal>
    </>
  )
}

export default Gallery
