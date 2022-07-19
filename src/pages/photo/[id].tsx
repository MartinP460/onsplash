import { GetServerSideProps, NextPage } from 'next'
import { useQuery, useMutation } from '@apollo/client'
import { GET_POST, INCREMENT_VIEWS } from '../../common/graphql/posts'
import Layout from '../../modules/layout/components/Layout'
import Error from '../../common/components/Error'
import PostModal from '../../modules/gallery/components/PostModal'

interface PhotoProps {
  id: string
}

const Photo: NextPage<PhotoProps> = ({ id }) => {
  const [incrementViews] = useMutation(INCREMENT_VIEWS, { variables: { id } })
  const { data, error } = useQuery(GET_POST, {
    variables: { id },
    onCompleted: () => incrementViews()
  })

  if (error) {
    return <Error errorType="Photo Not Found" title="No photo here..." />
  }

  return <Layout>{data && <PostModal post={data.posts[0]} />}</Layout>
}

export default Photo

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.query.id
    }
  }
}
