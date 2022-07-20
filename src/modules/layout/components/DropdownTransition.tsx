import { Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'

interface DropdownTransitionProps {
  children: ReactNode
}

const DropdownTransition = ({ children }: DropdownTransitionProps) => (
  <Transition
    as={Fragment}
    appear={true}
    enter="transition duration-100 ease-out"
    enterFrom="transform scale-90 translate-x-4 -translate-y-2 opacity-0"
    enterTo="transform scale-100 opacity-100"
    leave="transition duration-75 ease-out"
    leaveFrom="transform scale-100 opacity-100"
    leaveTo="transform scale-90 translate-x-4 -translate-y-2 opacity-0"
  >
    {children}
  </Transition>
)

export default DropdownTransition
