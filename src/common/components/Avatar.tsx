import { User } from '@nhost/core'
import AvatarIcon from './AvatarIcon'

interface AvatarProps {
  user: User
}

const Avatar = ({ user }: AvatarProps) => {
  return (
    <div className="flex items-center">
      <AvatarIcon url={user.avatarUrl} className="w-8 h-8" />
      <p className="ml-2 font-semibold">{`${user.metadata.firstName} ${user.metadata.lastName}`}</p>
    </div>
  )
}

export default Avatar
