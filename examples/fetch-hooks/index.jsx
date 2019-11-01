import React from 'react'
import ReactDOM from 'react-dom'

import { FetchProvider } from 'hooked'
import App from './components/App'

ReactDOM.render(
  <FetchProvider
    base="https://swapi.co/api/"
    requestOptions={() => ({ headers: { Authorization: 'authToken' } })}
  >
    <App />
  </FetchProvider>,
  document.getElementById('root')
)
