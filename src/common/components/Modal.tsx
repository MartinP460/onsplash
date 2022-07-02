import { ReactNode } from 'react'
import { Dialog } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'

interface ModalProps {
  isOpen: boolean
  onClose(): void
  fillScreen?: boolean
  children: ReactNode
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <button
        type="button"
        className="fixed z-40 top-0 right-0 outline-none md:left-0"
        onClick={onClose}
      >
        <XIcon className="w-6 h-6 mx-4 my-3 text-gray-400 hover:text-gray-600 transition-fast md:text-gray-200 md:hover:text-white" />
      </button>
      <div className="fixed inset-0 bg-black/30 z-20" aria-hidden></div>
      <div className="fixed inset-0 flex justify-center z-30">
        <Dialog.Panel className="w-full py-2 md:mt-12 md:pt-2 bg-white rounded overflow-y-auto md:w-11/12 md:my-4 md:py-0">
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default Modal
