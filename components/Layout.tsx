import Head from 'next/head'
import React from 'react'
import Header from './Header'

type LayoutProps = {
  title: string
  description: string
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
    </>
  )
}

export default Layout
