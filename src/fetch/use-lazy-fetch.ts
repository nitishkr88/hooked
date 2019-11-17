import { useContext, useReducer } from 'react'
import url from 'url'

import useFecthFn from './use-fetch-fn'
import { FetchContext } from './context'

export type Maybe<T> = T | null

export type Action<T = any> =
  | { type: 'FETCH_IN_PROGRESS' }
  | { type: 'FETCH_ERROR'; payload: Error }
  | { type: 'FETCH_SUCCESS'; payload: { body: T; headers: Headers } }

export interface ResponseType<T = any> {
  error?: Maybe<Error>
  loading?: boolean
  data: Maybe<{ body: T; headers: Headers }>
}

const initialState: ResponseType = {
  error: null,
  loading: false,
  data: null
}

const reducer = <T>(
  state: ResponseType<T>,
  action: Action
): ResponseType<T> => {
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
        error: action.payload,
        loading: false,
        data: null
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        error: null,
        loading: false,
        data: action.payload
      }
    default:
      return state
  }
}

function resolvePath(base: string, path: string) {
  if (path.startsWith('http')) return path

  const appendedBase = base.endsWith('/') ? base : `${base}/`
  const trimmedPath = path.startsWith('/') ? path.slice(1) : path

  return url.resolve(appendedBase, trimmedPath)
}

function prepareHeaders(headers: HeadersInit = {}) {
  if (!headers['Accept']) {
    headers['Accept'] = 'application/json'
  }

  if (!headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  return headers
}

const useLazyFetch = <T>(
  path: string,
  options?: RequestInit
): [() => void, ResponseType<T>] => {
  const { base, requestOptions } = useContext(FetchContext)
  const [state, dispatch] = useReducer<
    (state: ResponseType<T>, action: Action) => ResponseType<T>
  >(reducer, initialState)

  const resolvedPath = resolvePath(base, path)
  let headers = options && options.headers
  headers = prepareHeaders(headers)

  const updatedOptions = { ...options, headers }
  const doFetch = useFecthFn(
    dispatch,
    resolvedPath,
    updatedOptions,
    requestOptions
  )

  return [doFetch, state]
}

export default useLazyFetch
