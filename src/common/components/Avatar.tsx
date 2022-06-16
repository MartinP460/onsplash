import { User } from '@nhost/core'
import AvatarIcon from './AvatarIcon'

interface AvatarProps {
  user: User
}

const Avatar = ({ user }: AvatarProps) => {
  return (
    <div className="flex items-center">
      <AvatarIcon url={user.avatarUrl} />
      <p className="ml-2 font-semibold">{user.displayName}</p>
    </div>
  )
}

export default Avatar
