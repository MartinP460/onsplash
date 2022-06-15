import { User } from '@nhost/core'

export interface Post {
  id: string
  description: string
  url: string
  createdAt: string
  user_id: string
  views: number
  user: User
}
