const useDifferentOriginDownload = () => {
  const toDataUrl = async (url: string) => {
    return fetch(url).then((res) => {
      return res.blob().then((blob) => {
        return URL.createObjectURL(blob)
      })
    })
  }

  const download = async (url: string) => {
    const a = document.createElement('a')
    a.href = await toDataUrl(url)
    a.download = ''
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return download
}

export default useDifferentOriginDownload
