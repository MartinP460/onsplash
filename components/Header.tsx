import Link from 'next/link'
import { useAuthenticationStatus, useSignOut } from '@nhost/nextjs'

function Header() {
  const { isAuthenticated } = useAuthenticationStatus()
  const { signOut } = useSignOut()

  return (
    <header className="bg-gray-200">
      <div className="flex justify-end">
        <div className="flex items-center">
          {isAuthenticated ? (
            <>
              <Link href="/profile">
                <a className="px-4 py-2 text-sm font-medium text-gray-800">
                  Profile
                </a>
              </Link>
              <button
                onClick={signOut}
                className="px-4 py-2 text-sm font-medium text-gray-800"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <a className="px-4 py-2 text-sm font-medium text-gray-800">
                  Log in
                </a>
              </Link>
              <Link href="/signup">
                <a className="px-4 py-2 text-sm font-medium text-gray-800">
                  Sign up
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
