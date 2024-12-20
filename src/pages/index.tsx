import { GetStaticProps, NextPage } from 'next'
import { GET_ALL_POSTS } from 'common/graphql/posts'
import { Post } from 'common/types/index'
import Layout from 'modules/layout/components/Layout'
import Hero from 'common/components/Hero'
import Gallery from 'modules/gallery/components/Gallery'
import { nhost } from 'common/utils/nhost'

interface HomeProps {
  heroPost: Post
  initialPosts: Post[]
}

const Index: NextPage<HomeProps> = ({ heroPost, initialPosts }) => {
  return (
    <Layout>
      <Hero post={heroPost} />
      <Gallery
        initialPosts={initialPosts}
        scrollQuery={{ query: GET_ALL_POSTS }}
      />
    </Layout>
  )
}

export default Index

export const getStaticProps: GetStaticProps = async () => {
  const { data, error } = await nhost.graphql.request(GET_ALL_POSTS, {
    offset: 0
  })

  if (error) {
    console.error(error)
  }

  const heroImage = data.posts[15]
  const posts = data.posts.filter((post: Post) => post.id !== heroImage.id)

  return {
    props: {
      heroPost: heroImage,
      initialPosts: posts
    }
  }
}
