import { Post } from '../types/index'
import Image from 'next/image'
import Searchbar from './Searchbar'
import Link from './Link'

interface HeroProps {
  post: Post
}

const Hero = ({ post }: HeroProps) => {
  return (
    <div className="relative leading-relaxed h-[325px] md:h-[625px] md:mb-10">
      <Image
        src={post.image.url}
        layout="fill"
        objectFit="cover"
        priority
        alt={post.description || ''}
        className="-z-10 brightness-50 absolute"
      />
      <div className="h-full absolute text-white flex items-end pb-4 px-4">
        <p className="text-primary inline">
          <Link
            href={`/photo/${post.id}`}
            className="text-gray-200 no-underline"
          >
            Photo
          </Link>{' '}
          by{' '}
          <Link
            href={`/profile/${post.user.displayName}`}
            className="text-gray-200 no-underline"
          >
            <>
              {post.user.metadata.firstName} {post.user.metadata.lastName}
            </>
          </Link>
        </p>
      </div>
      <div className="h-full w-full max-w-4xl mx-auto flex flex-col justify-center px-8">
        <h1 className="text-4xl font-bold mb-6 text-white">Onsplash</h1>
        <p className="text-white">
          Probably not the internet&apos;s source of freely-usable images.
        </p>
        <p className="text-white mb-4 mt-1">
          Powered by creators and one developer.
        </p>
        <Searchbar className="hover:!bg-gray-200 rounded-sm py-2 hidden md:block" />
      </div>
    </div>
  )
}

export default Hero
