import { AppProps } from 'next/app'
import { NhostNextProvider, NhostClient } from '@nhost/nextjs'
import { NhostApolloProvider } from '@nhost/react-apollo'
import { UserProvider } from 'common/context/userContext'
import { ToastProvider } from 'common/context/NotificationProvider'
import Toast from 'common/components/Toast'
import SubmitModal from 'modules/submit/components/SubmitModal'
import 'common/styles/globals.css'

const nhost = new NhostClient({
  backendUrl: process.env.NEXT_PUBLIC_NHOST_BACKEND_URL || ''
})

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <NhostNextProvider nhost={nhost} initial={pageProps.nhostSession}>
      <NhostApolloProvider nhost={nhost}>
        <UserProvider>
          <ToastProvider>
            <Component {...pageProps} />
            <Toast />
            <SubmitModal />
          </ToastProvider>
        </UserProvider>
      </NhostApolloProvider>
    </NhostNextProvider>
  )
}

export default CustomApp
