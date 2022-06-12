import {
  ButtonHTMLAttributes,
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef
} from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variation: 'outline' | 'filled' | 'gray-hover'
  children: ReactNode
  ref: string
}

const ButtonElement: ForwardRefRenderFunction<HTMLInputElement, ButtonProps> = (
  { variation = 'outline', children, ...rest },
  ref
) => {
  const styles = () => {
    if (variation === 'filled') {
      return 'bg-black text-white py-3 disabled:bg-gray-600'
    }

    if (variation === 'outline') {
      return 'font-semibold text-primary border border-text hover:border-text-hover hover:text-primary-hover py-2'
    }

    if (variation === 'gray-hover') {
      return 'text-sm text-gray-500 border border-text hover:bg-gray-100 py-2'
    }
  }

  return (
    <button className={`rounded px-3 transition-fast ${styles()}`} {...rest}>
      {children}
    </button>
  )
}

const Button = forwardRef(ButtonElement)

export default Button
