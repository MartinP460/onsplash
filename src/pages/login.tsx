import { NextPage } from 'next'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSignInEmailPassword } from '@nhost/nextjs'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'common/components/Link'
import Input from 'common/components/Input'
import Button from 'common/components/Button'

type FormValues = {
  email: string
  password: string
}

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const router = useRouter()

  const { signInEmailPassword, isLoading, isSuccess, isError, error } =
    useSignInEmailPassword()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { email, password } = data
    signInEmailPassword(email, password)
  }

  if (isSuccess) {
    router.push('/')
  }

  const disableForm = isLoading || !isDirty

  return (
    <div className="flex items-center h-screen">
      <div className="flex flex-col items-center w-screen p-3 md:w-3/5 lg:w-2/5 mx-auto">
        <div className="flex flex-col items-center ">
          <Image
            src="/images/onsplash.png"
            width={64}
            height={64}
            alt="Onsplash logo"
          />
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
            className="p-3"
            {...register('email', { required: true })}
          />
          <Input
            label="Password"
            altLabel={<Link href="/signup">Forgot your password?</Link>}
            type="password"
            className="p-3"
            error={errors.password && 'This field is required.'}
            {...register('password', { required: true })}
          />
          <Button variation="filled" type="submit" disabled={disableForm}>
            {isLoading ? 'Loading...' : 'Sign In'}
          </Button>
          {isError && (
            <p className="font-bold text-red-400">{error?.message}.</p>
          )}
        </form>
        <div className="flex items-center justify-center p-7 border w-full mt-8">
          Don&apos;t have an account?&nbsp;
          <Link href="/signup">Join Onsplash</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
