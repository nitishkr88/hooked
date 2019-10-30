import React, { useState, useCallback } from 'react'

import { useFetch } from 'hooked'

export default () => {
  const [page, setPage] = useState(1)

  const { loading, error, data } = useFetch(`planets/${page}/`)

  const onNext = useCallback(() => setPage(p => p + 1), [])
  const onPrev = useCallback(() => setPage(p => p - 1), [])

  return (
    <div>
      <div style={{ height: '100px' }}>
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>Something went wrong</h2>
        ) : (
          <div>{data && JSON.stringify(data.body, null, '\n')}</div>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
        <button disabled={loading || page === 1} type="submit" onClick={onPrev}>
          Prev
        </button>
        <button
          style={{ marginLeft: '10px' }}
          disabled={loading}
          type="submit"
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  )
}
