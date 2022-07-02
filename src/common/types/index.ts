import { User } from '@nhost/core'

export interface Post {
  id: string
  description?: string
  created_at: string
  user_id: string
  views: number
  user: User
  image: {
    url: string
    width: number
    height: number
  }
  tags?: string[]
  location?: string
}
