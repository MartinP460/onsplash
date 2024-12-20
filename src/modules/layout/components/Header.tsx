import { useUserContext } from 'common/context/userContext'
import Link from 'next/link'
import Image from 'next/image'
import Searchbar from 'common/components/Searchbar'
import Menu from './Menu'
import NavLink from './NavLink'
import ProfileDropdown from './ProfileDropdown'
import SubmitButton from '../../submit/components/SubmitButton'

const Header = () => {
  const user = useUserContext()

  return (
    <header>
      <div className="flex items-center p-2 px-3 gap-3">
        <div className="flex-none">
          <Link href="/">
            <Image
              src="/images/onsplash.png"
              width={32}
              height={32}
              alt="Onsplash logo"
            />
          </Link>
        </div>
        <Searchbar />
        <nav className="mx-2 md:mx-6">
          <ul className="flex whitespace-nowrap md:gap-8 items-center">
            {user ? (
              <>
                <li>
                  <SubmitButton className="hidden md:block" />
                </li>
                <li>
                  <ProfileDropdown user={user} />
                </li>
              </>
            ) : (
              <>
                <li className="hidden md:block">
                  <NavLink href="/explore">Explore</NavLink>
                </li>
                <div className="w-[1px] h-8 bg-text"></div>
                <div className="items-center gap-3 hidden md:flex">
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
