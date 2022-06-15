export const splitArrayToThreeSubArrays = (arr: any[]) => {
  const itemsPerSubArray = Math.ceil(arr.length / 3)

  return new Array(3)
    .fill('')
    .map((_, i) => arr.slice(i * itemsPerSubArray, (i + 1) * itemsPerSubArray))
}
