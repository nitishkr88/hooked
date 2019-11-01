import { useCallback } from 'react'
import handleErrors from './handle-errors'

const useFecthFn = (dispatch, url, options, requestOptions) => {
  return useCallback(() => {
    const doFetch = async () => {
      try {
        dispatch({ type: 'FETCH_IN_PROGRESS' })

        if (options.body) {
          if (typeof options.body === 'object') {
            options.body = JSON.stringify(options.body)
          }
        }

        const response = await fetch(url, {
          ...options,
          ...(typeof requestOptions === 'function'
            ? requestOptions()
            : requestOptions),
          headers: {
            ...options.headers,
            ...(typeof requestOptions === 'function'
              ? requestOptions().headers
              : requestOptions.headers)
          }
        })
        const { headers } = response

        // eslint-disable-next-line no-underscore-dangle
        const _response = handleErrors(response)
        const body = await _response.json()

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
