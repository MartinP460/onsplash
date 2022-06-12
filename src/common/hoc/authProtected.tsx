import { useRouter } from 'next/router'
import { useAuthenticationStatus } from '@nhost/nextjs'
import { ElementType } from 'react'
import Layout from '../../modules/layout/components/Layout'

export function authProtected(Comp: ElementType) {
  return function AuthProtected(props: any) {
    const router = useRouter()
    const { isLoading, isAuthenticated } = useAuthenticationStatus()

    if (isLoading) {
      return <Layout title="Loading">Loading...</Layout>
    }

    if (!isAuthenticated) {
      router.push('/login')
      return null
    }

    return <Comp {...props} />
  }
}
