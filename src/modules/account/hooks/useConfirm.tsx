import { useState, ReactElement } from 'react'
import { Dialog } from '@headlessui/react'
import Button from 'common/components/Button'

const useConfirm = (title: string, description: string, message: string) => {
  const [promise, setPromise] = useState<any>(null)

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve })
    })

  const handleClose = () => {
    setPromise(null)
  }

  const handleConfirm = () => {
    promise?.resolve(true)
    handleClose()
  }

  const handleCancel = () => {
    promise?.resolve(false)
    handleClose()
  }

  const ConfirmationDialog = () => (
    <Dialog open={Boolean(promise)} onClose={() => handleCancel}>
      <div className="fixed inset-0 bg-black/30 z-20" aria-hidden></div>
      <div className="fixed inset-0 flex justify-center items-center z-30">
        <Dialog.Panel className="bg-white rounded p-4 mx-2">
          <Dialog.Title className="font-bold text-lg">{title}</Dialog.Title>
          <Dialog.Description className="mt-2">
            {description}
          </Dialog.Description>
          <p className="mt-4">{message}</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variation="filled"
              className="bg-red-300 hover:bg-red-400"
              onClick={handleConfirm}
            >
              Delete
            </Button>
            <Button variation="gray-hover" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )

  return [ConfirmationDialog, confirm] as [
    () => ReactElement,
    () => Promise<any>
  ]
}

export default useConfirm
