import {
  ButtonHTMLAttributes,
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef
} from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variation: 'outline' | 'filled' | 'gray-hover'
  className?: string
  children: ReactNode
  ref: string
}

const ButtonElement: ForwardRefRenderFunction<HTMLInputElement, ButtonProps> = (
  { variation = 'outline', className = '', children, ...rest },
  ref
) => {
  const styles = () => {
    let style = ''

    if (variation === 'filled') {
      style = 'bg-black text-white py-3 disabled:bg-gray-600'
    }

    if (variation === 'outline') {
      style =
        'font-semibold text-primary border border-text hover:border-text-hover hover:text-primary-hover py-1'
    }

    if (variation === 'gray-hover') {
      style = 'text-sm text-gray-500 border border-text hover:bg-gray-100 py-2'
    }

    return style.concat(' ' + className)
  }

  return (
    <button className={`rounded px-3 transition-fast ${styles()}`} {...rest}>
      {children}
    </button>
  )
}

const Button = forwardRef(ButtonElement)

export default Button
