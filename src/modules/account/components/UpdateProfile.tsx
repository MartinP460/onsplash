import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { UPDATE_USER_MUTATION } from '../../../common/graphql/user'
import { useMemo } from 'react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid'
import useUniqueUsername from '../../../common/hooks/useUniqueUsername'
import useToast from '../../../common/hooks/useToast'
import Input from '../../../common/components/Input'
import Button from '../../../common/components/Button'
import { User } from '@nhost/core'

type FormValues = {
  firstName: any
  lastName: any
  email: string
  username: string
}

const UpdateProfile = ({ user }: { user: User | null }) => {
  const [mutateUser, { loading: updatingProfile }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      onCompleted: () => toast('success', 'Profile successfully updated.'),
      onError: () => toast('error', 'There was an error updating your profile.')
    }
  )
  const [
    checkUsername,
    { isUnique, loading: usernameLoading, error: usernameError }
  ] = useUniqueUsername()
  const toast = useToast()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty }
  } = useForm<FormValues>({
    defaultValues: {
      firstName: user?.metadata.firstName,
      lastName: user?.metadata.lastName,
      email: user?.email,
      username: user?.displayName
    }
  })

  const watchUsername = watch('username')
  useMemo(() => {
    checkUsername(watchUsername)
  }, [checkUsername, watchUsername])

  const onSubmit = async (data: FormValues) => {
    const { firstName, lastName, username, email } = data

    if (!isUnique || usernameLoading || usernameError) {
      return
    }

    mutateUser({
      variables: {
        id: user?.id,
        email,
        displayName: username,
        metadata: {
          firstName,
          lastName
        }
      }
    })
  }

  const disableForm = updatingProfile || !isDirty

  const showUnique = () => {
    if (watchUsername === user?.displayName) {
      return
    }
    if (isUnique) {
      return (
        <>
          <CheckCircleIcon className="w-5 mx-2 text-green-300" />
          <p className="p-1">This username is available.</p>
        </>
      )
    }
    if (usernameLoading) {
      return <p className="p-1">Loading...</p>
    }
    if (usernameError) {
      return <p className="p-1">There was an error.</p>
    }
    return (
      <>
        <XCircleIcon className="w-5 mx-2 text-red-300" />
        <p className="p-1">This username is already taken.</p>
      </>
    )
  }

  return (
    <>
      <h2 className="text-xl">Update profile</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-4"
      >
        <div className="flex flex-col gap-4 md:flex-row">
          <Input
            label="First name"
            {...register('firstName', { required: true, minLength: 2 })}
            className="p-2"
            error={
              errors.firstName &&
              (errors.firstName?.type === 'minLength'
                ? 'The minimum length is 2.'
                : 'This field is required.')
            }
          />
          <Input
            label="Last name"
            {...register('lastName', { required: true, minLength: 2 })}
            className="p-2"
            error={
              errors.lastName &&
              (errors.lastName?.type === 'minLength'
                ? 'The minimum length is 2.'
                : 'This field is required.')
            }
          />
        </div>
        <Input
          label="Email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          className="p-2"
          error={
            errors.email &&
            (errors.email?.type === 'pattern'
              ? 'This field has to be an email.'
              : 'This field is required.')
          }
        />
        <div>
          <Input
            label="Username"
            {...register('username', { required: true, minLength: 2 })}
            className="p-2"
            error={
              errors.username &&
              (errors.username?.type === 'minLength'
                ? 'The minimum length is 2.'
                : 'This field is required.')
            }
          />
          <div className="flex mt-2 bg-gray-200 rounded">{showUnique()}</div>
        </div>
        <Button
          variation="filled"
          type="submit"
          disabled={disableForm}
          className="block w-full"
        >
          {updatingProfile ? 'Loading...' : 'Update account'}
        </Button>
      </form>
    </>
  )
}

export default UpdateProfile
