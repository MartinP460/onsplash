import { Post } from '../types/index'
import { HeartIcon, PlusIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Avatar from './Avatar'
import Button from './Button'

interface ThumbnailProps {
  post: Post
  onImageClick: () => void
}

const Thumbnail = ({ post, onImageClick }: ThumbnailProps) => {
  return (
    <div className="flex flex-col mt-8 md:mt-0">
      <div className="mx-2 mb-2 md:hidden">
        <Avatar user={post.user} />
      </div>
      <div className="relative">
        <Image
          src={post.image.url}
          width={post.image.width}
          height={post.image.height}
          alt={post.description}
          onClick={onImageClick}
          objectFit="contain"
          className="hover:cursor-zoom-in"
        />
      </div>
      <div className="mx-2 mt-2 flex justify-between md:hidden">
        <div className="flex gap-3">
          <Button variation="outline">
            <HeartIcon className="h-5 w-5" />
          </Button>
          <Button variation="outline">
            <PlusIcon className="h-5 w-5" />
          </Button>
        </div>
        <Button variation="outline">Download</Button>
      </div>
    </div>
  )
}

export default Thumbnail
