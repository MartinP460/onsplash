import Image from 'next/image'
import { UserCircleIcon } from '@heroicons/react/solid'

interface AvatarIconProps {
  url?: string
  width?: number
}

const AvatarIcon = ({ url, width = 32 }: AvatarIconProps) => {
  // check whether the user has submitted an avatar and if not, use an icon
  const avatarExists = url && !(url.slice(-5) === 'blank')

  const twWidth = Math.round(width / 4)

  if (avatarExists) {
    return (
      <Image src={url} width={width} height={width} className="rounded-full" />
    )
  }

  return <UserCircleIcon className={`w-${twWidth} h-${twWidth} text-primary`} />
}

export default AvatarIcon
