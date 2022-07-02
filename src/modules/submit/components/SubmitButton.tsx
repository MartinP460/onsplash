import Link from 'next/link'

interface SubmitButtonProps {
  className?: string
}

const SubmitButton = ({ className }: SubmitButtonProps) => {
  return (
    <Link
      href={{
        query: 'submit'
      }}
      shallow
    >
      <a
        className={`flex justify-center font-semibold text-primary border border-text hover:border-text-hover hover:text-primary-hover py-1 w-full rounded px-3 transition-fast ${className}`}
      >
        Submit a photo
      </a>
    </Link>
  )
}

export default SubmitButton
