import Layout from '../../modules/layout/components/Layout'
import Link from 'next/link'

interface ErrorProps {
  errorType?: string
  title?: string
}

const Error = ({ errorType = '404 Not Found', title = '404' }: ErrorProps) => {
  return (
    <Layout title={`${errorType} | Onsplash`}>
      <div className="h-[85vh] flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-7xl font-thin">{title}</h1>
        <h2 className="mt-4 text-lg font-bold">
          The address you navigated to does not exist.
        </h2>
        <p className="mt-2">
          You may have mistyped the address, the page has been deleted or moved
          to another URL.
        </p>
        <Link href="/">
          <a className="mt-4 bg-black text-white py-3 rounded px-3 transition-fast">
            Home page
          </a>
        </Link>
      </div>
    </Layout>
  )
}

export default Error
