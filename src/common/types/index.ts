import { User } from '@nhost/core'

export interface Post {
  id: string
  description: string
  url: string
  created_at: string
  user_id: string
  views: number
  user: User
}
