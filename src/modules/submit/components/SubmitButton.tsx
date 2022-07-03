import Link from 'next/link'
import { useRouter } from 'next/router'

interface SubmitButtonProps {
  className?: string
}

const SubmitButton = ({ className }: SubmitButtonProps) => {
  const router = useRouter()

  return (
    <Link
      href={{
        query: {
          ...router.query,
          submit: ''
        }
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
