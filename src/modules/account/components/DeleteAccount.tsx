import { User } from '@nhost/core'
import { useMutation } from '@apollo/client'
import { DELETE_USER } from 'common/graphql/user'
import { useSignOut } from '@nhost/react'
import useConfirm from '../hooks/useConfirm'
import useToast from 'common/hooks/useToast'
import Button from 'common/components/Button'

const DeleteAccount = ({ user }: { user: User | null }) => {
  const toast = useToast()
  const { signOut } = useSignOut()
  const [deleteAccount] = useMutation(DELETE_USER, {
    variables: { id: user?.id },
    onError: () => toast('error', 'There was an error deleting your profile.'),
    onCompleted: () => signOut()
  })
  const [Modal, confirmDelete] = useConfirm(
    'Delete account',
    'This will delete your account permanently.',
    'Are you sure you want to delete your account?'
  )

  const handleDelete = async () => {
    const confirmed = await confirmDelete()
    if (confirmed) {
      deleteAccount()
    }
  }

  return (
    <>
      <h2 className="text-xl mt-10">Delete account</h2>
      <Button
        variation="filled"
        className="bg-red-300 hover:bg-red-400 w-full mt-4"
        onClick={handleDelete}
      >
        Delete account
      </Button>
      <Modal />
    </>
  )
}

export default DeleteAccount
