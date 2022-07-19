import { Post } from '../../../common/types/index'
import { CalendarIcon, LocationMarkerIcon } from '@heroicons/react/solid'
import TimeAgo from 'react-timeago'
import Avatar from '../../../common/components/Avatar'
import LikeButton from './LikeButton'
import DownloadButton from './DownloadButton'

interface PostModalProps {
  post: Post
}

const PostModal = ({ post }: PostModalProps) => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between mx-4">
        <Avatar user={post.user} />
        <div className="flex gap-2 items-center mt-4 justify-between">
          <div className="flex gap-2">
            <LikeButton
              postId={post.id}
              likes={post.likes}
              className="bg-white border-2"
            />
          </div>
          <DownloadButton
            postId={post.id}
            url={post.image.url}
            className="bg-white"
          />
        </div>
      </div>
      <div className="mt-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image.url}
          alt={post.description}
          className="max-h-[80vh] md:max-h-[70vh] mx-auto"
        />
      </div>
      <div className="flex justify-between mt-5 mx-4">
        <div className="flex flex-col gap-x-24 md:flex-row gap-y-6">
          <span>
            <p className="text-sm text-primary w-fit">Views</p>
            <p className="font-semibold">{post.views}</p>
          </span>
          <span>
            <p className="text-sm text-primary w-fit">Downloads</p>
            <p className="font-semibold">{post.downloads}</p>
          </span>
        </div>
      </div>
      <div className="flex flex-col mt-6 gap-6 mb-4 mx-4 md:flex-row">
        <div className="w-full flex flex-col gap-y-2">
          <span className="inline-flex items-center text-primary gap-2">
            <CalendarIcon className="w-4" />
            <TimeAgo date={post.created_at} />
          </span>
          {post.location && (
            <span className="inline-flex items-center text-primary gap-2">
              <LocationMarkerIcon className="w-4" />
              <p>{post.location}</p>
            </span>
          )}
        </div>
        <div className="w-full text-sm">{post.description}</div>
      </div>
    </>
  )
}

export default PostModal
