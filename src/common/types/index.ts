import { User } from '@nhost/core'

interface PostData {
  id: string
  description: string
  url: string
  createdAt: string
  user_id: string
  views: number
  user: User
}

export type Post = PostData
