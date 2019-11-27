import React from 'react'
import ReactDOM from 'react-dom'

import { FetchProvider } from '../lib/index'
import { default as FetchHookApp } from './fetch-hook/fetch-hook'

ReactDOM.render(
  <FetchProvider
    base="https://swapi.co/api/"
    requestOptions={() => ({ headers: { Authorization: 'authToken' } })}
  >
    <FetchHookApp />
  </FetchProvider>,
  document.getElementById('root')
)
