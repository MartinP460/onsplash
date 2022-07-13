import { ApolloError, useLazyQuery } from '@apollo/client'
import { useState } from 'react'
import { GET_USER } from '../graphql/user'

const useUniqueUsername = () => {
  const [isUnique, setIsUnique] = useState(false)
  const [getUsers, { loading, error }] = useLazyQuery(GET_USER, {
    onCompleted: (data) =>
      data.users.length === 0 ? setIsUnique(true) : setIsUnique(false)
  })

  const checkUsername = (username: string): void => {
    getUsers({
      variables: {
        displayName: username
      }
    })
  }

  const returnTuple: [
    (username: string) => void,
    {
      isUnique: boolean
      loading: boolean
      error?: ApolloError
    }
  ] = [checkUsername, { isUnique, loading, error }]
  return returnTuple
}

export default useUniqueUsername
