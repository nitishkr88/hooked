import { useEffect } from 'react'
import useLazyFetch from './use-lazy-fetch'

const useFetch = <T>(...args: [string, RequestInit?]) => {
  const [doFetch, result] = useLazyFetch<T>(...args)
  useEffect(doFetch, [JSON.stringify(args)])
  return result
}

export default useFetch
