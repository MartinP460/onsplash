/* eslint-disable prettier/prettier */
import { useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { useUserContext } from '../common/utils/UserProvider'
import { UPDATE_USER_MUTATION } from '../common/graphql/user'
import { authProtected } from '../common/hoc/authProtected'
import Layout from '../modules/layout/components/Layout'

type FormValues = {
  firstName: string
  lastName: string
  email: string
}

const Account = () => {
  const user = useUserContext()
  const [mutateUser, { loading: updatingProfile }] =
    useMutation(UPDATE_USER_MUTATION)

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

export default authProtected(Account)
