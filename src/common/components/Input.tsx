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
  ref: string
  error?: string | undefined
}

const InputElement: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, altLabel, error, ...rest },
  ref
) => {
  return (
    <div>
      <label>
        <div className="flex justify-between">
          <span>{label}</span>
          {altLabel && <span>{altLabel}</span>}
        </div>
        <input
          {...rest}
          name={name}
          ref={ref}
          className={`block w-full border border-black mt-2 p-3 rounded ${
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
