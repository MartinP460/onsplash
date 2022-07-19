import { ApolloError, useLazyQuery } from '@apollo/client'
import { useCallback, useState } from 'react'
import { GET_USER } from '../graphql/user'

const useUniqueUsername = () => {
  const [isUnique, setIsUnique] = useState(false)
  const [getUsers, { loading, error }] = useLazyQuery(GET_USER, {
    onCompleted: (data) =>
      data.users.length === 0 ? setIsUnique(true) : setIsUnique(false)
  })

  const checkUsername = useCallback(
    (username: string): void => {
      getUsers({
        variables: {
          displayName: username
        }
      })
    },
    [getUsers]
  )

  return [checkUsername, { isUnique, loading, error }] as [
    (username: string) => void,
    {
      isUnique: boolean
      loading: boolean
      error?: ApolloError
    }
  ]
}

export default useUniqueUsername
