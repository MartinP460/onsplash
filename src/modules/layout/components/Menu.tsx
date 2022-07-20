import { Popover } from '@headlessui/react'
import { MenuIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { useWindowSize } from 'rooks'
import {
  BriefcaseIcon,
  UserGroupIcon,
  DocumentTextIcon
} from '@heroicons/react/outline'
import Link from 'next/link'
import DropdownTransition from './DropdownTransition'
import Socials from './Socials'

const Menu = () => {
  const { innerWidth } = useWindowSize()

  const menuItems = [
    {
      title: 'Company',
      items: [
        { label: 'about', href: '/about' },
        { label: 'history', href: '/history' },
        { label: 'press', href: '/press' }
      ]
    },
    {
      title: 'Community',
      items: [
        { label: 'become a contributor', href: '/community' },
        { label: 'topics', href: '/t' }
      ]
    },
    {
      title: 'Legal',
      items: [{ label: 'license', href: '/license' }]
    }
  ]

  const getItemIcon = (title: string) => {
    switch (title) {
      case 'Company':
        return <BriefcaseIcon className="h-5 text-primary" />
      case 'Community':
        return <UserGroupIcon className="h-5 text-primary" />
      case 'Legal':
        return <DocumentTextIcon className="h-5 text-primary" />
    }
  }

  return (
    <Popover className="flex items-center relative">
      <Popover.Button className="outline-none">
        <MenuIcon className="h-6 text-primary hover:text-primary-hover" />
      </Popover.Button>
      <DropdownTransition>
        <Popover.Panel className="absolute z-50 border top-12 right-0 border-gray-200 rounded py-4 px-6 shadow-lg bg-white min-w-[268px] md:py-8">
          {!innerWidth || innerWidth < 768 ? (
            <ul>
              {menuItems.map((detail, i) => (
                <details
                  key={detail.title}
                  className="py-2 group hover:cursor-pointer"
                >
                  <summary className="list-none flex justify-between">
                    <div className="flex ml-4">
                      {getItemIcon(detail.title)}
                      <p className="font-bold ml-4">{detail.title}</p>
                    </div>
                    <ChevronDownIcon className="h-6 text-gray-300 group-open:rotate-180 transition-transform" />
                  </summary>
                  <ul className="pl-9">
                    {detail.items.map((item) => (
                      <li key={item.label} className="my-4">
                        <Link href={item.href}>
                          <a className="capitalize text-primary hover:text-primary-hover">
                            {item.label}
                          </a>
                        </Link>
                      </li>
                    ))}
                    <li className="my-4">{i === 1 && <Socials />}</li>
                  </ul>
                </details>
              ))}
            </ul>
          ) : (
            <div className="flex gap-8">
              {menuItems.map((detail, i) => (
                <div key={detail.title} className="flex flex-col w-40">
                  <div className="flex">
                    {getItemIcon(detail.title)}
                    <p className="font-bold ml-4">{detail.title}</p>
                  </div>
                  <ul className="pl-9">
                    {detail.items.map((item) => (
                      <li className="my-4" key={item.label}>
                        <Link href={item.href}>
                          <a className="capitalize text-primary hover:text-primary-hover whitespace-nowrap">
                            {item.label}
                          </a>
                        </Link>
                      </li>
                    ))}
                    <li className="my-4">{i === 1 && <Socials />}</li>
                  </ul>
                </div>
              ))}
            </div>
          )}
        </Popover.Panel>
      </DropdownTransition>
    </Popover>
  )
}

export default Menu
