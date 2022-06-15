import { Post } from '../../common/types/index'
import { splitArrayToThreeSubArrays } from '../../common/utils/helpers'

interface HeroProps {
  posts: Post[]
}

const Gallery = ({ posts }: HeroProps) => {
  const postsArray = posts ? splitArrayToThreeSubArrays(posts) : null

  console.log(postsArray)

  return (
    <div className="max-w-7xl mx-auto px-5 mt-10 w-full grid grid-cols-3 grid-rows-1 gap-5">
      {postsArray?.map((splitPosts, i) => (
        <div key={i} className="grid grid-cols-1 h-fit gap-5">
          {splitPosts.map((post) => (
            <img
              key={post.id}
              src={post.url}
              alt={post.description}
              className="object-contain hover:cursor-zoom-in"
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Gallery
