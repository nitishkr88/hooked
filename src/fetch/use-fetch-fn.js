import { useCallback } from 'react'

const useFecthFn = (dispatch, url, options) => {
  return useCallback(() => {
    const doFetch = async () => {
      try {
        dispatch({ type: 'FETCH_IN_PROGRESS' })

        if (options.body) {
          if (typeof options.body === 'object') {
            options.body = JSON.stringify(options.body)
          }
        }

        const response = await fetch(url, options)
        const { headers } = response

        const body = await response.json()

        dispatch({ type: 'FETCH_SUCCESS', payload: { body, headers } })
      } catch (ex) {
        dispatch({ type: 'FETCH_ERROR', payload: ex })
      }
    }
    if (url) {
      doFetch()
    }
  }, [url, options, dispatch])
}

export default useFecthFn
