import { Post } from '../types'

export const splitArrayToThreeSubArrays = (arr: Post[]) => {
  // initiate sub arrays corresponding to each column
  const result: Post[][] = [[], [], []]
  // initiate array of heights for each column
  const heights = [0, 0, 0]

  arr.forEach((_, i) => {
    // find the column with the lowest height
    const lowestSubArrayIndex = heights.indexOf(Math.min(...heights))
    // add the post to the column with the lowest height
    result[lowestSubArrayIndex].push(arr[i])
    // update the height of the column with the lowest height
    heights[lowestSubArrayIndex] =
      heights[lowestSubArrayIndex] + arr[i].image.height
  })

  return result
}
