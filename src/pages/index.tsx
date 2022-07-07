import { GetStaticProps, NextPage } from 'next'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GET_ALL_POSTS } from '../common/graphql/posts'
import { Post } from '../common/types/index'
import Layout from '../modules/layout/components/Layout'
import Hero from '../common/components/Hero'
import Gallery from '../modules/gallery/components/Gallery'

interface HomeProps {
  initialPosts: Post[]
}

const Index: NextPage<HomeProps> = ({ initialPosts }) => {
  return (
    <Layout>
      <Hero post={initialPosts[0]} />
      <Gallery
        initialPosts={initialPosts.slice(1)}
        scrollQuery={{ query: GET_ALL_POSTS }}
      />
    </Layout>
  )
}

export default Index

export const getStaticProps: GetStaticProps = async () => {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_NHOST_BACKEND_URL}/v1/graphql` || '',
    cache: new InMemoryCache()
  })

  const { data } = await client.query({
    query: GET_ALL_POSTS,
    variables: { offset: 0 }
  })

  return {
    props: {
      initialPosts: data.posts
    }
  }
}
