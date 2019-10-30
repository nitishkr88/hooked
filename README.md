# Hooked

React Hooks abstraction for few common APIs.

# [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## API

### `EAGER EXECUTION`

```js
const { error, loading, data } = useFetch(url, options)
```

**Params**

`url`

| PARAM | TYPE   | DESCRIPTION                                                              |
| ----- | ------ | ------------------------------------------------------------------------ |
| url   | string | An http(s) endpoint.<br>It can either be an absolute or a relative value |

`options`

An optional options object containing any custom settings that you want to apply to the request. Similar to the `options` object accepted by
the [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request) constructor.

| PARAM                                                                                                   | TYPE          | DESCRIPTION                                                                                 |
| ------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------- |
| method                                                                                                  | string        | The request method, e.g., `GET`, `POST`. The default is `GET`.                              |
| body                                                                                                    | object/string | Any body that you want to add to your request.<br>It can be an object or a stringified JSON |
| other fields similiar to [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request)... |               |
|                                                                                                         |               |

`Result`

| PARAM   | TYPE      | DESCRIPTION                                                                                |
| ------- | --------- | ------------------------------------------------------------------------------------------ |
| loading | boolean   | A boolean that indicates whether the request is in flight.                                 |
| error   | TypeError | A runtime error either thrown by fetch or when response status is not in range [200, 300). |
| data    | object    | An object containing the result of your API call. Defaults to `null`.                      |

---

### `LAZY EXECUTION`

```js
const [doFetch, { error, loading, data }] = useLazyFetch(url, options)
```

**Params**

`Result`

| PARAM   | TYPE     | DESCRIPTION                                                                                                                     |
| ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| doFetch | function | Function that can be triggered to execute the suspended query.<br/>After being called, useLazyFetch behaves just like useFetch. |

## Examples

```js
import React, { useState, useCallback } from 'react'
import { useFetch } from 'hooked'

const Planets = () => {
  const [page, setPage] = useState(1)

  const { loading, error, data } = useFetch(
    `https://swapi.co/api/planets/${page}/`
  )

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
```

### Fetch on Demand

```js
import React, { useState, useCallback } from 'react'
import { useLazyFetch } from 'hooked'

const Planets = () => {
  const [page, setPage] = useState('')

  const [fetchPlanets, { loading, error, data }] = useLazyFetch(
    `https://swapi.co/api/planets/${page}/`
  )

  const onChange = useCallback(e => setPage(e.target.value), [])
  const onClick = useCallback(fetchPlanets, [fetchPlanets])

  return (
    <div>
      <div
        style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}
      >
        <input
          value={page}
          placeholder="Enter Page Number"
          onChange={onChange}
        />
        <button
          style={{ marginLeft: '10px' }}
          disabled={loading || isNaN(page) || !page || page == 0}
          type="submit"
          onClick={onClick}
        >
          Fetch
        </button>
      </div>
      <div>
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>Something went wrong</h2>
        ) : (
          <div>{data && JSON.stringify(data.body, null, '\n')}</div>
        )}
      </div>
    </div>
  )
}
```
