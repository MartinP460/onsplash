import { ReactNode } from 'react'
import NextLink from 'next/link'

interface LinkProps {
  href: string
  children: ReactNode
}

function Link({ href, children }: LinkProps) {
  return (
    <NextLink href={href}>
      <a className="underline text-gray-500">{children}</a>
    </NextLink>
  )
}

export default Link
