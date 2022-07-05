import Image from 'next/image'
import { UserCircleIcon } from '@heroicons/react/solid'

interface AvatarIconProps {
  url?: string
  className?: string
}

const AvatarIcon = ({ url, className }: AvatarIconProps) => {
  // check whether the user has submitted an avatar and if not, use an icon
  const avatarExists = url && !(url.slice(-5) === 'blank')

  if (avatarExists) {
    return (
      <Image
        src={url}
        width={200}
        height={200}
        className={`rounded-full ${className}`}
      />
    )
  }

  return <UserCircleIcon className={`text-primary ${className}`} />
}

export default AvatarIcon
