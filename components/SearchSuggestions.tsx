import Link from 'next/link'

function SearchSuggestions({
  suggestions,
  show
}: {
  suggestions: string[]
  show: boolean
}) {
  return (
    <ul
      className={`absolute w-full z-10 mt-1 border border-text rounded-lg bg-white shadow ${
        show ? 'block' : 'hidden'
      }`}
    >
      {suggestions.map((suggestion) => (
        <li key={suggestion} className="py-2 px-3 my-1 hover:bg-gray-100">
          <Link href={`/s?query=${suggestion}`}>
            <a className="block h-full no-underline">{suggestion}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default SearchSuggestions
