import React, { useState, useCallback } from 'react'

import { useFetch } from 'hooked'

export default () => {
  const [page, setPage] = useState(1)

  const { loading, error, data } = useFetch(
    `https://swapi.co/api/planets/${page}/`
  )

  const onClick = useCallback(() => setPage(p => p + 1), [])

  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>Something went wrong</h2>
      ) : (
        <div>{data && JSON.stringify(data.body, null, '\n')}</div>
      )}
      <button
        style={{ marginTop: '20px' }}
        disabled={loading}
        type="submit"
        onClick={onClick}
      >
        More
      </button>
    </div>
  )
}
