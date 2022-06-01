import { Popover } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/solid'

function Menu() {
  return (
    <Popover className="flex items-center">
      <Popover.Button>
        <MenuIcon className="h-6 text-gray-400" />
      </Popover.Button>
      <Popover.Panel className="absolute z-10 top-12 right-4 border border-gray-200 rounded p-4 bg-white">
        <ul>
          <li>Placeholder</li>
          <li>Placeholder</li>
          <li>Placeholder</li>
          <li>Placeholder</li>
        </ul>
      </Popover.Panel>
    </Popover>
  )
}

export default Menu
