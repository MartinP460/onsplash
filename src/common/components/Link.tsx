import { ReactNode } from 'react'
import NextLink from 'next/link'

interface LinkProps {
  href: string
  className?: string
  children: ReactNode
}

const Link = ({ href, className, children }: LinkProps) => {
  return (
    <NextLink href={href}>
      <a className={`underline text-gray-500 ${className}`}>{children}</a>
    </NextLink>
  )
}

export default Link
