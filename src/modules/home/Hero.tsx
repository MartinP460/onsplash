import { Post } from '../../common/types/index'
import Image from 'next/image'

interface HeroProps {
  post: Post
}

const Hero = ({ post }: HeroProps) => {
  return (
    <div className="relative text-white leading-relaxed md:h-[500px] md:mb-10">
      <div className="px-4 pt-10 pb-16">
        <h1 className="text-2xl font-bold mb-2">Unsplash</h1>
        <p>Not the internet's source of freely-usable images.</p>
        <p>Powered by creators and one developer.</p>
      </div>
      <Image
        src={post.url}
        layout="fill"
        objectFit="cover"
        priority
        className="-z-10 brightness-50 absolute"
      />
    </div>
  )
}

export default Hero
