import { useToastContext } from '../context/NotificationProvider'

const Toast = () => {
  const { toasts } = useToastContext()

  return (
    <div
      className={`fixed top-0 w-full h-14 drop-shadow z-50 transform transition-transform ${
        toasts.length === 0 ? '-translate-y-14' : 'translate-y-0'
      }`}
    >
      {toasts.map((toast) => (
        <div
          key={toast.message}
          className={`w-full h-full flex justify-center items-center font-bold text-white ${
            toast.type === 'success' ? 'bg-[#767676]' : 'bg-rose-300'
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}

export default Toast
