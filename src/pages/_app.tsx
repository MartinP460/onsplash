import { AppProps } from 'next/app'
import { NhostProvider } from '@nhost/nextjs'
import { NhostApolloProvider } from '@nhost/react-apollo'
import { UserProvider } from 'common/context/userContext'
import { ToastProvider } from 'common/context/NotificationProvider'
import { nhost } from 'common/utils/nhost'
import Toast from 'common/components/Toast'
import SubmitModal from 'modules/submit/components/SubmitModal'
import 'common/styles/globals.css'

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <NhostProvider nhost={nhost} initial={pageProps.nhostSession}>
      <NhostApolloProvider nhost={nhost}>
        <UserProvider>
          <ToastProvider>
            <Component {...pageProps} />
            <Toast />
            <SubmitModal />
          </ToastProvider>
        </UserProvider>
      </NhostApolloProvider>
    </NhostProvider>
  )
}

export default CustomApp
