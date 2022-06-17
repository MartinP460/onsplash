import { Post } from '../types/index'
import {
  HeartIcon,
  PlusIcon,
  DotsHorizontalIcon,
  ShareIcon,
  InformationCircleIcon,
  CalendarIcon
} from '@heroicons/react/solid'
import TimeAgo from 'react-timeago'
import Avatar from './Avatar'
import Button from './Button'

interface PostModalProps {
  post: Post
}

const PostModal = ({ post }: PostModalProps) => {
  return (
    <>
      <div className="flex justify-between">
        <Avatar user={post.user} />
        <div className="flex gap-2 items-center">
          <Button variation="outline">
            <HeartIcon className="h-5 w-5" />
          </Button>
          <Button variation="outline">
            <PlusIcon className="h-5 w-5" />
          </Button>
          <Button variation="outline">Download</Button>
        </div>
      </div>
      <img
        src={post.url}
        alt={post.description}
        className="max-h-[75%] mt-4 mx-auto"
      />
      <div className="flex justify-between mt-5">
        <div className="flex gap-x-4 sm:gap-x-8 md:gap-x-24">
          <span>
            <p className="text-sm text-primary w-fit">Views</p>
            <p className="font-semibold">{post.views}</p>
          </span>
          <span>
            <p className="text-sm text-primary w-fit">Downloads</p>
            <p className="font-semibold">--</p>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variation="outline"
            className="inline-flex gap-2 items-center"
          >
            <ShareIcon className="h-5 w-5" />
            <p className="hidden md:inline">Share</p>
          </Button>
          <Button
            variation="outline"
            className="inline-flex gap-2 items-center"
          >
            <InformationCircleIcon className="h-5 w-5" />
            <p className="hidden md:inline">Info</p>
          </Button>
          <Button variation="outline">
            <DotsHorizontalIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="flex mt-4">
        <div className="w-full">
          <span className="inline-flex items-center text-primary gap-2">
            <CalendarIcon className="h-4 w-4" />
            <TimeAgo date={post.created_at} />
          </span>
        </div>
        <div className="w-full text-sm">{post.description}</div>
      </div>
    </>
  )
}

export default PostModal
