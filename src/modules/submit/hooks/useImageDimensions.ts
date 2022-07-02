import { useState, useEffect } from 'react'
import { isValidImage, getImageDimensions } from '../utils/helper'

const useImageDimension = (url: string) => {
  const [dimensions, setDimensions] = useState<{
    width: number | null
    height: number | null
  }>({ width: null, height: null })

  useEffect(() => {
    const getImageDimensionsFunc = async () => {
      const validImage = await isValidImage(url)

      if (!url || !validImage) {
        return setDimensions({ width: null, height: null })
      }

      if (validImage) {
        const response = await getImageDimensions(url)
        setDimensions(response)
      }
    }

    if (window) {
      getImageDimensionsFunc()
    }
  }, [url])

  return dimensions
}

export default useImageDimension
