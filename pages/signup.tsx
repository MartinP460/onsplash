import { useForm, SubmitHandler } from 'react-hook-form'
import { useSignUpEmailPassword } from '@nhost/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/router'

type FormValues = {
  firstName: string
  lastName: string
  email: string
  password: string
}

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>()
  const router = useRouter()

  const {
    signUpEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error
  } = useSignUpEmailPassword()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { firstName, lastName, email, password } = data
    await signUpEmailPassword(email, password, {
      displayName: `${firstName} ${lastName}`.trim(),
      metadata: {
        firstName,
        lastName
      }
    })
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <input
          placeholder="First name"
          disabled={disableForm}
          className="p-2 border-2 border-gray-400 rounded"
          {...register('firstName', { required: true, minLength: 2 })}
        />
        {errors.firstName &&
          (errors.firstName?.type === 'minLength' ? (
            <span>The minimum length is 2.</span>
          ) : (
            <span>This field is required.</span>
          ))}
        <input
          placeholder="Last name"
          disabled={disableForm}
          className="p-2 border-2 border-gray-400 rounded"
          {...register('lastName', { required: true, minLength: 2 })}
        />
        {errors.lastName &&
          (errors.lastName?.type === 'minLength' ? (
            <span>The minimum length is 2.</span>
          ) : (
            <span>This field is required.</span>
          ))}
        <input
          placeholder="Email"
          disabled={disableForm}
          className="p-2 border-2 border-gray-400 rounded"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email &&
          (errors.email?.type === 'pattern' ? (
            <span>This field has to be an email.</span>
          ) : (
            <span>This field is required.</span>
          ))}
        <input
          placeholder="Password"
          disabled={disableForm}
          className="p-2 border-2 border-gray-400 rounded"
          {...register('password', { required: true, minLength: 4 })}
        />
        {errors.password &&
          (errors.password?.type === 'minLength' ? (
            <span>The minimum length is 4.</span>
          ) : (
            <span>This field is required.</span>
          ))}
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
