import { GetServerSideProps, NextPage } from 'next'
import { GET_POST } from '../../common/graphql/posts'
import { useQuery } from '@apollo/client'
import Layout from '../../modules/layout/components/Layout'
import PostModal from '../../common/components/PostModal'

interface PhotoProps {
  id: string
}

const Photo: NextPage<PhotoProps> = ({ id }) => {
  const { data, error } = useQuery(GET_POST, {
    variables: { id }
  })

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
