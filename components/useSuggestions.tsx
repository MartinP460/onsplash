import { useState } from 'react'
import { searchSuggestions } from '../utils/data'

function useSuggestions() {
  const [query, setQuery] = useState('')

  const suggestions =
    query === ''
      ? []
      : searchSuggestions
          .filter((suggestion) =>
            suggestion.toLowerCase().includes(query.toLowerCase())
          )
          .sort((a, b) => a.indexOf(query) - b.indexOf(query))
          .slice(0, 5)

  return [suggestions, query, setQuery] as const
}

export default useSuggestions
