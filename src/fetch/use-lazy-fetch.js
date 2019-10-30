import { useContext, useReducer } from 'react'
import url from 'url'

import useFecthFn from './use-fetch-fn'
import { FetchContext } from './context'

const initialState = {
  error: null,
  loading: false,
  data: null
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_IN_PROGRESS':
      return {
        ...state,
        error: null,
        loading: true,
        data: null
      }
    case 'FETCH_ERROR':
      return {
        ...state,
        error: action.payload.error,
        loading: false,
        data: null
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        error: null,
        loading: false,
        data: {
          body: action.payload.body,
          headers: action.payload.headers
        }
      }
    default:
      return state
  }
}

function parseOptions(options = {}) {
  const headers = options.headers || {}

  if (!headers.Accept) {
    headers.Accept = 'application/json'
  }

  if (!headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  return { ...options, headers }
}

function resolvePath(base, path) {
  if (path.startsWith('http')) return path

  const appendedBase = base.endsWith('/') ? base : `${base}/`
  const trimmedPath = path.startsWith('/') ? path.slice(1) : path

  return url.resolve(appendedBase, trimmedPath)
}

const useLazyFetch = (path, options) => {
  const { base } = useContext(FetchContext)
  const [state, dispatch] = useReducer(reducer, initialState)

  const resolvedPath = resolvePath(base, path)
  const updatedOptions = parseOptions(options)
  const doFetch = useFecthFn(dispatch, resolvedPath, updatedOptions)

  return [doFetch, state]
}

export default useLazyFetch
