import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
}

function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      className="font-semibold text-primary border border-text hover:border-text-hover hover:text-primary-hover py-2 px-3 rounded"
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
