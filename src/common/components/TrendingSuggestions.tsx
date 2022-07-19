import { trendingSearches, trendingTopics } from '../utils/data'
import { TrendingUpIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import Image from 'next/image'
import Button from './Button'

const TrendingSuggestions = ({ show }: { show: boolean }) => {
  return (
    <div
      className={`absolute w-full z-10 mt-1 border border-text rounded-lg bg-white shadow hidden ${
        show ? 'md:block' : 'hidden'
      }`}
    >
      <div className="py-4 px-3">
        <div>
          <h3 className="font-semibold">Trending Searches</h3>
          <div className="flex flex-wrap gap-3 mt-2">
            {trendingSearches.map((search) => (
              <Link key={search} href={`/s?query=${search}`}>
                <Button variation="gray-hover">
                  <span className="inline-flex items-center">
                    <TrendingUpIcon className="h-4 mr-2" />
                    <p>{search}</p>
                  </span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold">Trending Topics</h3>
          <div className="flex flex-wrap gap-3 mt-2">
            {trendingTopics.map((topic) => (
              <Link key={topic.tag} href={`/s?query=${topic.tag}`}>
                <button className="text-sm text-gray-500 border border-text hover:bg-gray-100 rounded-sm">
                  <div className="flex items-center relative">
                    <div className="w-8 h-8">
                      <Image src={topic.image} width={32} height={32} />
                    </div>
                    <p className="mx-4 capitalize">{topic.tag}</p>
                  </div>
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrendingSuggestions
