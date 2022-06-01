import { useAuthenticationStatus } from '@nhost/nextjs'
import Link from 'next/link'
import { AcademicCapIcon } from '@heroicons/react/solid'
import { useUserContext } from '../utils/UserProvider'
import Searchbar from './Searchbar'
import Menu from './Menu'
import NavLink from './NavLink'
import Button from './Button'
import ProfileIcon from './ProfileIcon'

function Header() {
  const user = useUserContext()
  const { isAuthenticated } = useAuthenticationStatus()

  return (
    <header>
      <div className="flex items-center p-2 px-3 gap-3">
        <div className="flex-none">
          <Link href="/">
            <a>
              <AcademicCapIcon className="w-8 h-8" />
            </a>
          </Link>
        </div>
        <Searchbar />
        <nav className="hidden md:block mx-6">
          <ul className="flex whitespace-nowrap gap-8 items-center">
            {isAuthenticated ? (
              <>
                <li>
                  <Button>Submit a photo</Button>
                </li>
                <li>
                  <ProfileIcon avatarUrl={user?.avatarUrl} />
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink href="/explore">Explore</NavLink>
                </li>
                <div className="w-[1px] h-8 bg-text"></div>
                <div className="flex items-center gap-3">
                  <li>
                    <NavLink href="/login">Log in</NavLink>
                  </li>
                  <span>/</span>
                  <li>
                    <NavLink href="/signup">Sign up</NavLink>
                  </li>
                </div>
              </>
            )}
          </ul>
        </nav>
        <Menu />
      </div>
    </header>
  )
}

export default Header
