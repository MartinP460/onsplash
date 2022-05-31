/* eslint-disable prettier/prettier */
import { useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { useAuthenticationStatus } from '@nhost/nextjs'
import { useRouter } from 'next/router'
import { useUserContext } from '../utils/UserProvider'
import { UPDATE_USER_MUTATION } from '../graphql/user'
import Layout from '../components/Layout'

type FormValues = {
  firstName: string
  lastName: string
  email: string
}

function Account() {
  const user = useUserContext()
  const [mutateUser, { loading: updatingProfile }] =
    useMutation(UPDATE_USER_MUTATION)
  const router = useRouter()
  const { isLoading, isAuthenticated } = useAuthenticationStatus()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<FormValues>({
    defaultValues: {
      firstName: user?.metadata.firstName,
      lastName: user?.metadata.lastName,
      email: user?.email
    }
  })

  const onSubmit = async (data: FormValues) => {
    const { firstName, lastName } = data

    try {
      await mutateUser({
        variables: {
          id: user?.id,
          displayName: `${firstName} ${lastName}`.trim(),
          metadata: {
            firstName,
            lastName
          }
        }
      })
      console.log('success')
    } catch (error) {
      console.error(error)
    }
  }

  const disableForm = updatingProfile || !isDirty

  if (!isLoading && !isAuthenticated) {
    router.push('/')
  }

  return (
    <Layout title="Account">
      <h2>Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="First name"
          defaultValue={user?.metadata.firstName}
          {...register('firstName')}
          className="p-2 border-2 border-gray-400 rounded"
        />
        {errors.firstName && <span>This field is required.</span>}
        <input
          placeholder="Last name"
          defaultValue={user?.metadata.lastName}
          {...register('lastName')}
          className="p-2 border-2 border-gray-400 rounded"
        />
        {errors.lastName && <span>This field is required.</span>}
        <button type="submit" disabled={disableForm} className="bg-blue">
          {updatingProfile ? 'Loading...' : 'Update account'}
        </button>
      </form>
    </Layout>
  )
}

export default Account
