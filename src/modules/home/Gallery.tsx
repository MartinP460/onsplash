import { Post } from '../../common/types/index'
import { splitArrayToThreeSubArrays } from '../../common/utils/helpers'
import { useState } from 'react'
import Thumbnail from '../../common/components/Thumbnail'
import Modal from '../../common/components/Modal'
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
      <div className="max-w-7xl mx-auto md:px-5 w-full md:grid md:grid-cols-3 md:grid-rows-1 md:gap-5">
        {postsArray?.map((splitPosts, i) => (
          <div key={i} className="grid grid-cols-1 h-fit gap-5">
            {splitPosts.map((post) => (
              <Thumbnail
                key={post.id}
                post={post}
                onImageClick={() => handleModalOpen(post)}
              />
            ))}
          </div>
        ))}
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {activePost && <PostModal post={activePost} />}
      </Modal>
    </>
  )
}

export default Gallery
