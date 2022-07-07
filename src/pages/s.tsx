import { GetServerSideProps, NextPage } from 'next'
import { GET_POSTS_BY_QUERY } from '../common/graphql/posts'
import Gallery from '../modules/gallery/components/Gallery'
import Layout from '../modules/layout/components/Layout'

interface SearchProps {
  query: string
}

const Search: NextPage<SearchProps> = ({ query }) => {
  return (
    <Layout title={`${query} Pictures | Onsplash`}>
      <div className="max-w-7xl mx-auto">
        <div className="mx-5 my-8">
          <p>Results for</p>
          <h1 className="text-4xl font-bold capitalize">{query}</h1>
        </div>
        <Gallery
          scrollQuery={{
            query: GET_POSTS_BY_QUERY,
            variables: { query: `%${query}%` }
          }}
        />
      </div>
    </Layout>
  )
}

export default Search

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      query: context.query.query
    }
  }
}
