import { useEffect } from 'react'
import useLazyFetch from './use-lazy-fetch'

const useFetch = (...args) => {
  const [doFetch, result] = useLazyFetch(...args)
  useEffect(doFetch, [JSON.stringify(args)])
  return result
}

export default useFetch
