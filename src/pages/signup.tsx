import { useForm, SubmitHandler } from 'react-hook-form'
import { useSignUpEmailPassword } from '@nhost/nextjs'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Input from '../common/components/Input'

type FormValues = {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
}

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<FormValues>()
  const router = useRouter()

  const { signUpEmailPassword, isLoading, isSuccess, isError, error } =
    useSignUpEmailPassword()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { firstName, lastName, username, email, password } = data
    await signUpEmailPassword(email, password, {
      displayName: username,
      metadata: {
        firstName,
        lastName
      }
    })
  }

  const disableForm = isLoading || !isDirty

  if (isSuccess) {
    router.push('/')
  }

  return (
    <div className="w-1/2 mx-auto mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <Input
          label="First name"
          className="p-2"
          error={
            errors.firstName &&
            (errors.firstName?.type === 'minLength'
              ? 'The minimum length is 2.'
              : 'This field is required.')
          }
          {...register('firstName', { required: true, minLength: 2 })}
        />
        <Input
          label="Last name"
          className="p-2"
          error={
            errors.lastName &&
            (errors.lastName?.type === 'minLength'
              ? 'The minimum length is 2.'
              : 'This field is required.')
          }
          {...register('lastName', { required: true, minLength: 2 })}
        />
        <Input
          label="Username"
          className="p-2"
          error={
            errors.username &&
            (errors.username?.type === 'minLength'
              ? 'The minimum length is 2.'
              : 'This field is required.')
          }
          {...register('username', { required: true, minLength: 2 })}
        />
        <Input
          label="Email"
          className="p-2"
          error={
            errors.email &&
            (errors.email?.type === 'pattern'
              ? 'This field has to be an email.'
              : 'This field is required.')
          }
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        <Input
          label="Password"
          className="p-2"
          error={
            errors.password &&
            (errors.password?.type === 'minLength'
              ? 'The minimum length is 4.'
              : 'This field is required.')
          }
          {...register('password', { required: true, minLength: 4 })}
        />
        <button
          type="submit"
          disabled={disableForm}
          className="bg-blue-400 text-white"
        >
          Create account
        </button>
      </form>
      {isError && <p>{error?.message}</p>}
      <p className="mt-10">
        Already have an account?{' '}
        <Link href="/login">
          <a>Log in</a>
        </Link>
      </p>
    </div>
  )
}

export default Signup
