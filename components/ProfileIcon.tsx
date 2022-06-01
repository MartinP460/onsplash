import { Popover } from '@headlessui/react'
import Image from 'next/image'
import { UserCircleIcon } from '@heroicons/react/solid'

interface ProfileIconProps {
  avatarUrl: string
}

function ProfileIcon({ avatarUrl }: ProfileIconProps) {
  const avatarExists = avatarUrl && !(avatarUrl.slice(-5) === 'blank')

  return (
    <Popover className="relative">
      <Popover.Button className="outline-none">
        {avatarExists ? (
          <Image src={avatarUrl} width={32} height={32} alt="Your avatar" />
        ) : (
          <UserCircleIcon className="w-9 h-9 text-primary" />
        )}
      </Popover.Button>
      <Popover.Panel className="absolute z-10 top-12 border right-0 border-gray-200 rounded p-4 bg-white">
        <ul>
          <li>Placeholder</li>
          <li>Placeholder</li>
          <li>Placeholder</li>
          <li>Placeholder</li>
        </ul>
      </Popover.Panel>
    </Popover>
  )
}

export default ProfileIcon
