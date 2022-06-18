import { GetServerSideProps, NextPage } from 'next'
import { Post } from '../../common/types/index'
import { GET_POST } from '../../common/graphql/posts'
import { useQuery } from '@apollo/client'
import Layout from '../../modules/layout/components/Layout'
import PostModal from '../../common/components/PostModal'

interface PhotoProps {
  id: string
}

const Photo: NextPage<PhotoProps> = ({ id }) => {
  const { data, loading, error } = useQuery(GET_POST, {
    variables: { id }
  })

  console.log(data)

  return (
    <Layout>
      <PostModal post={data?.posts[0]} />
    </Layout>
  )
}

export default Photo

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.query.id
    }
  }
}
