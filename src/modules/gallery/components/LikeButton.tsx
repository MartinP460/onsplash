import { SyntheticEvent, useState } from 'react'
import { useUserContext } from '../../../common/context/userContext'
import { useMutation } from '@apollo/client'
import { LIKE_POST, UNLIKE_POST } from '../../../common/graphql/posts'
import { HeartIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import useToast from '../../../common/hooks/useToast'
import Button from '../../../common/components/Button'

interface LikeButton {
  postId: string
  likes: string[]
  className?: string
}

const LikeButton = ({ postId, likes, className }: LikeButton) => {
  const user = useUserContext()
  const router = useRouter()
  const toast = useToast()
  const [liked, setLiked] = useState(user ? likes.includes(user?.id) : false)

  const [likePost, { error: likeError }] = useMutation(LIKE_POST, {
    variables: { postId, userId: user?.id }
  })
  const [unlikePost, { error: unlikeError }] = useMutation(UNLIKE_POST, {
    variables: { postId, userId: user?.id }
  })

  if (likeError) {
    toast('error', 'There was an error liking the image.')
    setLiked(false)
  }

  if (unlikeError) {
    toast('error', 'There was an error removing the like from the image.')
    setLiked(true)
  }

  const handleClick = (e: SyntheticEvent) => {
    e.stopPropagation()
    if (user) {
      if (liked) {
        unlikePost()
        setLiked(false)
      } else {
        likePost()
        setLiked(true)
      }
    } else {
      router.push('/login')
    }
  }

  return (
    <Button
      variation="outline"
      className={`hover:bg-white hover:cursor-pointer ${
        liked ? '!bg-red-500 !hover:bg-red-600' : 'bg-gray-200 hover:bg-white'
      } ${className}`}
      onClick={(e) => handleClick(e)}
    >
      <HeartIcon className={`w-5 ${liked ? 'text-gray-200' : ''}`} />
    </Button>
  )
}

export default LikeButton
