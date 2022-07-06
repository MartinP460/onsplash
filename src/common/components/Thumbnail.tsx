import { useState } from 'react'
import { Post } from '../types/index'
import { HeartIcon, DownloadIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Avatar from './Avatar'
import LikeButton from './LikeButton'
import DownloadButton from './DownloadButton'
import Button from './Button'

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
          alt={post.description}
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
            className="self-end"
          />
          <div className="flex justify-between">
            <Avatar user={post.user} textColor="white" />
            <DownloadButton url={post.image.url} />
          </div>
        </div>
      </a>
      <div className="mx-2 mt-2 flex justify-between md:hidden">
        <Button variation="outline">
          <HeartIcon className="h-5 w-5" />
        </Button>
        <Button variation="outline">Download</Button>
      </div>
    </div>
  )
}

export default Thumbnail
