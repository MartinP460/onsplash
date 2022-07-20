import { GetServerSideProps, NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../../common/graphql/user'
import { GET_POSTS_BY_USER, GET_LIKED_POSTS } from '../../common/graphql/posts'
import { Tab } from '@headlessui/react'
import Layout from '../../modules/layout/components/Layout'
import Error from '../../common/components/Error'
import AvatarIcon from '../../common/components/AvatarIcon'
import Gallery from '../../modules/gallery/components/Gallery'

interface ProfileProps {
  username: string
}

const Profile: NextPage<ProfileProps> = ({ username }) => {
  const { data, loading } = useQuery(GET_USER, {
    variables: { displayName: username }
  })

  if (data?.users.length === 0) {
    return <Error errorType="User Not Found" title="No user here..." />
  }

  const user = data?.users[0]

  return (
    <Layout
      title={
        data &&
        `${user.metadata.firstName} ${user.metadata.lastName} (${user.displayName}) | Onsplash`
      }
    >
      <div className="max-w-7xl mx-auto px-4 mt-16">
        {!loading ? (
          <>
            <AvatarIcon url={user.avatarUrl} className="w-36 h-36" />
            <p className="text-xl font-bold mt-2">{`${user.metadata.firstName} ${user.metadata.lastName}`}</p>
            <p className="mt-2">{`Download photos curated by ${user.metadata.firstName}.`}</p>
          </>
        ) : (
          <>
            <div className="w-36 h-36 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-40 h-6 bg-gray-300 mt-6 rounded animate-pulse"></div>
            <div className="w-80 h-4 bg-gray-200 mt-6 rounded animate-pulse"></div>
          </>
        )}
      </div>
      {!loading ? (
        <Tab.Group as="div" className="mt-20">
          <Tab.List as="div" className="border-b-2 text-primary md:mb-8">
            <Tab>
              {({ selected }) => (
                <div
                  className={`py-4 px-4 ${
                    selected && 'border-b-2 border-black text-black -mb-2'
                  }`}
                >
                  Photos
                </div>
              )}
            </Tab>
            <Tab>
              {({ selected }) => (
                <div
                  className={`py-4 px-4 ${
                    selected && 'border-b-2 border-black text-black -mb-2'
                  }`}
                >
                  Likes
                </div>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <Gallery
                scrollQuery={{
                  query: GET_POSTS_BY_USER,
                  variables: { displayName: username }
                }}
              />
            </Tab.Panel>
            <Tab.Panel>
              <Gallery
                scrollQuery={{
                  query: GET_LIKED_POSTS,
                  variables: { userId: user.id }
                }}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      ) : (
        <>
          <div className="mt-20 w-11/12 h-6 mx-auto bg-gray-200 rounded"></div>
          <div className="mt-8 w-full">
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 md:grid-rows-2 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="even:bg-gray-200 odd:bg-gray-300 w-full h-48 rounded"
                ></div>
              ))}
            </div>
          </div>
        </>
      )}
    </Layout>
  )
}

export default Profile

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      username: context.query.username
    }
  }
}
