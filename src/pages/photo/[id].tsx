import { GetServerSideProps, NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { GET_POST, INCREMENT_VIEWS } from '../../common/graphql/posts'
import Layout from '../../modules/layout/components/Layout'
import PostModal from '../../modules/gallery/components/PostModal'
import { useEffect } from 'react'

interface PhotoProps {
  id: string
}

const Photo: NextPage<PhotoProps> = ({ id }) => {
  const { data, error } = useQuery(GET_POST, {
    variables: { id }
  })
  const [incrementViews] = useMutation(INCREMENT_VIEWS)

  useEffect(() => {
    if (data) {
      incrementViews({ variables: { id } })
    }
  }, [data])

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
