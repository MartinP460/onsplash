import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactNode
} from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  altLabel?: ReactNode
  error?: string | undefined
  className?: string
  ref: string
}

const InputElement: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, altLabel, error = '', className = '', ...rest },
  ref
) => {
  return (
    <div className="w-full">
      <label>
        <div className="flex justify-between">
          <span>{label}</span>
          {altLabel && <span>{altLabel}</span>}
        </div>
        <input
          {...rest}
          name={name}
          ref={ref}
          className={`block w-full border border-black mt-2 rounded ${className} ${
            error && 'border-red-500'
          }`}
        />
      </label>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  )
}

const Input = forwardRef(InputElement)

export default Input
