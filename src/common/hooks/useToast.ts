import { useToastDispatchContext } from '../context/NotificationProvider'

const useToast = () => {
  const dispatch = useToastDispatchContext()

  const toast = (type: 'success' | 'error', message: string) => {
    const id = Math.random().toString(36).substring(2, 9)

    dispatch({
      type: 'ADD_TOAST',
      toast: {
        id,
        type,
        message
      }
    })

    setTimeout(() => {
      dispatch({
        type: 'REMOVE_TOAST',
        toast: {
          id
        }
      })
    }, 5000)
  }

  return toast
}

export default useToast
