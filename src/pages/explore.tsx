import { useState } from 'react'
import { GET_ALL_POSTS } from '../common/graphql/posts'
import { Post } from 'common/types/index'
import { RadioGroup } from '@headlessui/react'
import Layout from 'modules/layout/components/Layout'
import Button from 'common/components/Button'
import Gallery from 'modules/gallery/components/Gallery'

const Explore = () => {
  const [filter, setFilter] = useState<'landscape' | 'portrait' | null>(null)

  const filters = {
    landscape: (post: Post) => post.image.width > post.image.height,
    portrait: (post: Post) => post.image.width < post.image.height
  }

  return (
    <Layout>
      <div className="px-3 mt-8">
        <p>Explore</p>
        <h1 className="text-4xl font-bold capitalize mt-2">
          Explore Onsplash Photos
        </h1>
        <p className="mt-4 text-lg">Explore photos from around the world.</p>
        <div className="flex flex-col items-end mt-10 md:mb-6">
          <RadioGroup
            value={filter}
            onChange={setFilter}
            className="flex gap-2"
          >
            <RadioGroup.Option value="landscape">
              {({ checked }) => (
                <Button
                  variation="outline"
                  title="landscape"
                  className={`h-10 w-12 flex justify-center items-center ${
                    checked ? 'bg-gray-100' : ''
                  }`}
                >
                  <div className="h-4 w-6 border-2 border-gray-500" />
                </Button>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value="portrait">
              {({ checked }) => (
                <Button
                  variation="outline"
                  title="portrait"
                  className={`h-10 w-12 flex justify-center items-center ${
                    checked ? 'bg-gray-100' : ''
                  }`}
                >
                  <div className="h-6 w-4 border-2 border-gray-500" />
                </Button>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value={null}>
              <Button variation="outline" className="h-full">
                Reset
              </Button>
            </RadioGroup.Option>
          </RadioGroup>
        </div>
      </div>
      <Gallery
        scrollQuery={{
          query: GET_ALL_POSTS
        }}
        filter={filter ? filters[filter] : null}
      />
    </Layout>
  )
}

export default Explore
