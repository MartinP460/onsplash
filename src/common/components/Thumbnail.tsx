import { useState } from 'react'
import { Post } from '../types/index'
import { HeartIcon, DownloadIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Avatar from './Avatar'
import LikeButton from './LikeButton'
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
      <div
        onClick={onImageClick}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative hover:cursor-zoom-in"
      >
        <Image
          src={post.image.url}
          width={post.image.width}
          height={post.image.height}
          alt={post.description}
          objectFit="contain"
          className="static z-20"
        />
        <div
          className={`absolute w-full h-full z-30 left-0 top-0 p-4 flex flex-col justify-between ${
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
            <Button
              variation="outline"
              className="bg-gray-200 hover:cursor-pointer"
            >
              <DownloadIcon className="w-5" />
            </Button>
          </div>
        </div>
      </div>
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
