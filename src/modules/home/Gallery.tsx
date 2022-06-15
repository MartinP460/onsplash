import { Post } from '../../common/types/index'
import { splitArrayToThreeSubArrays } from '../../common/utils/helpers'
import { useState } from 'react'
import PostModal from '../../common/components/PostModal'

interface HeroProps {
  posts: Post[]
}

const Gallery = ({ posts }: HeroProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activePost, setActivePost] = useState<Post | null>(null)

  const postsArray = posts ? splitArrayToThreeSubArrays(posts) : null

  const handleModalOpen = (post: Post) => {
    setActivePost(post)
    setIsOpen(true)
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-5 mt-10 w-full grid grid-cols-3 grid-rows-1 gap-5">
        {postsArray?.map((splitPosts, i) => (
          <div key={i} className="grid grid-cols-1 h-fit gap-5">
            {splitPosts.map((post) => (
              <img
                key={post.id}
                src={post.url}
                alt={post.description}
                onClick={() => handleModalOpen(post)}
                className="object-contain hover:cursor-zoom-in"
              />
            ))}
          </div>
        ))}
      </div>
      <PostModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        post={activePost}
      />
    </>
  )
}

export default Gallery
