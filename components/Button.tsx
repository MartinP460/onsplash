import {
  ButtonHTMLAttributes,
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef
} from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variation: 'outline' | 'filled'
  children: ReactNode
  ref: string
}

const ButtonElement: ForwardRefRenderFunction<HTMLInputElement, ButtonProps> =
  function ({ variation = 'outline', children, ...rest }, ref) {
    const styles = () => {
      if (variation === 'filled') {
        return 'bg-black text-white py-3 disabled:bg-gray-600 transition-fast'
      }

      return 'font-semibold text-primary border border-text hover:border-text-hover hover:text-primary-hover py-2'
    }

    return (
      <button className={`rounded px-3 ${styles()}`} {...rest}>
        {children}
      </button>
    )
  }

const Button = forwardRef(ButtonElement)

export default Button
