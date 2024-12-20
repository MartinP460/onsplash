import { useState } from 'react'
import { Post } from 'common/types/index'
import Image from 'next/image'
import Avatar from 'common/components/Avatar'
import LikeButton from './LikeButton'
import DownloadButton from './DownloadButton'

interface ThumbnailProps {
  post: Post
  onImageClick: () => void
}

const Thumbnail = ({ post, onImageClick }: ThumbnailProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex flex-col mt-8 md:mt-0">
      <div className="mx-2 mb-2 md:hidden">
        <Avatar user={post.user} />
      </div>
      <a
        onClick={onImageClick}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative hover:cursor-zoom-in leading-none"
      >
        <Image
          src={post.image.url}
          width={post.image.width}
          height={post.image.height}
          alt={post.description || ''}
          objectFit="contain"
          className="z-20"
        />
        <div
          className={`absolute transition-all w-full h-full z-30 left-0 top-0 p-4 flex flex-col justify-between hover:bg-gradient-to-b from-black/40 via-black/5 to-black/40 ${
            isHovered ? 'block' : 'hidden'
          }`}
        >
          <LikeButton
            postId={post.id}
            likes={post.likes}
            className="self-end border-0 bg-gray-200 hover:bg-white"
          />
          <div className="flex justify-between">
            <Avatar user={post.user} textColor="white" />
            <DownloadButton
              postId={post.id}
              url={post.image.url}
              className="bg-gray-200 hover:bg-white"
            />
          </div>
        </div>
      </a>
      <div className="mx-2 mt-2 flex justify-between md:hidden">
        <LikeButton
          postId={post.id}
          likes={post.likes}
          className="bg-white border-2"
        />
        <DownloadButton
          postId={post.id}
          url={post.image.url}
          className="bg-white"
        />
      </div>
    </div>
  )
}

export default Thumbnail
