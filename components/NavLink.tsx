import { ReactNode } from 'react'
import Link from 'next/link'

interface NavLinkProps {
  href: string
  children: ReactNode
}

function NavLink({ href, children, ...rest }: NavLinkProps) {
  return (
    <Link href={href} {...rest}>
      <a className="text-primary font-semibold hover:text-primary-hover">
        {children}
      </a>
    </Link>
  )
}

export default NavLink
