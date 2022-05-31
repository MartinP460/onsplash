import { useForm, SubmitHandler } from 'react-hook-form'
import { useSignInEmailPassword } from '@nhost/nextjs'
import { useRouter } from 'next/router'
import Link from 'next/link'

type FormValues = {
  email: string
  password: string
}

function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>()
  const router = useRouter()

  const {
    signInEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error
  } = useSignInEmailPassword()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { email, password } = data
    await signInEmailPassword(email, password)
  }

  const disableForm = isLoading || needsEmailVerification

  if (isSuccess) {
    router.push('/')
  }

  if (needsEmailVerification) {
    return (
      <p>
        An email has been sent to your email address. Please click the link in
        the email to verify your email address.
      </p>
    )
  }

  return (
    <div className="w-1/2 mx-auto mt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Email"
          {...register('email', { required: true })}
          className="p-2 border-2 border-gray-400 rounded"
        />
        {errors.email && <span>This field is required.</span>}
        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: true })}
          className="p-2 border-2 border-gray-400 rounded"
        />
        {errors.email && <span>This field is required.</span>}
        <button type="submit" disabled={disableForm} className="bg-blue">
          {isLoading ? 'Loading...' : 'Sign In'}
        </button>
        {isError && <p>{error?.message}</p>}
      </form>
      <p>
        No account yet?{' '}
        <Link href="/sign-up">
          <a>Sign up</a>
        </Link>
      </p>
    </div>
  )
}

export default Signin
