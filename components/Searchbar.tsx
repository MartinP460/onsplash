import { useState } from 'react'
import { Combobox } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'

function Searchbar() {
  const [query, setQuery] = useState('')

  return (
    <Combobox
      value={query}
      onChange={setQuery}
      className="w-full relative bg-gray-200 border active:border-gray-300 rounded-full pointer-events-none hover:bg-transparent transition-fast"
      as="div"
    >
      <div className="flex items-center">
        <SearchIcon className="h-5 ml-4 mr-1 text-gray-500" />
        <Combobox.Input
          onChange={(e) => setQuery(e.target.value)}
          className="w-3/5 h-9 px-2 bg-inherit outline-none pointer-events-auto"
          placeholder="Search photos"
        />
      </div>
      <Combobox.Options className="absolute w-full z-10 mt-1 border border-gray-200 rounded p-4 bg-white">
        <Combobox.Option value="cats">Cats</Combobox.Option>
        <Combobox.Option value="dogs">Dogs</Combobox.Option>
        <Combobox.Option value="mice">Mice</Combobox.Option>
      </Combobox.Options>
    </Combobox>
  )
}

export default Searchbar
