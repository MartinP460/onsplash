import { Popover } from '@headlessui/react'
import { MenuIcon, ChevronDownIcon } from '@heroicons/react/solid'
import {
  BriefcaseIcon,
  UserGroupIcon,
  DocumentTextIcon
} from '@heroicons/react/outline'
import { useWindowSize } from 'rooks'
import Link from 'next/link'
import Socials from './Socials'

const Menu = () => {
  const { innerWidth } = useWindowSize()

  const menuItems = [
    {
      title: 'Company',
      items: ['about', 'history', 'press']
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
      items: ['license']
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
      <Popover.Panel className="absolute z-10 border top-10 right-0 border-gray-200 rounded py-4 px-6 shadow-lg bg-white min-w-[268px] md:py-8">
        {!innerWidth || innerWidth < 768 ? (
          <ul>
            {menuItems.map((detail, i) => (
              <details className="py-2 group hover:cursor-pointer">
                <summary className="list-none flex justify-between">
                  <div className="flex ml-4">
                    {getItemIcon(detail.title)}
                    <p className="font-bold ml-4">{detail.title}</p>
                  </div>
                  <ChevronDownIcon className="h-6 text-gray-300 group-open:rotate-180 transition-transform" />
                </summary>
                <ul className="pl-9">
                  {detail.items.map((item, j) => (
                    <>
                      <li
                        key={typeof item === 'string' ? item : item.label}
                        className="my-4"
                      >
                        <Link
                          href={typeof item === 'string' ? item : item.href}
                        >
                          <a className="capitalize text-primary hover:text-primary-hover">
                            {typeof item === 'string' ? item : item.label}
                          </a>
                        </Link>
                      </li>
                      <li className="my-4">
                        {i == 1 && j == 1 && <Socials />}
                      </li>
                    </>
                  ))}
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
                  {detail.items.map((item, j) => (
                    <>
                      <li
                        key={typeof item === 'string' ? item : item.label}
                        className="my-4"
                      >
                        <Link
                          href={typeof item === 'string' ? item : item.href}
                        >
                          <a className="capitalize text-primary hover:text-primary-hover whitespace-nowrap">
                            {typeof item === 'string' ? item : item.label}
                          </a>
                        </Link>
                      </li>
                      <li className="my-4">
                        {i == 1 && j == 1 && <Socials />}
                      </li>
                    </>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </Popover.Panel>
    </Popover>
  )
}

export default Menu
