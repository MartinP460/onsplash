import { useForm, SubmitHandler } from 'react-hook-form'
import { useSignInEmailPassword } from '@nhost/nextjs'
import { useRouter } from 'next/router'
import { AcademicCapIcon } from '@heroicons/react/solid'
import Link from '../common/components/Link'
import Input from '../common/components/Input'
import Button from '../common/components/Button'

type FormValues = {
  email: string
  password: string
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<FormValues>()
  const router = useRouter()

  const { signInEmailPassword, isLoading, isSuccess, isError, error } =
    useSignInEmailPassword()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { email, password } = data
    try {
      await signInEmailPassword(email, password)
    } catch {
      // display error toast
    }
  }

  if (isSuccess) {
    router.push('/')
  }

  const disableForm = isLoading || !isDirty

  return (
    <div className="flex items-center h-screen">
      <div className="flex flex-col items-center w-screen p-3 md:w-3/5 lg:w-2/5 mx-auto">
        <div className="flex flex-col items-center ">
          <AcademicCapIcon className="w-16 h-16" />
          <h1 className="text-2xl font-bold mt-4">Login</h1>
          <p className="mt-3">Welcome back.</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-7 w-full mt-12"
        >
          <Input
            label="Email"
            error={errors.email && 'This field is required.'}
            {...register('email', { required: true })}
          />
          <Input
            label="Password"
            altLabel={<Link href="/signup">Forgot your password?</Link>}
            type="password"
            error={errors.password && 'This field is required.'}
            {...register('password', { required: true })}
          />
          <Button variation="filled" type="submit" disabled={disableForm}>
            {isLoading ? 'Loading...' : 'Sign In'}
          </Button>
          {isError && <p>{error?.message}.</p>}
        </form>
        <div className="flex items-center justify-center p-7 border w-full mt-8">
          Don't have an account?&nbsp;<Link href="/sign-up">Join Onsplash</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
