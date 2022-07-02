import { AppProps } from 'next/app'
import { NhostNextProvider, NhostClient } from '@nhost/nextjs'
import { NhostApolloProvider } from '@nhost/react-apollo'
import { UserProvider } from '../common/utils/UserProvider'
import SubmitModal from '../modules/submit/components/SubmitModal'
import '../styles/globals.css'

const nhost = new NhostClient({
  backendUrl: process.env.NEXT_PUBLIC_NHOST_BACKEND_URL || ''
})

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <NhostNextProvider nhost={nhost} initial={pageProps.nhostSession}>
      <NhostApolloProvider nhost={nhost}>
        <UserProvider>
          <Component {...pageProps} />
          <SubmitModal />
        </UserProvider>
      </NhostApolloProvider>
    </NhostNextProvider>
  )
}

export default CustomApp
