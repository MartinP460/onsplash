import { NextPage } from 'next'
import { authProtected } from '../common/hoc/authProtected'
import { useUserContext } from '../common/context/userContext'
import UpdateProfile from '../modules/account/components/UpdateProfile'
import Layout from '../modules/layout/components/Layout'
import DeleteAccount from '../modules/account/components/DeleteAccount'

const Account: NextPage = () => {
  const user = useUserContext()

  return (
    <Layout title="Account">
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <UpdateProfile user={user} />
        <DeleteAccount user={user} />
      </div>
    </Layout>
  )
}

export default authProtected(Account)
