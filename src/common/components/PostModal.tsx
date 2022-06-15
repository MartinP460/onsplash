import { Post } from '../types/index'
import { Dialog } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'

interface PostModalProps {
  isOpen: boolean
  onClose: () => void
  post?: Post | null
}

const PostModal = ({ isOpen, onClose, post }: PostModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <button
        type="button"
        className="fixed z-20 top-0 outline-none"
        onClick={onClose}
      >
        <XIcon className="w-6 h-6 m-2 text-gray-200 hover:text-white transition-fast" />
      </button>
      <div className="fixed inset-0 bg-black/30" aria-hidden></div>
      <div className="fixed inset-0 flex justify-center">
        <Dialog.Panel className="w-11/12 mt-4 h-32 bg-white rounded">
          <div className="text-2xl">{post?.description}</div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default PostModal
