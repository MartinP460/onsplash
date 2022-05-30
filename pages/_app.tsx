import { AppProps } from 'next/app'

import '../styles/globals.css'

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default CustomApp
