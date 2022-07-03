import { useRouter } from 'next/router'
import Modal from '../../../common/components/Modal'
import SubmitForm from './SubmitForm'

const SubmitModal = () => {
  const router = useRouter()

  const query = router.query.submit === ''

  const { submit, ...rest } = router.query

  console.log(rest)

  return (
    <Modal isOpen={query} onClose={() => router.push({ query: { ...rest } })}>
      <div className="mx-4 h-full">
        <p className="text-lg">Submit to Onsplash</p>
        <SubmitForm />
      </div>
    </Modal>
  )
}

export default SubmitModal
