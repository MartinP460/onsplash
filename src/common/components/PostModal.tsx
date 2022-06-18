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
  post: Post | undefined
}

const PostModal = ({ post }: PostModalProps) => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between mx-4">
        {post ? (
          <Avatar user={post.user} />
        ) : (
          <div className="h-4 w-1/2 bg-gray-300 rounded" />
        )}
        <div className="flex gap-2 items-center mt-2 justify-between">
          <div className="flex gap-2">
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
      {post ? (
        <img
          src={post.url}
          alt={post.description}
          className="max-h-[70vh] mt-4 mx-auto"
        />
      ) : (
        <div className="h-[400px] mt-4 w-full bg-gray-300 rounded" />
      )}
      <div className="flex justify-between mt-5 mx-4">
        <div className="flex flex-col gap-x-24 md:flex-row gap-y-6">
          {post ? (
            <span>
              <p className="text-sm text-primary w-fit">Views</p>
              <p className="font-semibold">{post.views}</p>
            </span>
          ) : (
            <div className="h-2 bg-gray-300 rounded" />
          )}
          {post ? (
            <span>
              <p className="text-sm text-primary w-fit">Downloads</p>
              <p className="font-semibold">--</p>
            </span>
          ) : (
            <div className="h-2 bg-gray-300 rounded" />
          )}
        </div>
        <div className="flex items-start gap-2 md:items-center">
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
      <div className="flex flex-col mt-6 gap-6 mb-4 mx-4 md:flex-row">
        <div className="w-full">
          {post ? (
            <span className="inline-flex items-center text-primary gap-2">
              <CalendarIcon className="h-4 w-4" />
              <TimeAgo date={post.created_at} />
            </span>
          ) : (
            <div className="h-4 w-1/2 bg-gray-300 rounded" />
          )}
        </div>
        {post ? (
          <div className="w-full text-sm">{post.description}</div>
        ) : (
          <div className="h-4 w-1/2 bg-gray-300 rounded" />
        )}
      </div>
    </>
  )
}

export default PostModal
