import { Popover } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/solid'

function Menu() {
  return (
    <Popover className="flex items-center relative">
      <Popover.Button className="outline-none">
        <MenuIcon className="h-6 text-primary hover:text-primary-hover" />
      </Popover.Button>
      <Popover.Panel className="absolute z-10 border top-10 right-0 border-gray-200 rounded p-4 bg-white">
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
