import { useState } from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import useSuggestions from './useSuggestions'
import Link from 'next/link'

function Searchbar() {
  const [suggestions, setQuery] = useSuggestions()
  const [focused, setFocused] = useState(false)

  return (
    <div className="relative w-full">
      <div className="bg-gray-200 border active:border-gray-300 rounded-full pointer-events-none hover:bg-transparent transition-fast">
        <div className="flex items-center">
          <SearchIcon className="h-5 ml-4 mr-1 text-gray-500" />
          <input
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 90)}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-9 px-2 bg-inherit outline-none pointer-events-auto"
            placeholder="Search photos"
          />
        </div>
      </div>
      <ul
        className={`absolute w-full z-10 mt-1 border border-gray-200 rounded-lg bg-white shadow ${
          suggestions.length !== 0 && focused ? 'block' : 'hidden'
        }`}
      >
        {suggestions.map((suggestion) => (
          <li key={suggestion} className="py-2 px-3 my-1 hover:bg-gray-100">
            <Link href={`/s?query=${suggestion}`}>
              <a className="block h-full">{suggestion}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Searchbar
