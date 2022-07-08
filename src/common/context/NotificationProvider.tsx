import {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  ReactNode
} from 'react'

export type Toast = {
  id: string
  type: 'success' | 'error'
  message: string
}

const ToastContext = createContext<{ toasts: Toast[] }>({ toasts: [] })
const ToastDispatchContext = createContext<any>(null)

const ToastReducer = (
  state: { toasts: Toast[] },
  action: { type: string; toast: Toast }
) => {
  switch (action.type) {
    case 'ADD_TOAST':
      return { toasts: [action.toast] }
    case 'REMOVE_TOAST':
      return {
        toasts: state.toasts.filter((t) => t.id !== action.toast.id)
      }
    default:
      throw new Error('unhandled action type')
  }
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(ToastReducer, { toasts: [] })

  return (
    <ToastContext.Provider value={state}>
      <ToastDispatchContext.Provider value={dispatch}>
        {children}
      </ToastDispatchContext.Provider>
    </ToastContext.Provider>
  )
}

export const useToastContext = () => useContext(ToastContext)
export const useToastDispatchContext = () => useContext(ToastDispatchContext)
