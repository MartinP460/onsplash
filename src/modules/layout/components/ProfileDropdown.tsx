import { Popover } from '@headlessui/react'
import { User } from '@nhost/core'
import { useSignOut } from '@nhost/react'
import Link from 'next/link'
import AvatarIcon from 'common/components/AvatarIcon'
import SubmitButton from '../../submit/components/SubmitButton'
import DropdownTransition from './DropdownTransition'

interface ProfileIconProps {
  user: User
}

const ProfileDropdown = ({ user }: ProfileIconProps) => {
  const { signOut } = useSignOut()

  return (
    <Popover className="relative">
      <Popover.Button className="outline-none flex items-center">
        <AvatarIcon url={user.avatarUrl} className="w-8 h-8" />
      </Popover.Button>
      <DropdownTransition>
        <Popover.Panel className="absolute z-50 top-12 border right-0 border-text rounded bg-white py-1 shadow-lg w-[250px] md:w-[178px]">
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
                <a className="block h-full no-underline text-gray-500">
                  Account
                </a>
              </Link>
            </li>
            <li className="flex justify-center px-3 py-2 md:hidden">
              <SubmitButton />
            </li>
            <div className="bg-text h-0.5 my-1" />
            <li className="py-2 px-3 my-1 hover:bg-gray-100 transition-fast">
              <Link href="/account">
                <button
                  className="block h-full no-underline text-gray-500 w-full text-left"
                  onClick={() => signOut()}
                >
                  Logout {user.displayName}
                </button>
              </Link>
            </li>
          </ul>
        </Popover.Panel>
      </DropdownTransition>
    </Popover>
  )
}

export default ProfileDropdown
