import { useAuthenticationStatus, useSignOut } from '@nhost/nextjs'
import Link from 'next/link'
import { AcademicCapIcon } from '@heroicons/react/solid'
import Searchbar from './Searchbar'
import Menu from './Menu'

function Header() {
  const { isAuthenticated } = useAuthenticationStatus()
  const { signOut } = useSignOut()

  return (
    <header>
      <div className="flex items-center p-2 px-3 gap-3">
        <div className="flex-none">
          <Link href="/">
            <AcademicCapIcon className="w-8 h-8" />
          </Link>
        </div>
        <Searchbar />
        <Menu />
      </div>
    </header>
  )
}

export default Header
