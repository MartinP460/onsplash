import { Popover } from '@headlessui/react'
import AvatarIcon from '../../../common/components/AvatarIcon'
import { User } from '@nhost/core'

interface ProfileIconProps {
  user: User
}

const ProfileDropdown = ({ user }: ProfileIconProps) => {
  return (
    <Popover className="relative">
      <Popover.Button className="outline-none flex items-center">
        <AvatarIcon url={user?.avatarUrl} />
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

export default ProfileDropdown
