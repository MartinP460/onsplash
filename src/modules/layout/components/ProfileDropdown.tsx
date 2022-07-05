import { Popover } from '@headlessui/react'
import { User } from '@nhost/core'
import Link from 'next/link'
import AvatarIcon from '../../../common/components/AvatarIcon'
import SubmitButton from '../../submit/components/SubmitButton'

interface ProfileIconProps {
  user: User
}

const ProfileDropdown = ({ user }: ProfileIconProps) => {
  return (
    <Popover className="relative">
      <Popover.Button className="outline-none flex items-center">
        <AvatarIcon url={user.avatarUrl} className="w-8 h-8" />
      </Popover.Button>
      <Popover.Panel className="absolute z-10 top-12 border right-0 border-text rounded bg-white py-1 shadow-lg w-[250px] md:w-[178px]">
        <ul>
          <li className="py-2 px-3 my-1 hover:bg-gray-100 transition-fast">
            <Link href={`/profile/${user.displayName}`}>
              <a className="block h-full no-underline text-gray-500">
                View profile
              </a>
            </Link>
          </li>
          <li className="py-2 px-3 my-1 hover:bg-gray-100 transition-fast">
            <Link href="/account">
              <a className="block h-full no-underline text-gray-500">Account</a>
            </Link>
          </li>
          <li className="flex justify-center px-3 py-2 md:hidden">
            <SubmitButton />
          </li>
          <div className="bg-text h-0.5 my-1" />
          <li className="py-2 px-3 my-1 hover:bg-gray-100 transition-fast">
            <Link href="/account">
              <button className="block h-full no-underline text-gray-500">
                <>Logout {user.metadata.username}</>
              </button>
            </Link>
          </li>
        </ul>
      </Popover.Panel>
    </Popover>
  )
}

export default ProfileDropdown
