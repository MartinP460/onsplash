export const isValidUnsplashHttpUrl = (string: string): boolean => {
  let url

  try {
    url = new URL(string)
  } catch (_) {
    return false
  }

  const isUnplashHosted = url.host === 'images.unsplash.com'

  const includesProtocol = url.protocol === 'http:' || url.protocol === 'https:'

  return isUnplashHosted && includesProtocol
}

export const getImageDimensions = (
  url: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url

    img.onload = () =>
      resolve({
        width: img.width,
        height: img.height
      })
    img.onerror = (error) => reject(error)
  })
}

export const isValidImage = async (url: string): Promise<boolean> => {
  try {
    const dimensions = await getImageDimensions(url)
    return true
  } catch (_) {
    return false
  }
}
