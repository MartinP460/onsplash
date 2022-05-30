import { AppProps } from 'next/app'
import { NhostNextProvider, NhostClient } from '@nhost/nextjs'
import '../styles/globals.css'

const nhost = new NhostClient({
  backendUrl: process.env.NEXT_PUBLIC_NHOST_BACKEND_URL || ''
})

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <NhostNextProvider nhost={nhost} initial={pageProps.nhostSession}>
      <Component {...pageProps} />
    </NhostNextProvider>
  )
}

export default CustomApp
