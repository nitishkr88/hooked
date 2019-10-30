import { useReducer } from 'react'
import useFecthFn from './use-fetch-fn'

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

const useLazyFetch = (url, options) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const updatedOptions = parseOptions(options)
  const doFetch = useFecthFn(dispatch, url, updatedOptions)

  return [doFetch, state]
}

function parseOptions(options = {}) {
  const headers = options.headers || {}

  if (!headers['Accept']) {
    headers['Accept'] = 'application/json'
  }

  if (!headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  return { ...options, headers }
}

export default useLazyFetch
