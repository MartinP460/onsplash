import { useState } from 'react'
import { SearchIcon, XIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import useSuggestions from '../hooks/useSuggestions'
import SearchSuggestions from './SearchSuggestions'
import TrendingSuggestions from './TrendingSuggestions'

const Searchbar = () => {
  const router = useRouter()
  const [suggestions, query, setQuery] = useSuggestions()
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/search?q=${query}`)
  }

  return (
    <div className="relative w-full">
      <div className="bg-gray-200 border rounded-full hover:bg-transparent transition-fast">
        <form onSubmit={handleSubmit} className="flex items-center w-full">
          <SearchIcon className="h-5 ml-4 mr-1 text-gray-500" />
          <input
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 90)}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            className="w-full h-9 px-2 bg-inherit outline-none"
            placeholder="Search photos"
          />
          <button
            type="button"
            onClick={() => setQuery('')}
            className="hover:cursor-pointer"
          >
            <XIcon
              className={`h-5 mr-4 text-gray-500 ${
                query ? 'inline' : 'hidden'
              }`}
            />
          </button>
        </form>
      </div>
      <SearchSuggestions
        suggestions={suggestions}
        show={
          focused &&
          suggestions.length > 0 &&
          !(suggestions.length === 0 && query)
        }
      />
      <TrendingSuggestions show={focused && query === ''} />
    </div>
  )
}

export default Searchbar
