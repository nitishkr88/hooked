import { useCallback } from 'react'
import handleErrors from './handle-errors'
import { Action } from './use-lazy-fetch'
import { FetchProviderProps } from './context'

const useFecthFn = (
  dispatch: React.Dispatch<Action>,
  url: string,
  options: RequestInit,
  requestOptions: FetchProviderProps['requestOptions']
) => {
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
              : requestOptions && requestOptions.headers)
          }
        })

        const { headers } = response

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
