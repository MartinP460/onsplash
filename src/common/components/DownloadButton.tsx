import { DownloadIcon } from '@heroicons/react/solid'
import { useMutation } from '@apollo/client'
import { INCREMENT_DOWNLOADS } from '../graphql/posts'
import useDifferentOriginDownload from '../hooks/useDifferentOriginDownload'
import Button from './Button'

interface DownloadButtonProps {
  postId: string
  url: string
  className?: string
}

const DownloadButton = ({ postId, url, className }: DownloadButtonProps) => {
  const [incrementDownloads] = useMutation(INCREMENT_DOWNLOADS)
  const download = useDifferentOriginDownload()

  return (
    <Button
      variation="outline"
      className={`bg-gray-200 hover:cursor-pointer hover:bg-white ${className}`}
      onClick={(e) => {
        e.stopPropagation()
        incrementDownloads({ variables: { id: postId } })
        download(url)
      }}
    >
      <DownloadIcon className="h-5 w-5" />
    </Button>
  )
}

export default DownloadButton
