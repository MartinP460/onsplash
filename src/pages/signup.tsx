import { NextPage } from 'next'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSignUpEmailPassword } from '@nhost/nextjs'
import { useRouter } from 'next/router'
import { AcademicCapIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from '../common/components/Link'
import Input from '../common/components/Input'
import Button from './../common/components/Button'

type FormValues = {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
}

const Signup: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    }
  })
  const router = useRouter()

  const { signUpEmailPassword, isLoading, isSuccess, isError, error } =
    useSignUpEmailPassword()

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { firstName, lastName, username, email, password } = data
    signUpEmailPassword(email, password, {
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
    <div className="flex flex-col md:flex-row">
      <div className="relative">
        <div className="flex flex-col text-white px-3 pt-4 pb-16 md:h-[100vh] md:w-[40vw] md:px-12 md:pt-10">
          <Link href="/">
            <AcademicCapIcon className="w-12 text-white drop-shadow-lg" />
          </Link>
          <div className="mt-6 md:h-full md:flex md:flex-col md:justify-center">
            <h2 className="text-3xl font-bold md:text-5xl">Join Onsplash</h2>
            <p className="text-lg mt-3 md:text-xl">Sign up to submit photos.</p>
          </div>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1654647025659-868b3d7961f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1NzI3MTQ3NA&ixlib=rb-1.2.1&q=80&w=1080"
          layout="fill"
          objectFit="cover"
          className="absolute -z-10 brightness-50"
        />
      </div>
      <div className="md:max-w-md md:mx-auto md:h-[100vh] md:flex md:flex-col md:justify-center">
        <div className="text-center">
          <h1 className="mt-12 text-3xl font-bold md:text-5xl md:mt-0">
            Join Onsplash
          </h1>
          <p className="mt-4">
            Already have an account?{' '}
            <Link href="/login">
              <a>Log in</a>
            </Link>
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col px-3 gap-4 mt-6 md:mt-16 mb-4"
        >
          <div className="flex flex-row gap-6">
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
          </div>
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
            type="password"
            error={
              errors.password &&
              (errors.password?.type === 'minLength'
                ? 'The minimum length is 8.'
                : 'This field is required.')
            }
            {...register('password', { required: true, minLength: 8 })}
          />
          <Button
            variation="filled"
            type="submit"
            disabled={disableForm}
            className="mt-4"
          >
            Create account
          </Button>
          {isError && (
            <p className="font-bold text-red-400">{error?.message}</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default Signup
