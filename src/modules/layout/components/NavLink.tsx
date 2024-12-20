import { ReactNode } from 'react'
import Link from 'next/link'

interface NavLinkProps {
  href: string
  children: ReactNode
}

const NavLink = ({ href, children, ...rest }: NavLinkProps) => {
  return (
    <Link
      href={href}
      {...rest}
      className="text-primary font-semibold hover:text-primary-hover"
    >
      {children}
    </Link>
  )
}

export default NavLink
