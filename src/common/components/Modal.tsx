import { ReactNode } from 'react'
import { Dialog } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <button
        type="button"
        className="fixed z-30 top-0 outline-none"
        onClick={onClose}
      >
        <XIcon className="w-6 h-6 m-2 text-gray-200 hover:text-white transition-fast" />
      </button>
      <div className="fixed inset-0 bg-black/30 z-20" aria-hidden></div>
      <div className="fixed inset-0 flex justify-center z-30">
        <Dialog.Panel className="w-full mt-12 pt-2 bg-white rounded overflow-y-auto md:w-11/12 md:my-4">
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default Modal
