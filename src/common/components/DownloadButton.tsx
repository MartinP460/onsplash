import { SyntheticEvent } from 'react'
import { DownloadIcon } from '@heroicons/react/solid'
import useDifferentOriginDownload from '../hooks/useDifferentOriginDownload'
import Button from './Button'

interface DownloadButtonProps {
  url: string
}

const DownloadButton = ({ url }: DownloadButtonProps) => {
  const download = useDifferentOriginDownload()

  return (
    <Button
      variation="outline"
      className="bg-gray-200 hover:cursor-pointer hover:bg-white"
      onClick={(e) => {
        e.stopPropagation()
        download(url)
      }}
    >
      <DownloadIcon className="h-5 w-5" />
    </Button>
  )
}

export default DownloadButton
